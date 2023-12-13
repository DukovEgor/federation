import { useAppDispatch } from '.';
import { message } from 'antd';
import { useCallback, useState } from 'react';

import { setUser } from '@/store/user-process/user-process';

import { useLoginMutation } from '@/api/authorization';

import { AutorizationData } from '@/types/authorization';

const useLogin = () => {
	const [isLoading, setLoading] = useState(false);
	const dispatch = useAppDispatch();

	const [doLogin] = useLoginMutation();

	const login = useCallback(
		async (authData: AutorizationData) => {
			setLoading(true);

			const { remember, ...rest } = authData;

			try {
				const user = await doLogin({
					...rest,
				}).unwrap();
				dispatch(setUser(user));

				if (remember) {
					localStorage.setItem('user', JSON.stringify(user));
				}
			} catch (err) {
				dispatch(setUser(null));

				message.warning('Не удалось выполнить вход');
			} finally {
				setLoading(false);
			}
		},
		[dispatch, doLogin],
	);

	return { login, isLoading };
};

export default useLogin;
