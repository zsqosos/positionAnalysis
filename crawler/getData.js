const superagent = require('superagent');
const fs = require('fs');

let options = {
    'Host': 'www.lagou.com',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate,sdch, br',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cookie': 'JSESSIONID=ABAAABAACDBABJBEABDFFAA3157B710FDF8BFBE5A7564D3'
}; 

function getData(url, callback) {
    let num = 0;
    num++;
    let info = url.split('&');
    let city = info[1].split('=')[1];
    let position = info[2].split('=')[1];
    let page = info[3].split('=')[1];
    superagent
        // post请求
        .post(url)
        .send({
            'pn': page,
            'kd': position,
            'first': true
        })
        .set(options)
        // 请求成功处理接收数据
        .end((err, res) => {
            if (err) throw err;
            console.log(`正在抓取第${page}页，当前并发数量：${num}`);
            // 判断是否存在data文件夹，如不存在则创建data文件夹
            if(!fs.existsSync('./data')) {
                fs.mkdirSync('./data');
            }
            // 将数据以.json格式储存在data文件夹下
            fs.writeFile(`./data/${city}_${position}_${page}.json`, res.text, (err) => {
                if (err) throw err;
                // 写入数据完成后，两秒后再发送下一次请求
                setTimeout(() => {
                    num--;
                    console.log(`第${page}页写入成功`);
                }, 2000);
            });
        });
};

exports.run = getData;
exports.option = options;