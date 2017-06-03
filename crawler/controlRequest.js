const superagent = require('superagent');
const async = require('async');
const getData = require('./getData');

function controlRequest(city, position,callback1) {
    let page = 1;
    let urls = [];
    // 利用async控制并发数量
    async.series(
        // series会依次执行队列中的函数
        [
            // 第一次发送请求先拿到总的页码数
            (cb) => {
                superagent
                    .post(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=1`)
                    .send({
                        'pn': page,
                        'kd': position,
                        'first': true
                    })
                    .set(getData.option)
                    .end((err, res) => {
                        if (err) throw err;
                        let dataObj = JSON.parse(res.text);
                        if (dataObj.success === true) {
                            page = dataObj.content.positionResult.totalCount;
                            cb(null, page);
                        }else{
                            console.log('获取数据失败,' + res.text);
                        }

                    });
            },
            // 根据第一次得到的page创建urls数组
            (cb) => {
                for (let i = 1; i <= Math.ceil(page / 15); i++) {
                    urls.push(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=${i}`)
                }
                console.log(`${city}的${position}职位共${page}条数据，${urls.length}页`);
                cb(null, urls);
            },
            // 利用async.mapLimit控制请求，每次最多发送3条请求
            () => {
                async.mapLimit(urls, 3, (url,callback) => {
                    getData.run(url, callback);
                }, (err, result) => {
                    if (err) throw err;
                    callback1(null);
                });
            }
        ], (err, result) => {
            if (err) throw err;
        });
}

exports.controlRequest = controlRequest;