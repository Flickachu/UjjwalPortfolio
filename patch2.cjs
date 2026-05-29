const fs = require('fs');
const file = './src/lib/cms/data.json';
let data = JSON.parse(fs.readFileSync(file, 'utf-8'));

data.pages.home.sections[6].items[0].role = "Founder, Laminato Gallery";
data.pages.home.sections[6].items[0].avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150";

data.pages.home.sections[6].items[1].role = "CEO, FlowMatch";
data.pages.home.sections[6].items[1].avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150";

data.pages.home.sections[6].items[2].role = "Founder, Flickcache";
data.pages.home.sections[6].items[2].avatar = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150";

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Testimonials updated');
