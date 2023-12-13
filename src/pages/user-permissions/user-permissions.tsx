import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Table, Tag, Typography, message } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UsersPermissionsDrawer from '@/components/users-permissions-drawer/users-permissions-drawer';

import {
	useDeleteUserPermissionMutation,
	useLazyGetUserPermissionsQuery,
} from '@/api/user-permissions';
import { useLazyGetUserQuery } from '@/api/users';

const { Title } = Typography;
const { Column } = Table;

function UserPermissions() {
	const { id } = useParams();

	const [open, setOpen] = useState(false);

	const [
		getUser,
		{ data: user, isLoading: isUserLoading, isFetching: isUserFetching },
	] = useLazyGetUserQuery();
	const [
		getPermissions,
		{
			data: permissions,
			isLoading: isPermissionsLoading,
			isFetching: isPermissionsFetching,
		},
	] = useLazyGetUserPermissionsQuery();
	const [deletePermission, { isLoading: isDeleteLoading }] =
		useDeleteUserPermissionMutation();

	const fetchUserData = useCallback(async () => {
		if (!id) {
			message.warning('ID не определен');
			return;
		}

		try {
			await getUser(id).unwrap();
			await getPermissions(id).unwrap();
		} catch (e) {
			message.error('Не удалось загрузить данные о пользователе');
		}
	}, [getPermissions, getUser, id]);

	const handleDeleteUserPermission = async (permissionId: number) => {
		if (!id) {
			message.warning('ID не определен');
			return;
		}
		try {
			await deletePermission({ userId: id, permissionId }).unwrap();
		} catch (e) {
			message.error('Не удалось удалить право');
		}
	};

	const handleCreate = () => {
		setOpen(true);
	};

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	return (
		<div className="px-1">
			<Title className="mb-2" level={3}>
				{user?.person?.full_name}
			</Title>
			<Row>
				<Button className="mb-1" type="primary" onClick={handleCreate}>
					Добавить право
				</Button>
			</Row>
			<Table
				loading={
					isUserLoading ||
					isUserFetching ||
					isPermissionsLoading ||
					isPermissionsFetching
				}
				dataSource={permissions}
				rowKey="id"
			>
				<Column
					title="Сервис"
					dataIndex={['permission', 'name']}
					render={(val) => <Tag color="green">{val}</Tag>}
				/>
				<Column title="Право" dataIndex={['permission', 'description']} />
				<Column title="Право" dataIndex={['permission', 'description']} />
				<Column
					title="Право"
					dataIndex={'id'}
					align="center"
					render={(val) => (
						<Popconfirm
							title="Удалить?"
							okText="Да"
							cancelText="Нет"
							onConfirm={() => handleDeleteUserPermission(val)}
						>
							<Button
								danger
								icon={<DeleteOutlined />}
								loading={isDeleteLoading}
							/>
						</Popconfirm>
					)}
				/>
			</Table>
			<UsersPermissionsDrawer open={open} onClose={handleClose} />
		</div>
	);
}

export default memo(UserPermissions);
