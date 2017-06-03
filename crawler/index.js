
const getData = require('./getData');
const request = require('superagent');
const async = require('async');

function index(city, position) {
    let page = 1;
    let urls = [];
    async.series(
        [
            (cb) => {
                request
                    .post(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=1`)
                    .send({
                        'pn': page,
                        'kd': position,
                        'first': true
                    })
                    .set(getData.option)
                    .end((err, res) => {
                        if (err) throw err;
                        page = JSON.parse(res.text).content.positionResult.totalCount;
                        cb(null, page);
                    });
            },
            (cb) => {
                for (let i = 1; i <= Math.ceil(page / 15); i++) {
                    urls.push(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=${i}`)
                }
                console.log(`${city}的${position}职位共${page}条数据，${urls.length}页`);
                cb(null, urls);
            },
            () => {
                async.mapLimit(urls, 3, (url, callBack) => {
                    getData.run(url, callBack);
                }, (err, result) => {
                    if (err) throw err;
                });
            }
        ], (err, result) => { 
            if (err) throw err;
        });
}
if (process.argv[2] && process.argv[3]) {
    index(process.argv[2], process.argv[3]);
} else {
    console.log('请输入要爬取的城市和职位');
}