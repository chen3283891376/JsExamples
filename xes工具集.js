// ==UserScript==
// @name         实用工具集
// @namespace    http://tampermonkey.net/
// @version      2024-04-14
// @description  none
// @author       chen
// @match        https://code.xueersi.com/home/project/detail?lang=*
// @icon         https://static0.xesimg.com/talcode/assets/logo.ico
// @grant        GM_addElement
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //confirm("哈哈哈哈");
    //document.body.innerHTML += "<h1>这个网页已经被我占领了！！！</h1>";
    if(document.getElementById('loading-dom'))
    {
        document.getElementsByTagName('p')[0].innerHTML = 'Chen';
        document.getElementsByTagName('p')[0].style="font-size: 40px;color: rgba(64, 128, 255, 1);";
    }
    var btn = document.createElement("button")
    btn.innerHTML = "一键三连";
    btn.onclick =  function (){
        let likeBtn = top.document.querySelector(".like");//点赞
        if (!likeBtn.classList.contains("hasLiked"))
            likeBtn.click();

        let favoritesBtn = top.document.querySelector(".favorites");//收藏
        if (!favoritesBtn.classList.contains("hasLiked"))
            favoritesBtn.click();

        let followBtn = top.document.querySelector(".focus-btn");//关注
        if (!followBtn.classList.contains("has-follow"))
            followBtn.click();
    };
    document.body.insertBefore(btn,document.body.firstChild);
    var btn2 = document.createElement("button")
    btn2.innerHTML = "强烈推荐";
    btn2.onclick =  function (){
        var work_data1 = window.location.search;
        const work_type = work_data1.split("&")[3].split("=")[1];
        work_data1 = work_data1.split("&")[1].split("=")[1];
        const header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33','Cookie':String(document.cookie)}
        let data;
        if(work_type=="cpp")
        {
            data={"appid":1001108,"topic_id":"CC_"+work_data1,"target_id":0,"content":"推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐"};
        }
        else if(work_type=="scratch")
        {
            data={"appid":1001108,"topic_id":"CS_"+work_data1,"target_id":0,"content":"推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐"};
        }
        else
        {
            data={"appid":1001108,"topic_id":"CP_"+work_data1,"target_id":0,"content":"推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐！推荐"};
        }
        const xhr6 = new XMLHttpRequest();
        xhr6.open('POST', "https://code.xueersi.com/api/comments/submit",true);
        xhr6.setRequestHeader('Content-Type', "application/json");
        xhr6.send(JSON.stringify((header,data)));
        const xhr7 = new XMLHttpRequest();
        xhr7.open('POST', "https://code.xueersi.com/api/comments/submit",true);
        xhr7.setRequestHeader('Content-Type', "application/json");
        xhr7.send(JSON.stringify((header,data)));
    };
    document.body.insertBefore(btn2,document.body.firstChild);
    var btn3 = document.createElement("button")
    btn3.innerHTML = "一键催更";
    btn3.onclick =  function (){
        var work_data1 = window.location.search;
        const work_type = work_data1.split("&")[3].split("=")[1];
        work_data1 = work_data1.split("&")[1].split("=")[1];
        const header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33','Cookie':String(document.cookie)}
        let data;
        if(work_type=="cpp")
        {
            data={"appid":1001108,"topic_id":"CC_"+work_data1,"target_id":0,"content":"催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更"};
        }
        else if(work_type=="scratch")
        {
            data={"appid":1001108,"topic_id":"CS_"+work_data1,"target_id":0,"content":"催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更"};
        }
        else
        {
            data={"appid":1001108,"topic_id":"CP_"+work_data1,"target_id":0,"content":"催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更！催更"};
        }
        const xhr6 = new XMLHttpRequest();
        xhr6.open('POST', "https://code.xueersi.com/api/comments/submit",true);
        xhr6.setRequestHeader('Content-Type', "application/json");
        xhr6.send(JSON.stringify((header,data)));
        const xhr7 = new XMLHttpRequest();
        xhr7.open('POST', "https://code.xueersi.com/api/comments/submit",true);
        xhr7.setRequestHeader('Content-Type', "application/json");
        xhr7.send(JSON.stringify((header,data)));
    };
    document.body.insertBefore(btn3,document.body.firstChild);
    var btn0 = document.createElement("button")
    btn0.innerHTML = "jsxesapi";
    let cmd = 'xxx';
    btn0.onclick =  function (){
        //感谢富兰克林发现的api和林林的封装！！！
        while(cmd){
            cmd = prompt("请输入指令名（改个签/发留言/赞作品/关注用户/收藏作品/获取作品信息/获取用户信息）：");
            const nxhr = new XMLHttpRequest();
            let data;
            let header;
            if(cmd=="改个签")
            {
                header={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33','Cookie':String(document.cookie)};
                const txt = prompt("请输入新的个性签名");
                data={'signature':txt}
                nxhr.open('POST', "https://code.xueersi.com/api/space/edit_signature",true);
                nxhr.setRequestHeader('Content-Type', 'application/json');
                nxhr.send(JSON.stringify((header,data)));
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        window.alert("操作成功")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
            else if(cmd=="发留言")
            {
                const url = prompt("请输入作品网址");
                const work_type = url.split("&")[3].split("=")[1];
                const work_data1 = url.split("&")[1].split("=")[1];
                let work_data0;
                if(work_type=="cpp")
                {
                    work_data0="CC_";
                }
                else if(work_type=="scratch")
                {
                    work_data0="CS_";
                }
                else
                {
                    work_data0="CP_"
                }
                header={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33','Cookie':String(document.cookie)};
                const txt = prompt("请输入留言内容");
                data={"appid":1001108,"topic_id":work_data0+work_data1,"target_id":0,"content":txt};
                nxhr.open('POST', "https://code.xueersi.com/api/comments/submit",true);
                nxhr.setRequestHeader('Content-Type', 'application/json');
                nxhr.send(JSON.stringify((header,data)));
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        window.alert("操作成功")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
            else if(cmd=="赞作品")
            {
                const url = prompt("请输入作品网址");
                const work_type = url.split("&")[3].split("=")[1];
                const work_data1 = url.split("&")[1].split("=")[1];
                if(work_type=="scratch")
                {
                    nxhr.open('POST', "https://code.xueersi.com/api/projects/"+work_data1+"/like")
                }
                else if(work_type=="cpp")
                {
                    nxhr.open('POST', "https://code.xueersi.com/api/compilers/"+work_data1+"/like")
                }
                else
                {
                    nxhr.open('POST', "https://code.xueersi.com/api/python/"+work_data1+"/like")
                }
                header={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33','Cookie':String(document.cookie)};
                const work_lang = url.split("&")[0].split("=")[1];
                if(work_lang)
                {
                    data = {'params': {'id': work_data1, 'lang': work_lang, 'form': work_type}}
                }
                else
                {
                    data = {'params': {'id': work_data1, 'lang': work_lang}}
                }
                nxhr.setRequestHeader('Content-Type', 'application/json');
                nxhr.send(JSON.stringify((header,data)));
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        window.alert("操作成功")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
            else if(cmd=="关注用户")
            {
                const uid = prompt("请输入要关注的用户的id");
                data = {'followed_user_id': uid, 'state': 1}
                nxhr.open('POST', "https://code.xueersi.com/api/space/follow")
                nxhr.setRequestHeader('Content-Type', "application/json")
                nxhr.send(JSON.stringify((header,data)))
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        window.alert("操作成功")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
            else if(cmd=="收藏作品")
            {
                const url = prompt("请输入作品网址");
                const work_type = url.split("&")[3].split("=")[1];
                const work_data1 = url.split("&")[1].split("=")[1];
                nxhr.open('POST', "https://code.xueersi.com/api/space/favorite",true)
                nxhr.setRequestHeader('Content-Type', "application/json")
                if(work_type=="cpp")
                {
                    data={"topic_id":"CC_"+work_data1,"state":1}
                }
                else if(work_type=="scratch")
                {
                    data={"topic_id":"CS_"+work_data1,"state":1}
                }
                else
                {
                    data={"topic_id":"CP_"+work_data1,"state":1}
                }
                nxhr.send(JSON.stringify((header,data)))
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        window.alert("操作成功")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
            else if(cmd=="获取作品信息")
            {
                const url = prompt("请输入作品网址");
                const work_data1 = url.split("&")[1].split("=")[1];
                nxhr.open('GET', "https://code.xueersi.com/api/compilers/v2/"+work_data1,true)
                nxhr.send()
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        console.log(nxhr.responseText)
                        window.alert("操作成功，警告窗无法放下全部内容，请在控制台查看")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
            else if(cmd=="获取用户信息")
            {
                const uid = prompt("请输入用户id");
                nxhr.open('GET', "https://code.xueersi.com/api/space/profile?user_id="+uid,true)
                nxhr.send()
                nxhr.onload = () => {
                    if(nxhr.status == 200){
                        console.log(nxhr.responseText)
                        window.alert("操作成功，警告窗无法放下全部内容，请在控制台查看")
                    }else{
                        window.alert("操作失败，请检测输入并稍后再试")
                    }
                }
            }
        }
    };
    document.body.insertBefore(btn0,document.body.firstChild);
})();
