import vercelAdapter from '@sveltejs/adapter-vercel';
import nodeAdapter from '@sveltejs/adapter-node';

const isWindows = process.platform === 'win32';
const adapter = isWindows ? nodeAdapter() : vercelAdapter({ runtime: 'nodejs22.x' });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter,
		alias: {
			'$components': 'src/lib/components',
			'$lib': 'src/lib'
		}
	}
};

export default config;
