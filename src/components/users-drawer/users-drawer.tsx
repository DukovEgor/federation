import { Button, Drawer, Form, Input, Row, Select, Spin, message } from 'antd';
import { memo, useCallback } from 'react';

import { useGetPersonsQuery } from '@/api/persons';
import { useCreateUserMutation, useUpdateUserMutation } from '@/api/users';

import { DIRECTORY_ID } from '@/constant/api';

import { User, UsersCreateRequestType } from '@/types/users';

const { Item } = Form;

interface UsersDrawerProps {
	open: boolean;
	user: User | null;
	onClose: () => void;
}
function UsersDrawer({ open, user, onClose }: UsersDrawerProps) {
	const [createUser, { isLoading: isCreateLoading }] = useCreateUserMutation();
	const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

	const {
		data: persons,
		isLoading: isPersonsLoading,
		isFetching: isPersonsFetching,
	} = useGetPersonsQuery({
		limit: 100000,
		offset: 0,
	});

	const handleCreate = useCallback(
		async (data: Omit<UsersCreateRequestType['body'], 'directory_id'>) => {
			try {
				await createUser({ ...data, directory_id: DIRECTORY_ID }).unwrap();
				onClose();
			} catch (e) {
				message.error('Не удалось создать сотрудника');
			}
		},
		[createUser, onClose],
	);
	const handleUpdate = useCallback(
		async (data: Omit<UsersCreateRequestType['body'], 'directory_id'>) => {
			if (!user?.id) {
				message.warning('У данного пользователя отсутствует ID');
				return;
			}
			try {
				await updateUser({
					body: { ...data, directory_id: DIRECTORY_ID },
					id: user.id,
				}).unwrap();
				onClose();
			} catch (e) {
				message.error('Не удалось создать сотрудника');
			}
		},
		[onClose, updateUser, user?.id],
	);
	return (
		<Drawer
			title="Добавить пользователя"
			closable
			open={open}
			onClose={onClose}
		>
			<Spin spinning={isCreateLoading || isUpdateLoading}>
				<Form
					name="person"
					layout="vertical"
					onFinish={user ? handleUpdate : handleCreate}
					onReset={onClose}
					key={user?.id}
				>
					<Item
						label="E-Mail"
						name="email"
						required
						initialValue={user?.email}
						rules={[
							{
								required: true,
								message: 'E-Mail должен быть заполнен',
								min: 2,
								max: 30,
								pattern:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							},
						]}
					>
						<Input placeholder="aapetrov@pharmstd.ru" />
					</Item>
					<Item
						label="Username"
						name="name"
						required
						initialValue={user?.name}
						rules={[
							{
								required: true,
								message: 'Username должен быть заполнен',
								min: 2,
								max: 30,
							},
						]}
					>
						<Input placeholder="aepetrov" />
					</Item>
					<Item
						label="ФИО"
						name="full_name"
						initialValue={user?.full_name}
						rules={[
							{
								required: false,
								message: 'ФИО должно быть заполнено',
								min: 2,
								max: 50,
							},
						]}
					>
						<Input placeholder="Петров Пётр Петрович" />
					</Item>
					<Item
						label="Сотрудник"
						name="person_id"
						initialValue={user?.person?.id}
					>
						<Select
							placeholder="Петров Пётр Петрович"
							allowClear
							showSearch
							options={persons?.objects ?? []}
							fieldNames={{
								value: 'id',
								label: 'full_name',
							}}
							optionFilterProp="full_name"
							loading={isPersonsLoading || isPersonsFetching}
						/>
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

export default memo(UsersDrawer);
