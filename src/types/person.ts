export interface PersonName {
	change_date: Date;
	first_name: string;
	last_name: string;
	middle_name: string;
	person_id: number;
	full_name: string;
	id: number;
	created_at: Date;
	updated_at: Date;
	is_deleted: boolean;
}

export interface Person {
	external_id: string;
	person_name_id: number;
	person_name: PersonName;
	full_name: string;
	id: number;
	created_at: Date;
	updated_at: Date;
	is_deleted: boolean;
}

export interface PersonsResponseType {
	total_amount: number;
	objects: Person[];
}

export interface PersonsRequestType {
	limit: number;
	offset: number;
}

export interface PersonRequestBody {
	last_name: string;
	first_name: string;
	middle_name: string;
}

export interface PersonUpdateRequestType {
	body: PersonRequestBody;
	id: number | string;
}
