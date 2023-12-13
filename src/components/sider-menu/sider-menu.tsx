import { Menu } from 'antd';
import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SIDER_MENU_ITEMS } from '@/constant/menu';

import { createMenuItem } from '@/utils/sider-menu';

function SiderMenu() {
	const { pathname } = useLocation();

	const currentMenuItem = useMemo(
		() =>
			pathname === '/' ? ['/'] : pathname.split('/').filter((path) => path),
		[pathname],
	);

	const menuItems = useMemo(
		() =>
			SIDER_MENU_ITEMS.map((item) =>
				createMenuItem(
					<Link to={item.route}>{item.name}</Link>,
					item.route,
					item.icon,
				),
			),
		[],
	);

	return (
		<Menu
			className="sidermenu"
			mode={'inline'}
			selectedKeys={currentMenuItem.length ? currentMenuItem : []}
			theme="light"
			selectable
			items={menuItems}
		/>
	);
}

export default memo(SiderMenu);
