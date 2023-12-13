import { configureStore } from '@reduxjs/toolkit';

import { rtkQueryErrorLogger } from '@/middlewares/error';

import { api } from '../api';

import { rootReducer } from './root-reducer';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
			.concat(api.middleware)
			.concat(rtkQueryErrorLogger),
});
