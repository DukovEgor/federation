import { api } from '.';

import { ApiRoutes } from '@/constant/api';

import {
	User,
	UsersCreateRequestType,
	UsersRequestType,
	UsersResponseType,
} from '@/types/users';

const usersApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<UsersResponseType, UsersRequestType>({
			query: ({ limit = 100000, offset = 0 }) => ({
				url: ApiRoutes.Users,
				params: { limit, offset },
			}),
			providesTags: ['Users'],
		}),
		getUser: builder.query<User, string>({
			query: (id) => ({
				url: `${ApiRoutes.Users}/${id}`,
			}),
		}),
		createUser: builder.mutation<null, UsersCreateRequestType['body']>({
			query: (body) => ({
				url: ApiRoutes.Users,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Users'],
		}),
		updateUser: builder.mutation<null, UsersCreateRequestType>({
			query: ({ body, id }) => ({
				url: `${ApiRoutes.Users}/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Users'],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useLazyGetUserQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
} = usersApi;
