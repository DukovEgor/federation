export interface AutorizationRequestType {
	username: string;
	password: string;
}
export interface AutorizationData extends AutorizationRequestType {
	remember: boolean;
}

export interface User {
	deleted: boolean;
	directory_id: number;
	email: string;
	external_id: string;
	id: number;
	name: string;
	phone: string;
	person_id: number;
}

export interface AutorizationResponseType {
	access_token: string;
	update_token: string;
	access_expires_at: Date;
	update_expires_at: Date;
	access_expired: boolean;
	user: User;
	permissions: string[];
}
