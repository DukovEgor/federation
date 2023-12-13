import { api } from '.';

import { ApiRoutes } from '@/constant/api';

import {
	AutorizationRequestType,
	AutorizationResponseType,
} from '@/types/authorization';

export const authorization = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<
			AutorizationResponseType,
			AutorizationRequestType
		>({
			query: (body) => ({
				url: ApiRoutes.Session,
				method: 'POST',
				body,
			}),
		}),
		logout: builder.mutation({
			query: (accessToken) => ({
				url: ApiRoutes.Session,
				method: 'DELETE',
				headers: {
					'X-Auth-Token': `Bearer ${accessToken}`,
				},
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation } = authorization;
