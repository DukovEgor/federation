import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ru_RU';

import Unauthorized from '@/pages/unauthorized/unauthorized';

import { useAppSelector } from '@/hooks/index';

import { selectAccessToken } from '@/store/user-process/user-selectors';

import Router from '@/router/router';

import { defaultTheme } from '@/constant/theme';

import Layout from '../layout';

function App() {
	const accessToken = useAppSelector(selectAccessToken);

	return (
		<ConfigProvider locale={locale} theme={defaultTheme}>
			<Layout>{accessToken ? <Router /> : <Unauthorized />}</Layout>
		</ConfigProvider>
	);
}

export default App;
