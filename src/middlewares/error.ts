// noinspection JSIgnoredPromiseFromCall
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';

import { checkAuthAction } from '@/store/api-actions/renew-auth';

import { store } from '../store';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
	if (isRejectedWithValue(action)) {
		switch (action.payload.status) {
			case 400:
				action.payload.data?.context?.message
					? message.warning(action.payload?.data?.context?.message)
					: message.error('Проверьте введенные данные и попробуйте снова');
				break;
			case 401:
				store.dispatch(checkAuthAction());
				break;
			case 403:
				action.payload.data?.context?.message
					? message.warning(action.payload?.data?.context?.message)
					: message.warning(
							'Вы не уполномочены совершать операции с запрошенным ресурсом',
					  );
				break;
			case 404:
				action.payload.data?.context?.message
					? message.warning(action.payload?.data?.context?.message)
					: message.warning('Запрашиваемая страница или ресурс не найден');
				break;
			case 409:
				action.payload.data?.context?.message
					? message.warning(action.payload?.data?.context?.message)
					: message.warning('Данный объект уже забронирован');
				break;
			default:
				action.payload.data?.context?.message &&
					message.warning(action.payload?.data?.context?.message);
				break;
		}
	}

	return next(action);
};
