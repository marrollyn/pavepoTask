import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ }) => {
	const deployTarget = process.env.VITE_DEPLOY_TARGET;
	const base = deployTarget === 'github' ? '/pavepoTask/' : '/';

	return {
		base,
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	};
});
