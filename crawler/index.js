const async = require('async');
const requestLagou = require('./controlRequest');
const defaultArgv = require('./defaultArgv.json');

if (process.argv.length === 4) {
    console.log('准备开始请求' + process.argv[2] + '的' + process.argv[3] + '职位数据');
    requestLagou.controlRequest(process.argv[2], process.argv[3]);
} else if (process.argv[2] === 'start') {
    let defaultArr = [];
    console.log('准备按照默认参数开始请求');
    //生成请求数组，来控制请求函数并发数量为1
    for (let i = 0; i < defaultArgv.city.length; i++) {
        for (let j = 0; j < defaultArgv.positionKd.length; j++) {
            let argvs = [defaultArgv.city[i], defaultArgv.positionKd[j]];
            defaultArr.push(argvs);
        }
    }
    async.mapSeries(defaultArr, function (argvItem, callback) {
        console.log('开始请求' + argvItem[0] + '的' + argvItem[1] + '职位数据');
        // requestLagou.controlRequest(argvItem[0], argvItem[1],callback);
    }, function (err, result) {
        if (err) throw err;
    });
} else {
    console.log('请正确输入要爬取的城市和职位，正确格式为："node index 城市 关键词" 或 "node index start" 例如："node index 北京 php" 或"node index start"');
}