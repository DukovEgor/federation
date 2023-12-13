export interface Service {
	name: string;
	description: string;
	starting_id_value: number;
	id: number;
	created_at: Date;
	updated_at: Date;
	is_deleted: boolean;
}

export interface ServicesResponeType {
	total_amount: number;
	objects: Service[];
}

export interface ServicesRequestType {
	limit: number;
	offset: number;
}

export interface CreateServiceRequestType {
	name: string;
	description: string;
	directory_id: number;
}

export interface UpdateServiceRequestType {
	id: string | number;
	body: CreateServiceRequestType;
}
