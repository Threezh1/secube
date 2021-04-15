
// 增加对一些方法的支持
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr);
};

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var data = arguments; // 如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        // 如果模板参数是对象
        data = args;
    }
    for ( var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replaceAll("{" + key + "}", value);
        }
    }
    return result;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

// 定义页面网址
var website_text =
`
常用推荐|常用|BiliBili|https://www.bilibili.com/|国内知名的视频弹幕网站|https://www.bilibili.com/favicon.ico
常用推荐|常用|Github|https://github.com/|GitHub is where people build software|https://github.com//favicon.ico
常用推荐|常用|谷歌翻译|https://translate.google.cn/|比较好用的翻译工具|https://translate.google.cn/favicon.ico
常用推荐|常用|三之博客|https://threezh1.com/|三之的博客|https://threezh1.com/favicon.ico
常用推荐|交流社区|先知安全技术社区|https://xz.aliyun.com/|先知安全技术社区|./assets/images/logos/xianzhi.ico
常用推荐|交流社区|FreeBuf|https://www.freebuf.com/|FreeBuf-关注黑客与极客|./assets/images/logos/freebuf.jpg
常用推荐|交流社区|安全客|https://www.anquanke.com/|安全客-有思想的安全新媒体|./assets/images/logos/anquanke.ico
常用推荐|交流社区|土司论坛|https://www.t00ls.net/|T00LS-低调求发展|./assets/images/logos/t00ls.ico
常用推荐|交流社区|洞见微信聚合|http://wechat.doonsec.com/|洞见微信聚合|./assets/images/logos/wechat.doonsec.com.ico
常用推荐|交流社区|Seebug|https://paper.seebug.org/|Paper-专注分享精品文章|./assets/images/logos/paper.ico
常用推荐|在线工具|CTF编码|http://ctf.ssleye.com/|CTFcode为CTF比赛人员、程序员提供20多种常用编码|./assets/images/logos/online_tools/ssleye.ico
常用推荐|在线工具|onlineTools|https://emn178.github.io/online-tools/index.html|在线解码工具|./assets/images/favicon.png
常用推荐|在线工具|xssor|http://xssor.io/|Hack with JavaScript|./assets/images/logos/online_tools/xssor.ico
常用推荐|在线工具|cmd5|https://www.cmd5.com/|md5加解密|./assets/images/logos/online_tools/cmd5.ico
常用推荐|在线工具|jwt|https://jwt.io/|jwt加解密|./assets/images/logos/online_tools/jwt.svg
常用推荐|在线工具|json在线解析|https://c.runoob.com/front-end/53|JSON 在线解析|./assets/images/logos/online_tools/runoob_json.ico
常用推荐|在线工具|reverse_shell|https://www.shentoushi.top/tools/misc/reverse_shell.php|Reverse shell cheatsheet|./assets/images/favicon.png
常用推荐|在线工具|Reverse Shell Generator|https://weibell.github.io/reverse-shell-generator/|Reverse Shell Generator|./assets/images/favicon.png
常用推荐|在线工具|IP查询|http://www.cip.cc/|提供免费的IP查询服务|./assets/images/favicon.png
常用推荐|在线工具|ping检测|http://ping.chinaz.com/|多个地点Ping服务器|./assets/images/logos/online_tools/chinaz.ico
常用推荐|在线工具|nip.io|https://nip.io/|Dead simple wildcard DNS for any IP Address|./assets/images/favicon.png
常用推荐|在线工具|xip.io|http://xip.io/|Dead simple wildcard DNS for any IP Address|./assets/images/favicon.png
常用推荐|在线工具|ceye|http://ceye.io/|Monitor service for security testing|./assets/images/favicon.png
常用推荐|在线工具|regex101|https://regex101.com/|Regular expression tester with syntax highlighting|./assets/images/logos/online_tools/regex101.ico
常用推荐|在线工具|regexper|regexper|Regular expression visualizer using railroad diagrams|./assets/images/logos/online_tools/regexper.ico
常用推荐|在线工具|processon.com|https://www.processon.com/diagrams|免费在线作图工具|./assets/images/logos/online_tools/pocesson.ico
常用推荐|在线工具|carbon|https://carbon.now.sh/|生成代码图片|./assets/images/logos/online_tools/carbon.ico
常用推荐|在线工具|临时邮箱|http://24mail.chacuo.net/|临时邮箱|./assets/images/favicon.png

`

