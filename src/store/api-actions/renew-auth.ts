import { store } from '..';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { ApiRoutes, BASE_URL } from '@/constant/api';

import { AutorizationResponseType } from '@/types/authorization';

import { resetAuth } from '@/utils/resetAuth';

import { setUser } from '../user-process/user-process';

export const checkAuthAction = createAsyncThunk('user/checkAuth', async () => {
	try {
		const token = store.getState().user.user?.update_token;

		if (!token) {
			return;
		}

		const response = await fetch(`${BASE_URL}${ApiRoutes.Session}`, {
			method: 'PUT',
			headers: { 'X-Auth-Token': `Bearer ${token}` },
		});

		const user: AutorizationResponseType = await response.json();

		store.dispatch(setUser(user));

		localStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		resetAuth();
		message.warning('Не удалось продлить сессию. Выполните вход в систему.');
	}
});
