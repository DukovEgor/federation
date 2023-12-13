import 'antd/dist/reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app/app';
import './index.css';
import { store } from './store';
import { init } from './utils/init';

const root = createRoot(document.getElementById('root') as HTMLElement);

init();

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