// 把网址信息转为json
var websites = website_text.split("\n");
var websites_json = {};
for (i in websites) {
    if (websites[i] == "") { continue };
    var website_dict = websites[i].split("|");
    if (websites_json.hasOwnProperty(website_dict[0]) == false) {
        websites_json[website_dict[0]] = {};
    }
    if (websites_json[website_dict[0]].hasOwnProperty(website_dict[1]) == false) {
        websites_json[website_dict[0]][website_dict[1]] = [];
    }
    var siteinfo = {
        "title": website_dict[2],
        "link": website_dict[3],
        "introduction": website_dict[4],
        "logo": website_dict[5],
    }
    websites_json[website_dict[0]][website_dict[1]].push(siteinfo);
}

// 根据json生成html
var foot_element = document.querySelector("#main-content > h4:nth-child(4)");
for (i in websites_json) {
    for (j in websites_json[i]) {
        var kind_title_h4_element = document.createElement("h4");
        kind_title_h4_element.setAttribute("class", "text-gray");
        kind_title_h4_element.innerHTML = `<br /><i class="linecons-tag" style="margin-right: 7px;" id="` + j +`"></i>` + j;
        foot_element.before(kind_title_h4_element);
        var siteinfo = websites_json[i][j];
        var row_element = document.createElement("div");
        row_element.setAttribute("class", "row");
        foot_element.before(row_element);
        for (k in siteinfo) {
            var info = siteinfo[k];
            var site_element = document.createElement("div");
            site_element.setAttribute("class", "col-sm-3");
            var site_innerHTML = `
            <div class="xe-widget xe-conversations box2 label-info" onclick="window.open('{link}', '_blank')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="{link}">
            <div class="xe-comment-entry">
                <a class="xe-user-img">
                    <img data-src="{logo}" class="lozad img-circle" width="40">
                </a>
                <div class="xe-comment">
                    <a href="#" class="xe-user-name overflowClip_1">
                        <strong>{title}</strong>
                    </a>
                    <p class="overflowClip_2">{introduction}</p>
                </div>
            </div>
            </div>
            `
            site_innerHTML = site_innerHTML.format({
                title: siteinfo[k]["title"],
                link: siteinfo[k]["link"],
                introduction: siteinfo[k]["introduction"],
                logo: siteinfo[k]["logo"]
            })
            site_element.innerHTML = site_innerHTML;
            row_element.appendChild(site_element);
        }
    }
}

var br_element = document.createElement("br");
foot_element.before(br_element);

// 从远程服务器获取信息流
var requestURL = "https://129.211.93.28:8080/api/extract";
var info = {};
info["type"] = "TIME";
info["keyword"] = new Date().format("yyyy-MM-dd");
var tbody = document.getElementById("info_tbody_1");
$.ajax({
    url: requestURL,
    data: JSON.stringify(info),
    type: "POST",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(returnData){
        if (returnData.code == 1000) {
            returnData.extractInfo.reverse();
            for (i in returnData.extractInfo) {
                var title = returnData.extractInfo[i]["title"];
                var link = returnData.extractInfo[i]["link"];
                var source = returnData.extractInfo[i]["source"];
                var source_zh = returnData.extractInfo[i]["source_zh"];
                var tr = document.createElement("tr");
                var td_id = document.createElement('td');
                td_id.setAttribute("scope", "row");
                td_id.innerHTML = parseInt(i) + 1;
                var td_title = document.createElement('td');
                var title_lable = document.createElement("a");
                title_lable.setAttribute("href", link);
                title_lable.setAttribute("target", "_blank");
                title_lable.innerHTML = title;
                td_title.appendChild(title_lable);
                var td_source = document.createElement('td');
                var source_lable = document.createElement("a");
                source_lable.setAttribute("href", source);
                source_lable.innerHTML = source_zh;
                td_source.appendChild(source_lable);
                tr.appendChild(td_id);
                tr.appendChild(td_title);
                tr.appendChild(td_source);
                tbody.appendChild(tr);
            }
        }
    },
    error: function(xhr, ajaxOptions, thrownError){
        console.log(xhr.status);
        console.log(thrownError);
    }
});

// 搜索框
$('input[type=radio]').click(function(event){
    search_links = {
        google: {
            link: "https://www.google.com/search",
            param: "q"
        },
        baidu: {
            link: "https://www.baidu.com/s",
            param: "wd"
        },
        bing: {
            link: "https://www.bing.com/search",
            param: "q"
        },
        github: {
            link: "https://github.com/search",
            param: "q"
        },
        duckduckgo: {
            link: "https://duckduckgo.com/",
            param: "q"
        },
        weixin: {
            link: "https://weixin.sogou.com/weixin",
            param: "query"
        }
    }
    var form_element = document.querySelector("#main-content > div:nth-child(3) > div > form");
    form_element.setAttribute("action", search_links[event.currentTarget.id].link);
    var input_element = document.querySelector("#main-content > div:nth-child(3) > div > form > div > input");
    input_element.setAttribute("name", search_links[event.currentTarget.id].param);
})