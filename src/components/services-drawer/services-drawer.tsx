import { Button, Drawer, Form, Input, Row, Spin, message } from 'antd';
import { memo, useCallback } from 'react';

import {
	useCreateServiceMutation,
	useUpdateServiceMutation,
} from '@/api/services';

import { DIRECTORY_ID } from '@/constant/api';

import { CreateServiceRequestType, Service } from '@/types/services';

import { UpdateServiceRequestType } from '../../types/services';

const { Item } = Form;

interface ServicesDrawerProps {
	open: boolean;
	service: Service | null;
	onClose: () => void;
}
function ServicesDrawer({ open, service, onClose }: ServicesDrawerProps) {
	const [createService, { isLoading: isCreateLoading }] =
		useCreateServiceMutation();

	const [updateService, { isLoading: isUpdateLoading }] =
		useUpdateServiceMutation();

	const handleCreate = useCallback(
		async (data: CreateServiceRequestType) => {
			try {
				await createService({
					...data,
					directory_id: DIRECTORY_ID,
				}).unwrap();

				onClose();
			} catch (e) {
				message.error('Не удалось создать сервис');
			}
		},
		[createService, onClose],
	);
	const handleUpdate = useCallback(
		async (data: UpdateServiceRequestType['body']) => {
			if (!service) {
				return;
			}

			try {
				await updateService({
					id: service?.id,
					body: { ...data, directory_id: DIRECTORY_ID },
				}).unwrap();

				onClose();
			} catch (e) {
				message.error('Не удалось обновить данные о сервисе');
			}
		},
		[onClose, service, updateService],
	);

	return (
		<Drawer
			title={`${service ? 'Редактировать сервис' : 'Добавить сервис'}`}
			closable
			open={open}
			onClose={onClose}
		>
			<Spin spinning={isCreateLoading || isUpdateLoading}>
				<Form
					name="person"
					layout="vertical"
					onFinish={service ? handleUpdate : handleCreate}
					onReset={onClose}
					key={service?.id}
				>
					<Item
						label="Название"
						name="name"
						initialValue={service?.name}
						required
						rules={[
							{
								required: true,
								message: 'Название должно быть заполнено',
								min: 2,
								max: 50,
							},
						]}
					>
						<Input placeholder="phs.federation" />
					</Item>
					<Item
						label="Описание"
						name="description"
						initialValue={service?.description}
						required
						rules={[
							{
								required: true,
								message: 'Описание должно быть заполнено',
								min: 2,
								max: 50,
							},
						]}
					>
						<Input placeholder="Сервис..." />
					</Item>

					<Row justify="space-between">
						<Button type="primary" htmlType="submit">
							Сохранить
						</Button>
						<Button type="default" htmlType="reset">
							Отмена
						</Button>
					</Row>
				</Form>
			</Spin>
		</Drawer>
	);
}

export default memo(ServicesDrawer);
