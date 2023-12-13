export interface ServicePermission {
	name: string;
	description: string;
	service_id: number;
	id: number;
	created_at: Date;
	updated_at: Date;
	is_deleted: boolean;
}
export type ServicePermissionsResponseType = ServicePermission[];

export type GetServicePermissionRequestType = string | number;

export interface ServicePermissionRequestBodyType {
	name: string;
	description: string;
}
export interface CreateServicePermissionRequestType {
	serviceId: string | number;
	body: ServicePermissionRequestBodyType;
}
export interface UpdateServicePermissionRequestType {
	serviceId: string | number;
	permissionId: string | number;
	body: ServicePermissionRequestBodyType;
}
export interface DeleteServicePermissionRequestType {
	serviceId: string | number;
	permissionId: string | number;
}
