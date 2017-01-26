// var getData = function (kd,city,pn) {
    const superagent = require('superagent');
    const fs = require('fs');
    const path = require('path');

    var city = '西安';
    var position = 'php';
    var pn = 1;

    const options = {
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
            'Referer': 'https://www.lagou.com/jobs/list_php?labelWords=&fromSearch=true&suginput=',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cookie': 'user_trace_token=20161013181330-b0c236da-912d-11e6-ac65-5254005c3644; LGUID=20161013181330-b0c23a43-912d-11e6-ac65-5254005c3644; gr_user_id=795fa8ba-ae3c-4319-a14f-9cec4ed09b48; index_location_city=%E5%85%A8%E5%9B%BD; JSESSIONID=50C2FF7D087D03E6EFBC207D84033396; _gat=1; _ga=GA1.2.139182473.1476353609; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1485269301,1485269384,1485269772,1485352603; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1485352603; LGSID=20170125215645-1bb9a560-e306-11e6-bd12-525400f775ce; PRE_UTM=; PRE_HOST=www.baidu.com; PRE_SITE=https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DPZoDI8dJxNvTHYDeK5kbo1JCCEJ2LpFvrhJwkruObP7%26wd%3D%26eqid%3Dc8706819000b3969000000065888ae99; PRE_LAND=https%3A%2F%2Fwww.lagou.com%2F; LGRID=20170125215645-1bb9a749-e306-11e6-bd12-525400f775ce; TG-TRACK-CODE=index_search; SEARCH_ID=5c39eff232744101ab72da356abed36b'
    };
    
    superagent
    .post(`https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&city=${city}&kd=${position}&pn=${pn}`)
    .send({
        'pn': 2,
        'kd': '前端',
        'first': true
    })
    .set(options)
    .end((err,res)=>{
        if(err) throw err;
        console.log(res.headers);
        console.log(res.text);
        fs.writeFile('test.json',res.text,{position:'/data'},(err) => {
            if(err) throw err;
            console.log('saved success');
        })
        }); 
        // res.on('end',()=>{
            // console.log(`RESULT:${postResult}`);
            // var jsonObj =JSON.parse(postResult);
            // //insert into db
            // jsonObj.content.result.forEach((item)=>{
            //     var salary = item.salary;
            //     //拆分3k-6k，易于统计
            //     var arr = salary.split('-');
            //     var min = arr[0].substring(0,arr[0].indexOf('k'));
            //     var max = arr.length>1? arr[1].substring(0,arr[1].indexOf('k')):min;
            //     item.salaryMin = parseInt(min);
            //     item.salaryMax = parseInt(max);
                
            //     mongo.save(city,item);
            // });
            // if(jsonObj.content.hasNextPage&&jsonObj.content.totalPageCount>pn){
            //     getData(kd,city,pn+1);
            // }
        // });
        // req.on('error',(e)=>{
            // console.log(`problem with request:${e.message}`);
        // }); 
    // });

    // req.write(postData);
    // req.end();
    // console.log(`start to get data. pn:${pn} city:${city} kd:${kd}`);
// };

// exports.run = getData;