import { api } from '.';

import { ApiRoutes } from '@/constant/api';

import {
	CreateServicePermissionRequestType,
	DeleteServicePermissionRequestType,
	GetServicePermissionRequestType,
	ServicePermissionsResponseType,
	UpdateServicePermissionRequestType,
} from '@/types/service-permissions';

const servicesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getServicePermissions: builder.query<
			ServicePermissionsResponseType,
			GetServicePermissionRequestType
		>({
			query: (serviceId) => ({
				url: `${ApiRoutes.Services}/${serviceId}/${ApiRoutes.Permissions}`,
			}),
			providesTags: ['ServicePermissions'],
		}),
		createServicePermission: builder.mutation<
			null,
			CreateServicePermissionRequestType
		>({
			query: ({ serviceId, body }) => ({
				url: `${ApiRoutes.Services}/${serviceId}/${ApiRoutes.Permissions}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['ServicePermissions'],
		}),
		updateServicePermission: builder.mutation<
			null,
			UpdateServicePermissionRequestType
		>({
			query: ({ serviceId, permissionId, body }) => ({
				url: `${ApiRoutes.Services}/${serviceId}/${ApiRoutes.Permissions}/${permissionId}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['ServicePermissions'],
		}),
		deleteServicePermission: builder.mutation<
			null,
			DeleteServicePermissionRequestType
		>({
			query: ({ serviceId, permissionId }) => ({
				url: `${ApiRoutes.Services}/${serviceId}/${ApiRoutes.Permissions}/${permissionId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ServicePermissions'],
		}),
	}),
});

export const {
	useLazyGetServicePermissionsQuery,
	useCreateServicePermissionMutation,
	useUpdateServicePermissionMutation,
	useDeleteServicePermissionMutation,
} = servicesApi;
