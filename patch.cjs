const fs = require('fs');
const file = './src/lib/cms/data.json';
let data = JSON.parse(fs.readFileSync(file, 'utf-8'));

data.site.title = "LLOYD STARK";
data.site.navLinks = [
  { label: "WORK", href: "/#work" },
  { label: "SERVICES", "href": "/services" },
  { label: "ABOUT", "href": "/about" },
  { label: "INSIGHTS", "href": "/insights" }
];

// problem-grid
data.pages.home.sections[2].title = "A WEBSITE SHOULD GROW YOUR BUSINESS, NOT GET IN THE WAY.";
data.pages.home.sections[2].lead = "If your site looks generic, loads slow, or doesn't communicate value, you're leaving trust—and revenue—on the table.";
data.pages.home.sections[2].cards = [
  { id: "01", title: "You lose potential clients in the first few seconds." },
  { id: "02", title: "Your message is unclear or buried in clutter." },
  { id: "03", title: "It doesn't build trust or stand out from competitors." },
  { id: "04", title: "It wasn't built to convert, scale, or adapt." }
];

// approach
data.pages.home.sections[3].eyebrow = "02 / OUR APPROACH";
data.pages.home.sections[3].steps = [
  { id: "01", label: "DISCOVER", text: "We dive deep into your business, audience, and goals." },
  { id: "02", label: "STRATEGIZE", text: "We map the right structure, message, and conversion path." },
  { id: "03", label: "DESIGN", text: "We craft a clean, engaging experience that builds instant trust." },
  { id: "04", label: "LAUNCH & OPTIMIZE", text: "We launch fast, then refine based on real data and results." }
];

// projects
const p1 = data.pages.home.sections[4].projects[0];
p1.title = "LAMINATO";
p1.description = "Premium surfaces. Timeless spaces.";
p1.tags = ["WEB DESIGN", "BRAND EXPERIENCE"];
const p2 = data.pages.home.sections[4].projects[1];
p2.title = "FLOWMATCH";
p2.description = "Engineered for more than speed.";
p2.tags = ["MARKETPLACE", "UI/UX"];
const p3 = data.pages.home.sections[4].projects[2];
p3.title = "FLICKCACHE";
p3.description = "Design that feels like home.";
p3.tags = ["BRANDING", "WEB DESIGN"];

// services as OUR PROCESS
const processSection = {
  type: "services",
  id: "process",
  eyebrow: "04 / OUR PROCESS",
  title: "A CLEAR PROCESS. ZERO GUESSWORK.",
  lead: "",
  items: [
    { title: "DISCOVERY", text: "Understand your business, audience, and goals." },
    { title: "RESEARCH", text: "Market analysis, user insights, competitor review." },
    { title: "STRATEGIC PLANNING", text: "Craft the blueprint: content, UX, site architecture, and flow." },
    { title: "DESIGN & DEVELOP", text: "Design with purpose. Build for speed, scale, and flexibility." },
    { title: "LAUNCH & GROW", text: "QA, performance optimization, and continuous improvement." }
  ]
};

// Insert process section before testimonials
data.pages.home.sections.splice(5, 0, processSection);

// Testimonials
data.pages.home.sections[6].eyebrow = "05 / CLIENT LOVE";
data.pages.home.sections[6].items = [
  { name: "ISABELLA ROSSI", quote: "The site feels like we stepped into a new tier. It's faster, clearer, and we're finally getting the right inquiries." },
  { name: "ANTHONY COLE", quote: "Clear process, exceptional communication, and a website that actually brings in business." },
  { name: "DANIEL VERDA", quote: "Professional, fast, and insanely good at what they do." }
];

// Closing
data.pages.home.sections[7].eyebrow = "06 / FAQ";
data.pages.home.sections[7].faqs = [
  { q: "What kind of websites do you build?", a: "We focus on high-performance SvelteKit marketing sites and web apps." },
  { q: "Do you only design, or also develop?", a: "Both. We handle the entire process from strategy to launch." },
  { q: "How long does a project take?", a: "Typically 4-8 weeks from research to launch, depending on complexity." },
  { q: "Will I be able to edit my site?", a: "Yes, we provide a custom, easy-to-use CMS for your team." }
];

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('JSON updated successfully');
