
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

var website_text =
`
常用网址|常用网址|BiliBili|https://www.bilibili.com/|国内知名的视频弹幕网站|https://www.bilibili.com/favicon.ico
常用网址|常用网址|Github|https://github.com/|GitHub is where people build software|https://github.com//favicon.ico
常用网址|常用网址|谷歌翻译|https://translate.google.cn/|比较好用的翻译工具|https://translate.google.cn/favicon.ico
常用网址|常用网址|三之博客|https://threezh1.com/|三之的博客|https://threezh1.com/favicon.ico
安全工具|安全工具|ctf编码|http://ctf.ssleye.com/|CTFcode为CTF比赛人员、程序员提供20多种常用编码|http://ctf.ssleye.com/static/ctf_favicon.ico
安全工具|安全工具|ceye|http://ceye.io/|Monitor service for security testing|http://ceye.io/static/ceye.icon
安全工具|安全工具|regex101|https://regex101.com/|Regular expression tester with syntax highlighting|https://regex101.com/favicon.ico
安全工具|安全工具|regexper|https://regexper.com/|Regular expression visualizer using railroad diagrams|https://regexper.com/favicon.ico
安全论坛|安全论坛|先知论坛|https://xz.aliyun.com/|先知安全技术社区|https://xz.aliyun.com/static/icon/favicon.ico
安全论坛|安全论坛|安全客|http://www.anquanke.com/|安全资讯平台|https://p0.ssl.qhimg.com/t01b2a1553a7bc927cb.ico?v=1.2
安全论坛|安全论坛|Seebug|https://paper.seebug.org/|Paper - 安全技术精粹|https://paper.seebug.org/static/images/favicon.ico
安全论坛|安全论坛|知识星球|https://wx.zsxq.com/|知识星球是创作者连接铁杆粉丝，实现知识变现的工具。|https://wx.zsxq.com/dweb2/assets/images/favicon_32.ico
`
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

var main_content_div = document.querySelector("#main-content")
var foot_element = document.querySelector("#main-content > h4:nth-child(4)")

for (i in websites_json) {
    // <h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="常用推荐"></i>常用推荐</h4>
    var kind_title_h4 = document.createElement("h4");
    kind_title_h4.setAttribute("class", "text-gray");
    kind_title_h4.innerHTML = `<br /><i class="linecons-tag" style="margin-right: 7px;" id="` + i +`"></i>` + i;
    foot_element.before(kind_title_h4);
    row_num = 1
    for (j in websites_json[i]) {
        var siteinfo = websites_json[i][j]
        console.log(siteinfo)
        row_element = document.createElement("div")
        row_element.setAttribute("class", "row")
        foot_element.before(row_element)
        for (k in siteinfo) {
            var info = siteinfo[k]
            site_element = document.createElement("div")
            site_element.setAttribute("class", "col-sm-3")
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
            site_innerHTML = site_innerHTML.replace("{link}", siteinfo[k]["link"])
            site_innerHTML = site_innerHTML.format({
                title: siteinfo[k]["title"],
                link: siteinfo[k]["link"],
                introduction: siteinfo[k]["introduction"],
                logo: siteinfo[k]["logo"]
            })
            site_element.innerHTML = site_innerHTML
            row_element.appendChild(site_element)
        }
    }
}

br_element = document.createElement("br")
foot_element.before(br_element)

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

var requestURL = "http://129.211.93.28:3302/api/extract";
var info = {};
info["type"] = "TIME";
info["keyword"] = new Date().format("yyyy-MM-dd");
//console.log(info)
var tbody = document.getElementById("info_tbody_1")
$.ajax({
    url: requestURL,
    data: JSON.stringify(info),
    type: "POST",
    dataType: "json",
    contentType: "application/json;charset=utf-8",
    success: function(returnData){
        //console.log(returnData);
        if (returnData.code == 1000) {
            returnData.extractInfo.reverse()
            for (i in returnData.extractInfo) {
                title = returnData.extractInfo[i]["title"]
                link = returnData.extractInfo[i]["link"]
                source = returnData.extractInfo[i]["source"]
                source_zh = returnData.extractInfo[i]["source_zh"]
                var tr = document.createElement("tr");
                var td_id = document.createElement('td');
                td_id.setAttribute("scope", "row")
                td_id.innerHTML = parseInt(i) + 1
                var td_title = document.createElement('td');
                title_lable = document.createElement("a")
                title_lable.setAttribute("href", link)
                title_lable.setAttribute("target", "_blank")
                title_lable.innerHTML = title
                td_title.appendChild(title_lable)
                var td_source = document.createElement('td');
                source_lable = document.createElement("a")
                source_lable.setAttribute("href", source)
                source_lable.innerHTML = source_zh
                td_source.appendChild(source_lable)
                //console.log(returnData.extractInfo[i])
                tr.appendChild(td_id)
                tr.appendChild(td_title)
                tr.appendChild(td_source)
                tbody.appendChild(tr);
            }
        }
    },
    error: function(xhr, ajaxOptions, thrownError){
        console.log(xhr.status);
        console.log(thrownError);
    }
});

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
    form_element = document.querySelector("#main-content > div:nth-child(3) > div > form")
    form_element.setAttribute("action", search_links[event.currentTarget.id].link)
    input_element = document.querySelector("#main-content > div:nth-child(3) > div > form > div > input")
    input_element.setAttribute("name", search_links[event.currentTarget.id].param)
})