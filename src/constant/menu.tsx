import {
	CloudServerOutlined,
	SmileOutlined,
	TeamOutlined,
} from '@ant-design/icons';

import { AppRoutes } from '@/router/routes';

export const SIDER_MENU_ITEMS = [
	{
		name: 'Сотрудники',
		route: '/',
		icon: <TeamOutlined />,
	},
	{
		name: 'Пользователи',
		route: AppRoutes.Users,
		icon: <SmileOutlined />,
	},
	{
		name: 'Сервисы',
		route: AppRoutes.Services,
		icon: <CloudServerOutlined />,
	},
];
