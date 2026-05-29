import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    // Ensure we have credentials configured in .env
    const correctEmail = env.ADMIN_EMAIL;
    const correctPassword = env.ADMIN_PASSWORD;

    if (!correctEmail || !correctPassword) {
      return fail(500, { error: 'Admin credentials are not configured on the server.' });
    }

    if (email === correctEmail && password === correctPassword) {
      cookies.set('admin_session', 'true', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      throw redirect(303, '/admin');
    }

    return fail(401, { error: 'Incorrect password.' });
  }
};
