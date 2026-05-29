const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'lib', 'cms', 'data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Update globals
data.site.title = "UJJWAL SAIKIA";
data.pages.home.seo.title = "Ujjwal Saikia | High Performance Web Strategy";
data.pages.about.seo.title = "About - Ujjwal Saikia Studio";
data.pages.services.seo.title = "Services - Ujjwal Saikia Studio";
data.pages.contact.seo.title = "Contact - Ujjwal Saikia Studio";
data.pages.projects.seo.title = "Selected Work - Ujjwal Saikia Studio";
data.pages.insights.seo.title = "Insights - Ujjwal Saikia Studio";

data.footer.email = "ujjwalsaikia@outlook.in";
data.footer.bottomText = "© 2024 Ujjwal Saikia Studio. All rights reserved.";

// Add more sections to the other pages to fill them up
data.pages.about.sections.push({
  "type": "approach",
  "id": "about-approach",
  "eyebrow": "MY PHILOSOPHY",
  "title": "DESIGNING WITH PURPOSE.",
  "steps": [
    { "id": "01", "label": "EMPATHY", "text": "Understanding the user is the first step to great design." },
    { "id": "02", "label": "CLARITY", "text": "Simplifying complex problems into elegant solutions." },
    { "id": "03", "label": "CRAFT", "text": "Paying attention to every detail, from typography to performance." }
  ]
});

data.pages.services.sections.push({
  "type": "services",
  "id": "services-list",
  "eyebrow": "WHAT I DO",
  "title": "COMPREHENSIVE DIGITAL SOLUTIONS.",
  "items": [
    { "title": "FRONTEND DEVELOPMENT", "text": "Building fast, accessible, and responsive interfaces using SvelteKit, React, and modern web standards." },
    { "title": "UI/UX DESIGN", "text": "Crafting intuitive user experiences and beautiful interfaces that engage and convert." },
    { "title": "WEB STRATEGY", "text": "Aligning your digital presence with your business goals to maximize impact." }
  ]
});

data.pages.contact.sections.push({
  "type": "closing",
  "id": "contact-closing",
  "eyebrow": "LET'S TALK",
  "title": "REACH OUT TODAY.",
  "lead": "I'm currently available for new projects and collaborations.",
  "cta": "EMAIL ME",
  "faqTitle": "COMMON INQUIRIES",
  "faqs": [
    { "q": "Are you taking new clients?", "a": "Yes, I am currently accepting new projects." },
    { "q": "What is your hourly rate?", "a": "I prefer project-based pricing to ensure alignment on goals." }
  ]
});

// Write it back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log('data.json updated successfully.');
