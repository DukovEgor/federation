import { api } from '.';

import { ApiRoutes } from '@/constant/api';

import {
	PersonRequestBody,
	PersonUpdateRequestType,
	PersonsRequestType,
	PersonsResponseType,
} from '@/types/person';

const personsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getPersons: builder.query<PersonsResponseType, PersonsRequestType>({
			query: ({ limit = 100000, offset = 0 }) => ({
				url: ApiRoutes.Persons,
				params: { limit, offset },
			}),
			providesTags: ['Persons'],
		}),
		createPerson: builder.mutation<null, PersonRequestBody>({
			query: (body) => ({
				url: ApiRoutes.Persons,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Persons'],
		}),
		updatePerson: builder.mutation<null, PersonUpdateRequestType>({
			query: ({ id, body }) => ({
				url: `${ApiRoutes.Persons}/${id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Persons'],
		}),
	}),
});

export const {
	useGetPersonsQuery,
	useCreatePersonMutation,
	useUpdatePersonMutation,
} = personsApi;
