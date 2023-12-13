import { Person } from './person';

export interface User {
	directory_id: number;
	email: string;
	external_id: string;
	name: string;
	phone: string;
	person_id: number;
	telegram_id?: number;
	person?: Person;
	id: number;
	created_at: Date;
	updated_at: Date;
	is_deleted: boolean;
	full_name: string;
}

export interface UsersResponseType {
	total_amount: number;
	objects: User[];
}

export interface UsersRequestType {
	offset: number;
	limit: number;
}

export interface UsersCreateRequestType {
	id: number;
	body: {
		directory_id: number;
		name: string;
		full_name: string;
		person_id: number;
		email: string;
	};
}
