const fs = require('fs');
const file = './src/lib/cms/data.json';
let data = JSON.parse(fs.readFileSync(file, 'utf-8'));

data.footer.bottomText = "© 2024 Lloyd Stark Studio. All rights reserved.";
data.footer.email = "hello@lloydstark.com";

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Footer updated');
