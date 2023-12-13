import { Key, ReactNode } from 'react';

import { MenuItem } from '@/types/sider-menu';

export function createMenuItem(
	label: ReactNode,
	key: Key,
	icon?: ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}
