import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
  const dataPath = path.resolve('src/lib/cms/data.json');
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const cmsData = JSON.parse(raw);
    const project = cmsData.projects.find((p) => p.slug === params.slug);
    
    if (!project) throw error(404, 'Project not found');
    
    return { project };
  } catch (e) {
    if (e?.status) throw e;
    console.error('Project Load Error:', e);
    throw error(500, 'Failed to load project');
  }
}
