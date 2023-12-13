import { api } from '.';

import { ApiRoutes } from '@/constant/api';

import {
	AddUserPermissionRequestType,
	DeleteUserPermissionRequestType,
} from '@/types/user-permissions';

const userPermissionsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUserPermissions: builder.query({
			query: (id) => ({
				url: `${ApiRoutes.Users}/${id}/${ApiRoutes.Permissions}`,
			}),
			providesTags: ['UsersPermissions'],
		}),
		createUserPermission: builder.mutation<
			null,
			AddUserPermissionRequestType
		>({
			query: ({ userId, body }) => ({
				url: `${ApiRoutes.Users}/${userId}/${ApiRoutes.Permissions}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['UsersPermissions'],
		}),
		deleteUserPermission: builder.mutation<
			null,
			DeleteUserPermissionRequestType
		>({
			query: ({ userId, permissionId }) => ({
				url: `${ApiRoutes.Users}/${userId}/${ApiRoutes.Permissions}/${permissionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['UsersPermissions'],
		}),
	}),
});

export const {
	useLazyGetUserPermissionsQuery,
	useCreateUserPermissionMutation,
	useDeleteUserPermissionMutation,
} = userPermissionsApi;
