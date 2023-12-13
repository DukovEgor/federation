import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';

import { useAppSelector } from '@/hooks/index';
import useLogout from '@/hooks/useLogout';

import { selectAccessToken } from '@/store/user-process/user-selectors';

import styles from './auth-button.module.scss';

function AuthButton() {
	const accessToken = useAppSelector(selectAccessToken);

	const logout = useLogout();

	const handleLogout = async () => {
		await logout();
	};

	if (!accessToken) {
		return null;
	}

	return (
		<div className={styles.authbutton}>
			<Button icon={<LogoutOutlined />} onClick={handleLogout}>
				Выйти
			</Button>
		</div>
	);
}

export default memo(AuthButton);
