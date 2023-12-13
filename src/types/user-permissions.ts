export interface AddUserPermissionRequestBody {
	permission_id: number | string;
}
export interface AddUserPermissionRequestType {
	userId: number | string;
	body: AddUserPermissionRequestBody;
}

export interface DeleteUserPermissionRequestType {
	userId: number | string;
	permissionId: number;
}
