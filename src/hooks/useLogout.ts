import { useAppSelector } from '.';
import { message } from 'antd';
import { useCallback } from 'react';

import { selectAccessToken } from '@/store/user-process/user-selectors';

import { useLogoutMutation } from '@/api/authorization';

import { resetAuth } from '@/utils/resetAuth';

const useLogout = () => {
	const accessToken = useAppSelector(selectAccessToken);
	const [doLogout] = useLogoutMutation();

	const logout = useCallback(async () => {
		try {
			await doLogout(accessToken).unwrap();
			resetAuth();
		} catch (err) {
			message.warning('Не удалось выполнить выход');
		}
	}, [accessToken, doLogout]);

	return logout;
};

export default useLogout;
