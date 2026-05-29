import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const { pathname } = event.url;
  
  // Protect admin and CMS API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/cms')) {
    // Allow access to the login page itself
    if (pathname === '/admin/login') {
      return resolve(event);
    }

    const session = event.cookies.get('admin_session');
    
    // Simple check: if the secure cookie is missing or invalid, block access
    if (session !== 'true') {
      if (pathname.startsWith('/api/')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      throw redirect(303, '/admin/login');
    }
  }

  return resolve(event);
};
