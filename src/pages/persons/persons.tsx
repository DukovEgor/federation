import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Row, Table, Tag } from 'antd';
import { ChangeEvent, memo, useCallback, useState } from 'react';

import PersonsDrawer from '@/components/persons-drawer/persons-drawer';

import { useGetPersonsQuery } from '@/api/persons';

import { Person } from '@/types/person';

const { Column } = Table;

function Persons() {
	const { data, isLoading, isFetching } = useGetPersonsQuery({
		limit: 100000,
		offset: 0,
	});

	const [open, setOpen] = useState(false);
	const [dataSource, setDataSource] = useState(data?.objects);
	const [person, setPerson] = useState<Person | null>(null);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.value.length) {
			setDataSource(data?.objects);
			return;
		}
		const filteredData = data?.objects.filter(
			(personEl) =>
				personEl?.full_name
					?.toLowerCase()
					.includes(e.currentTarget.value.toLowerCase()) ||
				String(personEl.id).includes(e.currentTarget.value),
		);
		setDataSource(filteredData);
	};

	const handleCreate = () => {
		setOpen(true);
	};
	const handleEdit = (obj: Person) => {
		setPerson(obj);
		setOpen(true);
	};
	const handleClose = useCallback(() => {
		setPerson(null);
		setOpen(false);
	}, []);

	return (
		<div className="px-1">
			<Row className="mb-1">
				<Button type="primary" block={false} onClick={handleCreate}>
					Добавить сотрудника
				</Button>
			</Row>
			<Row className="mb-1">
				<Input.Search
					allowClear
					placeholder="Петров Пётр Петрович / 123456"
					style={{ maxWidth: '50%' }}
					onChange={handleSearch}
				/>
			</Row>
			<Table
				dataSource={dataSource ?? data?.objects}
				rowKey="id"
				loading={isLoading || isFetching}
				scroll={{
					x: 900,
				}}
			>
				<Column title="ФИО" dataIndex="full_name" />
				<Column
					title="ID"
					dataIndex="id"
					render={(val) => <Tag color="blue">{val}</Tag>}
				/>
				<Column
					title="Редактировать"
					dataIndex="id"
					width="10px"
					align="center"
					render={(_, record: Person) => (
						<Button
							type="primary"
							icon={<EditOutlined />}
							onClick={() => handleEdit(record)}
						/>
					)}
				/>
			</Table>
			<PersonsDrawer open={open} person={person} onClose={handleClose} />
		</div>
	);
}

export default memo(Persons);
