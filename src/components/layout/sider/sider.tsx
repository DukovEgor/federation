import { Layout } from 'antd';
import { memo } from 'react';

import SiderMenu from '@/components/sider-menu/sider-menu';

import styles from './sider.module.scss';

function Sider() {
	return (
		<Layout.Sider className={styles.sider} collapsible theme="light">
			<SiderMenu />
		</Layout.Sider>
	);
}

export default memo(Sider);
