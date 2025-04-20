// ==UserScript==
// @name         AI重构
// @namespace    http://tampermonkey.net/
// @version      2025-04-19
// @description  XES C++代码本题目重构工具
// @author       chen3283891376
// @run-at       document-start
// @license      MIT
// @match        https://code.xueersi.com/live/creator/*
// @match        https://code.xueersi.com/ide/common/*
// @icon         https://code.xueersi.com/static/images/code-home/qrlogo.png
// @require      http://code.jquery.com/jquery-3.7.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const logger = Object.assign({}, console);
    const webpackListener = [];
    function patch(obj, p, fn) {
        if (obj[p]) obj[p] = fn(obj[p]);
    }
    function addStyle(css) {
        if (css instanceof URL) {
            const style = document.createElement("link");
            style.rel = "stylesheet";
            style.href = css.toString();
            document.documentElement.appendChild(style);
        } else {
            const style = document.createElement("style");
            style.textContent = css;
            document.documentElement.appendChild(style);
        }
    }
    class VueElementMixin {
        constructor() {
            this._events = new Map();
        }
        on(tagName, fn) {
            const v = this._events.get(tagName);
            if (v) v.push(fn);
            else this._events.set(tagName, [fn]);
        }
        emit(instance) {
            const tag =
                instance.$vnode?.componentOptions?.tag ??
                instance._vnode?.componentOptions?.tag ??
                instance.$vnode?.tag?.split("-")?.at(-1);
            logger.log("vue - " + tag, instance);
            if (this._events.has(tag)) {
                for (const v of this._events.get(tag)) {
                    try {
                        v(instance);
                    } catch (e) {
                        logger.error(e);
                    }
                }
            }
        }
    }
    function requireVue(callback) {
        let captured = false;
        patch(Function.prototype, "call", (call) => {
            return function (self, ...args) {
                if (
                    args.length === 3 &&
                    typeof args[0] === "object" &&
                    args[0] !== null &&
                    typeof args[1] === "object" &&
                    args[1] !== null &&
                    typeof args[2] === "function" &&
                    args[0].exports
                ) {
                    const fn = this;
                    // const require = args[2]
                    const str = fn.toString();
                    if (str.includes("ENABLE_XES_CONSOLE")) {
                        return;
                    }
                    const res = call.apply(this, [self, ...args]);
                    const exports = args[0].exports;
                    if (!exports) return res;
                    webpackListener.forEach((v) => v(exports));
                    if (
                        typeof exports.default === "function" &&
                        typeof exports.default.version === "string" &&
                        !captured
                    ) {
                        // This is vue.
                        captured = true;
                        callback(self.default);
                    }
                    return res;
                } else return call.apply(this, [self, ...args]);
            };
        });
    }
    const vueMixinManager = new VueElementMixin();
    requireVue((Vue) => {
        patch(Vue.prototype, "_init", (_init) => {
            return function (args) {
                _init.call(this, args);
                vueMixinManager.emit(this);
            };
        });
    });
    $(document).ready(() => {
        vueMixinManager.on("AceEditor", (instance) => {
            logger.log("ace editor", instance);
            try {
                // “将当前代码设为模板”按钮
                addStyle(`
            @media screen and (max-width: 1200px) {
                .code-refactor {
                    right: 35px !important;
                    height: 30px !important;
                }
            }
            .code-refactor {
                min-width: 100px;
                position: absolute;
                right: 45px;
                color: #fea529;
                background: #fff;
                border-radius: 20px;
                border: 2px solid #fea529;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 40px;
                font-size: 13px;
                margin: 0 12px;
                padding: 0 20px;
                white-space: nowrap;
                cursor: pointer;
            }
            .code-refactor:focus { outline: none;}
                    `);
                let scale_btn = document.querySelector(
                    ".component-lang-selector .scale-btn",
                );
                let _refactor_btn = document.createElement("div");
                _refactor_btn.classList.add("code-refactor");
                _refactor_btn.textContent = "AI帮你解决（";
                _refactor_btn.title = "AI重构";
                _refactor_btn.addEventListener("click", async (_event) => {
                    const problem = document.querySelector(".component-code-problem-desc").outerText;
                    const code = instance.editor.getValue();
                    instance.editor.setValue("");
                    _refactor_btn.textContent = "AI帮你解决中...";

                    // 这里来自凌的代码，但有所适配性的修改
                    const { SSE } = await import(
                        'https://cdn.jsdelivr.net/npm/sse.js@2.5.0/+esm'
                    )
                    const authData = await (
                        await fetch('https://code.xueersi.com/api/ai/auth')
                    ).json()
                    const token = `Bearer ${authData.data.token}`
                    let responseText = ''

                    let source = new SSE(
                        'https://codeapi.xueersi.com/ai/aigc/v2/chat',
                        {
                          method: 'POST',
                          headers: {
                            Authorization: token,
                            'Content-Type': 'application/json'
                          },
                          payload: JSON.stringify({
                            prompt: `已有代码：\n\n${code}\n\n题目：\n\n${problem}`,
                            history: [
                                {
                                    role: "assistant",
                                    content: "你是一个c++程序员，我会给你题目，你要帮我解决它，也可以对给出代码进行一些修改。代码的语言为 c++，只需给出最终的代码，不需要任何解释，但可以在注释中补充人类可读的说明，除了代码不要任何文本解释。"
                                },
                            ],
                            stream: true,
                            max_tokens: 0
                          })
                        }
                    )
                    source.addEventListener('message', (data) => {
                        const content = JSON.parse(data.data)
                        responseText += content.message.content
                        instance.editor.setValue(responseText);
                    });
                    source.stream();
                    setTimeout(() => {
                        _refactor_btn.textContent = "AI帮你解决";
                    }, 10000);
                });
                scale_btn.parentNode.insertBefore(_refactor_btn, scale_btn);
            } catch (err) {
                logger.log(
                    `AiRefactor - 发生了一个错误：${err.message}`,
                );
            }
        })
    })
})();