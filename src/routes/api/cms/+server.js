import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const filePath = path.resolve('src/lib/cms/data.json');
    
    // In production, you'd save to a database. 
    // Here we save to the file for the custom CMS experience.
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    return json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
