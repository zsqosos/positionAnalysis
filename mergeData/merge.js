const fs = require('fs');

// fs.readFile('./1.json', (err, data) => {
//     if (err) throw err;
//     let obj = JSON.parse(data);
//     console.log(obj);
// });

// let obj = fs.readFileSync('../crawler/data/北京_.net_1.json','utf-8');
// console.log(JSON.parse(obj));


let list = fs.readdirSync('./data');

for (let i = 0; i < list.length; i++) {
    let path = './data/' + list[i];
    let obj = fs.readFileSync(path, 'utf-8');
    result.city = obj.content.position;
}