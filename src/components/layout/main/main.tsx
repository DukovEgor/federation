import { Layout } from 'antd';
import { PropsWithChildren, memo } from 'react';

import styles from './main.module.scss';

function Main({ children }: PropsWithChildren) {
	return <Layout.Content className={styles.main}>{children}</Layout.Content>;
}

export default memo(Main);
