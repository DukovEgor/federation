import { api } from '.';

import { ApiRoutes } from '@/constant/api';

import {
	CreateServiceRequestType,
	Service,
	ServicesRequestType,
	ServicesResponeType,
	UpdateServiceRequestType,
} from '@/types/services';

const servicesApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getServices: builder.query<ServicesResponeType, ServicesRequestType>({
			query: ({ limit = 100000, offset = 0 }) => ({
				url: ApiRoutes.Services,
				params: { limit, offset },
			}),
			providesTags: ['Services'],
		}),
		getService: builder.query<Service, string | number>({
			query: (id) => ({
				url: `${ApiRoutes.Services}/${id}`,
			}),
		}),
		createService: builder.mutation<null, CreateServiceRequestType>({
			query: (body) => ({
				url: ApiRoutes.Services,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Services'],
		}),
		updateService: builder.mutation<null, UpdateServiceRequestType>({
			query: ({ id, body }) => ({
				url: `${ApiRoutes.Services}/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Services'],
		}),
	}),
});

export const {
	useGetServicesQuery,
	useLazyGetServiceQuery,
	useLazyGetServicesQuery,
	useCreateServiceMutation,
	useUpdateServiceMutation,
} = servicesApi;
