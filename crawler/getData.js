const superagent = require('superagent');
const fs = require('fs');
let num = 0;
let options = {
    'Host': 'www.lagou.com',
    'Connection': 'keep-alive',
    'Content-Length': 22,
    'Origin': 'https://www.lagou.com',
    'X-Anit-Forge-Code': 0,
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01,',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Anit-Forge-Token': 'None',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cookie': 'user_trace_token=20161013181330-b0c236da-912d-11e6-ac65-5254005c3644; LGUID=20161013181330-b0c23a43-912d-11e6-ac65-5254005c3644; gr_user_id=795fa8ba-ae3c-4319-a14f-9cec4ed09b48; index_location_city=%E5%85%A8%E5%9B%BD; JSESSIONID=50C2FF7D087D03E6EFBC207D84033396; _gat=1; _ga=GA1.2.139182473.1476353609; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1485269301,1485269384,1485269772,1485352603; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1485352603; LGSID=20170125215645-1bb9a560-e306-11e6-bd12-525400f775ce; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DPZoDI8dJxNvTHYDeK5kbo1JCCEJ2LpFvrhJwkruObP7%26wd%3D%26eqid%3Dc8706819000b3969000000065888ae99; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; LGRID=20170125215645-1bb9a749-e306-11e6-bd12-525400f775ce; TG-TRACK-CODE=index_search; SEARCH_ID=5c39eff232744101ab72da356abed36b'
};

function getData(url, callback) {
    num++;
    let info = url.split('&');
    let city = info[1].split('=')[1];
    let position = info[2].split('=')[1];
    let page = info[3].split('=')[1];
    superagent
        .post(url)
        .send({
            'pn': page,
            'kd': position,
            'first': true
        })
        .set(options)
        .end((err, res) => {
            if (err) throw err;
            console.log(`正在抓取第${page}页，当前并发数量：${num}`);
            fs.writeFile(`./data/${city}_${position}_${page}.json`, res.text, (err) => {
                if (err) throw err;
                setTimeout(() => {
                    num--;
                    console.log(`第${page}页写入成功`);
                    callback(null, 'success');
                }, 2000);
            })
        });
};

exports.run = getData;
exports.option = options;