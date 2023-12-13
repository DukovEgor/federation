import { Layout } from 'antd';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import AuthButton from '@/components/auth-button/auth-button';

import styles from './header.module.scss';

function Header() {
	return (
		<Layout.Header className={styles.header}>
			<Link to="/">
				<img src="/logo/logo.svg" alt="logo" width={200} height={50} />
			</Link>
			<AuthButton />
		</Layout.Header>
	);
}

export default memo(Header);
