import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
	Button,
	Popconfirm,
	Row,
	Space,
	Table,
	Tag,
	Typography,
	message,
} from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ServicesPermissionsDrawer from '@/components/services-permissions-drawer/services-permissions-drawer';

import {
	useDeleteServicePermissionMutation,
	useLazyGetServicePermissionsQuery,
} from '@/api/service-permissions';
import { useLazyGetServiceQuery } from '@/api/services';

import { ServicePermission } from '@/types/service-permissions';

const { Title } = Typography;
const { Column } = Table;

function ServicePermissions() {
	const { id } = useParams();

	const [open, setOpen] = useState(false);
	const [permission, setPermission] = useState<ServicePermission | null>(null);

	const [
		getService,
		{
			data: service,
			isLoading: isServiceLoading,
			isFetching: isServiceFetching,
		},
	] = useLazyGetServiceQuery();
	const [
		getPermissions,
		{
			data: permissions,
			isLoading: isPermissionsLoading,
			isFetching: isPermissionsFetching,
		},
	] = useLazyGetServicePermissionsQuery();
	const [deletePermission, { isLoading: isDeleteLoading }] =
		useDeleteServicePermissionMutation();

	const fetchServiceData = useCallback(async () => {
		if (!id) {
			message.warning('ID не определен');
			return;
		}

		try {
			await getService(id).unwrap();
			await getPermissions(id).unwrap();
		} catch (e) {
			message.error('Не удалось загрузить данные о пользователе');
		}
	}, [getPermissions, getService, id]);

	const handleDeleteServicePermission = async (permissionId: number) => {
		if (!id) {
			message.warning('ID не определен');
			return;
		}
		try {
			await deletePermission({ serviceId: id, permissionId }).unwrap();
		} catch (e) {
			message.error('Не удалось удалить право');
		}
	};

	const handleCreate = () => {
		setOpen(true);
	};
	const handleEdit = (obj: ServicePermission) => {
		setPermission(obj);
		setOpen(true);
	};

	const handleClose = useCallback(() => {
		setPermission(null);
		setOpen(false);
	}, []);

	useEffect(() => {
		fetchServiceData();
	}, [fetchServiceData]);

	return (
		<div className="px-1">
			<Title className="mb-2" level={3}>
				{service?.name}
			</Title>
			<Row>
				<Button className="mb-1" type="primary" onClick={handleCreate}>
					Добавить право
				</Button>
			</Row>
			<Table
				loading={
					isServiceLoading ||
					isServiceFetching ||
					isPermissionsLoading ||
					isPermissionsFetching
				}
				dataSource={permissions}
				rowKey="id"
			>
				<Column
					title="Право"
					dataIndex="name"
					render={(val) => <Tag color="green">{val}</Tag>}
				/>
				<Column title="Описание" dataIndex="description" />
				<Column
					title="ID"
					dataIndex="id"
					render={(val) => <Tag color="blue">{val}</Tag>}
				/>
				<Column
					title="Действия"
					dataIndex={'id'}
					align="center"
					width="5%"
					render={(val, record: ServicePermission) => (
						<Space>
							<Button
								type="primary"
								icon={<EditOutlined />}
								onClick={() => handleEdit(record)}
							/>
							<Popconfirm
								title="Удалить?"
								okText="Да"
								cancelText="Нет"
								onConfirm={() => handleDeleteServicePermission(val)}
							>
								<Button
									danger
									icon={<DeleteOutlined />}
									loading={isDeleteLoading}
								/>
							</Popconfirm>
						</Space>
					)}
				/>
			</Table>
			<ServicesPermissionsDrawer
				open={open}
				onClose={handleClose}
				permission={permission}
			/>
		</div>
	);
}

export default memo(ServicePermissions);
