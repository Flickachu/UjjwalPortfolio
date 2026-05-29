const fs = require('fs');
const file = './src/lib/cms/data.json';
let data = JSON.parse(fs.readFileSync(file, 'utf-8'));

const p1 = data.pages.home.sections[4].projects[0];
p1.client = "LAMINATO GALLERY";
p1.clientDesc = "Premium surface brand";

const p2 = data.pages.home.sections[4].projects[1];
p2.client = "FLOWMATCH";
p2.clientDesc = "Automotive marketplace platform";

const p3 = data.pages.home.sections[4].projects[2];
p3.client = "FLICKCACHE";
p3.clientDesc = "Contemporary furniture brand"; // wait the image says contemporary furniture brand for flickcache!

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Project card data updated');
