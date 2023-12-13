import { Button, Drawer, Form, Input, Row, Spin, message } from 'antd';
import { memo, useCallback } from 'react';

import {
	useCreatePersonMutation,
	useUpdatePersonMutation,
} from '@/api/persons';

import { Person, PersonRequestBody } from '@/types/person';

const { Item } = Form;

interface PersonsDrawerProps {
	open: boolean;
	person: Person | null;
	onClose: () => void;
}
function PersonsDrawer({ open, person, onClose }: PersonsDrawerProps) {
	const [createPerson, { isLoading: isCreateLoading }] =
		useCreatePersonMutation();
	const [updatePerson, { isLoading: isUpdateLoading }] =
		useUpdatePersonMutation();

	const handleCreate = useCallback(
		async (data: PersonRequestBody) => {
			try {
				await createPerson(data).unwrap();

				onClose();
			} catch (e) {
				message.error('Не удалось создать сотрудника');
			}
		},
		[createPerson, onClose],
	);
	const handleUpdate = useCallback(
		async (data: PersonRequestBody) => {
			if (!person) {
				return;
			}

			try {
				await updatePerson({ id: person?.id, body: data }).unwrap();

				onClose();
			} catch (e) {
				message.error('Не удалось создать сотрудника');
			}
		},
		[onClose, person, updatePerson],
	);

	return (
		<Drawer
			title={`${
				person ? 'Редактировать сотрудника' : 'Добавить сотрудника'
			}`}
			closable
			open={open}
			onClose={onClose}
		>
			<Spin spinning={isCreateLoading || isUpdateLoading}>
				<Form
					name="person"
					layout="vertical"
					onFinish={person ? handleUpdate : handleCreate}
					onReset={onClose}
					key={person?.id}
				>
					<Item
						label="Фамилия"
						name="last_name"
						initialValue={person?.person_name?.last_name}
						required
						rules={[
							{
								required: true,
								message: 'Фамилия должна быть заполнена',
								min: 2,
								max: 20,
							},
						]}
					>
						<Input placeholder="Петров" />
					</Item>
					<Item
						label="Имя"
						name="first_name"
						initialValue={person?.person_name?.first_name}
						required
						rules={[
							{
								required: true,
								message: 'Имя должно быть заполнено',
								min: 2,
								max: 20,
							},
						]}
					>
						<Input placeholder="Пётр" />
					</Item>
					<Item
						label="Отчество"
						name="middle_name"
						initialValue={person?.person_name?.middle_name}
					>
						<Input placeholder="Петрович" />
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

export default memo(PersonsDrawer);
