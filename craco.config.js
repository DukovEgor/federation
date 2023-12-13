/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
	webpack: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/pages': path.resolve(__dirname, './src/pages'),
			'@/components': path.resolve(__dirname, './src/components'),
			'@/components/layout': path.resolve(
				__dirname,
				'./src/components/layout',
			),
			'@/hooks': path.resolve(__dirname, './src/hooks'),
			'@/store': path.resolve(__dirname, './src/store'),
			'@/api': path.resolve(__dirname, './src/api'),
			'@/router': path.resolve(__dirname, './src/router'),
			'@/middlewares': path.resolve(__dirname, './src/middlewares'),
			'@/constant': path.resolve(__dirname, './src/constant'),
			'@/types': path.resolve(__dirname, './src/types'),
			'@/utils': path.resolve(__dirname, './src/utils'),
		},
	},
};
