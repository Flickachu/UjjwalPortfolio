import { fail, redirect } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const actions = {
  logout: async ({ cookies }) => {
    cookies.delete('admin_session', { path: '/' });
    throw redirect(303, '/admin/login');
  },
  
  changePassword: async ({ request }) => {
    const data = await request.formData();
    const newPassword = data.get('newPassword');
    
    if (!newPassword || newPassword.length < 6) {
      return fail(400, { error: 'Password must be at least 6 characters long.' });
    }

    try {
      const envPaths = [path.resolve('.env'), path.resolve('.env.example')];
      
      for (const envPath of envPaths) {
        if (fs.existsSync(envPath)) {
          let envContent = fs.readFileSync(envPath, 'utf8');
          
          if (/ADMIN_PASSWORD=/.test(envContent)) {
            envContent = envContent.replace(/ADMIN_PASSWORD=.*/g, `ADMIN_PASSWORD="${newPassword}"`);
          } else {
            envContent += `\nADMIN_PASSWORD="${newPassword}"`;
          }
          
          fs.writeFileSync(envPath, envContent);
        }
      }
      
      // Update the current Node.js process environment variables
      process.env.ADMIN_PASSWORD = newPassword;
      
      return { success: true, message: 'Password updated successfully!' };
    } catch (e) {
      console.error("Failed to write to .env:", e);
      return fail(500, { error: 'Failed to update password.' });
    }
  }
};
