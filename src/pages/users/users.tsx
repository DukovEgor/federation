import { EditOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, Row, Space, Table, Tag } from 'antd';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import UsersDrawer from '@/components/users-drawer/users-drawer';

import { AppRoutes } from '@/router/routes';

import { useGetUsersQuery } from '@/api/users';

import { User } from '@/types/users';

const { Column } = Table;

function Users() {
	const {
		data: users,
		isLoading: isUsersLoading,
		isFetching: isUsersFetching,
	} = useGetUsersQuery({
		limit: 100000,
		offset: 0,
	});

	const [open, setOpen] = useState(false);
	const [dataSource, setDataSource] = useState(users?.objects);
	const [user, setUser] = useState<User | null>(null);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.value.length) {
			setDataSource(users?.objects);
			return;
		}
		const filteredData = users?.objects.filter(
			(userEl) =>
				userEl?.full_name
					?.toLowerCase()
					.includes(e.currentTarget.value.toLowerCase()) ||
				String(userEl.id).includes(e.currentTarget.value) ||
				userEl.name
					?.toLowerCase()
					.includes(e.currentTarget.value.toLowerCase()) ||
				userEl.email
					?.toLowerCase()
					.includes(e.currentTarget.value.toLowerCase()),
		);
		setDataSource(filteredData);
	};

	const handleCreate = () => {
		setOpen(true);
	};
	const handleEdit = (obj: User) => {
		setUser(obj);
		setOpen(true);
	};
	const handleClose = useCallback(() => {
		setUser(null);
		setOpen(false);
	}, []);

	return (
		<div className="px-1">
			<Row className="mb-1">
				<Button type="primary" block={false} onClick={handleCreate}>
					Добавить пользователя
				</Button>
			</Row>
			<Row className="mb-1">
				<Input.Search
					allowClear
					placeholder="Петров Пётр Петрович / pppetrov / petrovich@pharmstd.ru / 123456"
					style={{ maxWidth: '50%' }}
					onChange={handleSearch}
				/>
			</Row>
			<Table
				dataSource={dataSource ?? users?.objects}
				rowKey="id"
				loading={isUsersLoading || isUsersFetching}
				scroll={{
					x: 900,
				}}
			>
				<Column
					title="ФИО"
					render={(_, record: User) =>
						record.full_name ?? record.person?.full_name
					}
				/>
				<Column
					title="E-Mail"
					dataIndex="email"
					render={(val) => <Tag color="orange">{val}</Tag>}
				/>
				<Column
					title="ID"
					dataIndex="id"
					render={(val) => <Tag color="blue">{val}</Tag>}
				/>
				<Column
					title="Person ID"
					dataIndex={['person', 'id']}
					render={(val) => <Tag color="geekblue">{val}</Tag>}
				/>
				<Column
					title="Действия"
					dataIndex="id"
					width="10px"
					align="center"
					render={(id, record: User) => (
						<Space>
							<Button
								type="primary"
								icon={<EditOutlined />}
								onClick={() => handleEdit(record)}
							/>
							<Link to={`${id}/${AppRoutes.Permissions}`}>
								<Button icon={<LockOutlined />} />
							</Link>
						</Space>
					)}
				/>
			</Table>
			<UsersDrawer open={open} user={user} onClose={handleClose} />
		</div>
	);
}

export default memo(Users);
