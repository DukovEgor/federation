import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/constant/api';
import { NameSpace } from '@/constant/store';

import { RootState } from '@/types/state';

import { TAG_TYPES } from './tag-types/tag-types';

export const api = createApi({
	reducerPath: NameSpace.Api,
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const url = window.location.origin;
			const token = (getState() as RootState).user.user?.access_token;

			headers.set('X-Phs-From-User-Url', url);
			if (token) {
				headers.set('X-Auth-Token', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: TAG_TYPES,
	endpoints: () => ({}),
});
