import { EditOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Row, Space, Table, Tag } from 'antd';
import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import ServicesDrawer from '@/components/services-drawer/services-drawer';

import { AppRoutes } from '@/router/routes';

import { useGetServicesQuery } from '@/api/services';

import { Service } from '@/types/services';

const { Column } = Table;

function Services() {
	const { data, isLoading, isFetching } = useGetServicesQuery({
		limit: 100,
		offset: 0,
	});

	const [open, setOpen] = useState(false);
	const [service, setService] = useState<Service | null>(null);

	const handleCreate = () => {
		setOpen(true);
	};
	const handleEdit = (obj: Service) => {
		setService(obj);
		setOpen(true);
	};
	const handleClose = useCallback(() => {
		setService(null);
		setOpen(false);
	}, []);

	return (
		<div className="px-1">
			<Row className="mb-1">
				<Button type="primary" block={false} onClick={handleCreate}>
					Добавить сервис
				</Button>
			</Row>
			<Table
				dataSource={data?.objects}
				rowKey="id"
				loading={isLoading || isFetching}
				scroll={{
					x: 900,
				}}
			>
				<Column
					title="Название"
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
					dataIndex="id"
					width="10px"
					align="center"
					render={(serviceId, record: Service) => (
						<Space>
							<Button
								type="primary"
								icon={<EditOutlined />}
								onClick={() => handleEdit(record)}
							/>
							<Link to={`${serviceId}/${AppRoutes.Permissions}`}>
								<Button icon={<LockOutlined />} />
							</Link>
						</Space>
					)}
				/>
			</Table>
			<ServicesDrawer open={open} service={service} onClose={handleClose} />
		</div>
	);
}

export default memo(Services);
