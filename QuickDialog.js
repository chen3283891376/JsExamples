// 给自己写一个快速插模态dialog的js包，可以快速的实现弹窗功能。
'use strict';

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