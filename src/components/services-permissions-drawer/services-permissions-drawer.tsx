import { Button, Drawer, Form, Input, Row, message } from 'antd';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

import {
	useCreateServicePermissionMutation,
	useUpdateServicePermissionMutation,
} from '@/api/service-permissions';

import {
	ServicePermission,
	ServicePermissionRequestBodyType,
} from '@/types/service-permissions';

const { Item } = Form;

interface ServicesPermissionsDrawerProps {
	open: boolean;
	permission: ServicePermission | null;
	onClose: () => void;
}

function ServicesPermissionsDrawer({
	open,
	permission,
	onClose,
}: ServicesPermissionsDrawerProps) {
	const { id } = useParams();

	const [createPermission, { isLoading: isCreateLoading }] =
		useCreateServicePermissionMutation();
	const [updatePermission, { isLoading: isUpdateLoading }] =
		useUpdateServicePermissionMutation();

	const fetchNewServicePermission = async (
		body: ServicePermissionRequestBodyType,
	) => {
		if (!id) {
			message.warning('ID не определен');
			return;
		}

		try {
			await createPermission({ serviceId: id, body }).unwrap();
			onClose();
		} catch (e) {
			message.error('Не удалось добавить право пользователю');
		}
	};
	const fetchUpdateServicePermission = async (
		body: ServicePermissionRequestBodyType,
	) => {
		if (!id || !permission) {
			message.warning('ID не определен');
			return;
		}

		try {
			await updatePermission({
				serviceId: id,
				permissionId: permission?.id,
				body,
			}).unwrap();
			onClose();
		} catch (e) {
			message.error('Не удалось добавить право пользователю');
		}
	};

	return (
		<Drawer title="Добавить право" open={open} closable onClose={onClose}>
			<Form
				layout="vertical"
				key={permission?.id}
				onFinish={
					permission
						? fetchUpdateServicePermission
						: fetchNewServicePermission
				}
			>
				<Item label="Название" name="name" initialValue={permission?.name}>
					<Input minLength={2} />
				</Item>
				<Item
					label="Описание"
					name="description"
					initialValue={permission?.description}
				>
					<Input minLength={2} />
				</Item>
				<Row justify="space-between">
					<Button
						type="primary"
						htmlType="submit"
						loading={isCreateLoading || isUpdateLoading}
					>
						Добавить
					</Button>
					<Button type="default" htmlType="reset">
						Отмена
					</Button>
				</Row>
			</Form>
		</Drawer>
	);
}

export default memo(ServicesPermissionsDrawer);
