import { Layout as AntLayout } from 'antd';
import { PropsWithChildren, memo } from 'react';

import { useAppSelector } from '@/hooks/index';

import { selectAccessToken } from '@/store/user-process/user-selectors';

import Breadcrumbs from './breadcrumbs/breadcrumbs';
import Footer from './footer/footer';
import Header from './header/header';
import Main from './main/main';
import Sider from './sider/sider';

function Layout({ children }: PropsWithChildren) {
	const accessToken = useAppSelector(selectAccessToken);

	return (
		<AntLayout style={{ minHeight: '100vh' }}>
			<Header />
			<AntLayout>
				{accessToken && <Sider />}
				<Main>
					{accessToken && <Breadcrumbs />}
					{children}
					<Footer />
				</Main>
			</AntLayout>
		</AntLayout>
	);
}

export default memo(Layout);
