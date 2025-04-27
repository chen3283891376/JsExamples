// ==UserScript==
// @name         QuickPreviewer
// @namespace    https://tampermonkey.net/
// @version      0.1
// @description  XES编程社区webpy&py代码快速Preview，防止代码有什么问题，干掉你的电脑（
// @author       chen3283891376
// @match        https://code.xueersi.com/home/project/detail?*
// @run-at       document-end
// @license      MIT
// @grant        none
// ==/UserScript==

class QuickDialog {
    constructor(id="QuickDialog", style={}, on_open=null, on_close=null) {
        this.dialog = document.createElement('dialog');
        this.dialog.id = id;

        this.style = style;
        this.#init_style();
        document.body.appendChild(this.dialog);

        this.on_open = on_open;
        this.on_close = on_close;
    }
    show() {
        this.dialog.showModal();
        this.dialog.classList.remove('hide');
        if (this.on_open) {
            try {
                this.on_open();
            } catch (e) {
                console.log("什么垃圾on_open，还报错（");
                console.error(e);
            }
        }
    }
    close() {
        this.dialog.close();
        this.dialog.classList.add('hide');
        if (this.on_close) {
            try {
                this.on_close();
            } catch (e) {
                console.log("什么垃圾on_close，还报错（");
                console.error(e);
            }
        }
    }
    #init_style() {
        const stylesheet = document.createElement('style');
        stylesheet.textContent = `
        @keyframes dialogDropIn {
            from {
                top: -100%;
            }
            to {
                top: 0; /* 动画结束后位于垂直方向的中间位置 */
                transform: translateX(0); /* 向上移动自身高度的50%以精确居中 */
            }
        }
        #${this.dialog.id} {
            position: fixed;
            transform: translateY(0);
            transform: translateX(0);
            // width: 80%;
            // max-width: 400px;
            border: none;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            border-radius: 5px;
            animation: dialogDropIn 0.5s ease;
        }
        #${this.dialog.id}.hide {
            animation: none;
        }`
        document.head.appendChild(stylesheet);
        this.dialog.classList.add('hide');
        this.dialog.style = this.style;
    }
}

const get_code = async (id) => {
    const response = await fetch(`https://code.xueersi.com/api/compilers/v2/${id}?id=${id}`);
    const responseData = await response.json();
    console.log(responseData);
    const code = responseData.data.xml;
    return code;
}

(async () => {
    'use strict';

    // from Xueersi Aurora
    function addStyle(css) {
        if (css instanceof URL) {
          const style = document.createElement('link')
          style.rel = 'stylesheet'
          style.href = css.toString()
          document.documentElement.appendChild(style)
        } else {
          const style = document.createElement('style')
          style.textContent = css
          document.documentElement.appendChild(style)
        }
    }

    const params = new URLSearchParams(location.search);
    if (params.has('version') && params.get('version') === 'webpy') {
        const id = params.get('pid');
        const code = await get_code(id);

        // 感谢自己写的QuickDialog.js（雾
        const dialog = new QuickDialog('QuickPreviewer',{
            height: '80%', 
            width: '800px'
        });
        let close_button = document.createElement('button');
        close_button.textContent = '关闭';
        close_button.onclick = () => {
            dialog.close();
        };
        dialog.dialog.appendChild(close_button);

        // from lrs2187的Monaco加载（
        const Monaco = await import(
            "https://fastly.jsdelivr.net/npm/monaco-editor@0.50.0/+esm"
        );
        addStyle(new URL("https://fastly.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/editor/editor.main.css"));
        addStyle(`
            .webpy-editor {
                min-width: min(100vw, 800px);
                min-height: min(100vh, 800px);
            }
        `);
        const editorEle = document.createElement("div");
        editorEle.className = "webpy-editor";
        dialog.dialog.appendChild(editorEle)

        const model = Monaco.editor.createModel("", "python");
        const monacoEditor = Monaco.editor.create(editorEle, {
            model,
            automaticLayout: true,
            readOnly: true,
        });

        // from lrs2187（
        function getOpenButton() {
            const ele = document.createElement("button");
            ele.innerHTML = "打开Preview";
            ele.style.position = "fixed";
            ele.style.right = "20px";
            ele.style.bottom = "20px";
            ele.style.zIndex = "100";
            ele.addEventListener("click", () => {
                dialog.show();
                monacoEditor.setValue(code);
            });
            return ele;
        }

        // from Xueersi Aurora
        window.MonacoEnvironment = {
            getWorkerUrl(fileName) {
                if (fileName === "workerMain.js") {
                    // fix SecurityError exception
                    return `data:text/javascript;base64,${btoa(
                        `(function(fetch){globalThis.fetch=function(url,...args){return fetch.call(this,'https://fastly.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/base/worker/'+url,...args);};})(globalThis.fetch);importScripts('https://fastly.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs/base/worker/workerMain.js');`
                    )}`;
                }
            },
        };

        const openButton = getOpenButton();
        document.querySelector("body").appendChild(openButton);
    }
})();