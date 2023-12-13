import { Button, Drawer, Form, Row, Select, message } from 'antd';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useLazyGetServicePermissionsQuery } from '@/api/service-permissions';
import { useLazyGetServicesQuery } from '@/api/services';
import { useCreateUserPermissionMutation } from '@/api/user-permissions';

import { AddUserPermissionRequestBody } from '@/types/user-permissions';

const { Item } = Form;

interface UsersPermissionsDrawerProps {
	open: boolean;
	onClose: () => void;
}

function UsersPermissionsDrawer({
	open,
	onClose,
}: UsersPermissionsDrawerProps) {
	const { id } = useParams();
	const [service, setService] = useState<number | null>(null);

	const permissionRef = useRef(null);

	const [
		getServices,
		{
			data: services,
			isLoading: isServicesLoading,
			isFetching: isServicesFetching,
		},
	] = useLazyGetServicesQuery();
	const [
		getServicePermissions,
		{
			data: servicePermissions,
			isLoading: isServicePermissionsLoading,
			isFetching: isServicePermissionsFetching,
		},
	] = useLazyGetServicePermissionsQuery();

	const [addPermission, { isLoading: isAddLoading }] =
		useCreateUserPermissionMutation();

	const fetchServices = useCallback(async () => {
		try {
			await getServices({ limit: 100, offset: 0 }).unwrap();
		} catch (e) {
			message.warning('Не удалось загрузить сервисы');
		}
	}, [getServices]);

	const fetchServicePermissions = useCallback(
		async (serviceId: number) => {
			try {
				await getServicePermissions(serviceId).unwrap();
			} catch (e) {
				message.warning('Не удалось загрузить сервисы');
			}
		},
		[getServicePermissions],
	);

	const fetchNewUserPermission = async (
		body: AddUserPermissionRequestBody,
	) => {
		if (!id) {
			message.warning('ID не определен');
			return;
		}

		try {
			await addPermission({ userId: id, body }).unwrap();
			onClose();
		} catch (e) {
			message.error('Не удалось добавить право пользователю');
		}
	};

	useEffect(() => {
		if (!open) {
			return;
		}

		fetchServices();
	}, [fetchServices, open]);

	useEffect(() => {
		if (!open || !service) {
			return;
		}
		fetchServicePermissions(service);
	}, [fetchServicePermissions, service, open]);

	return (
		<Drawer title="Добавить право" open={open} closable onClose={onClose}>
			<Form layout="vertical" onFinish={fetchNewUserPermission}>
				<Item label="Сервис">
					<Select
						value={service}
						placeholder="phs.federation"
						options={services?.objects}
						fieldNames={{
							label: 'name',
							value: 'id',
						}}
						loading={isServicesLoading || isServicesFetching}
						onSelect={(val) => setService(val)}
					/>
				</Item>
				<Item label="Право" key={service} name="permission_id">
					<Select
						ref={permissionRef}
						allowClear
						placeholder="phs.federation.admin"
						options={servicePermissions}
						fieldNames={{
							label: 'name',
							value: 'id',
						}}
						loading={
							isServicePermissionsLoading || isServicePermissionsFetching
						}
						disabled={!service || !servicePermissions?.length}
					/>
				</Item>
				<Row justify="space-between">
					<Button type="primary" htmlType="submit" loading={isAddLoading}>
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

export default memo(UsersPermissionsDrawer);
