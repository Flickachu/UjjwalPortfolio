const fs = require('fs');
const file = './src/lib/cms/data.json';
let data = JSON.parse(fs.readFileSync(file, 'utf-8'));

data.pages.home.sections[1].items[2] = "FLICKCACHE";

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Logo track updated');
