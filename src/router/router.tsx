import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '@/pages/404/404';
import Persons from '@/pages/persons/persons';
import ServicePermissions from '@/pages/service-permissions/service-permissions';
import Services from '@/pages/services/services';
import UserPermissions from '@/pages/user-permissions/user-permissions';
import Users from '@/pages/users/users';

import { AppRoutes } from './routes';

function Router() {
	return (
		<Routes>
			<Route index path={'/'} element={<Persons />} />
			<Route path={AppRoutes.Users} element={<Users />} />
			<Route
				path={AppRoutes.UserPermissions}
				element={<UserPermissions />}
			/>
			<Route path={AppRoutes.Services} element={<Services />} />
			<Route
				path={AppRoutes.ServicePermissions}
				element={<ServicePermissions />}
			/>
			<Route path={AppRoutes.NotFound} element={<NotFound />} />
		</Routes>
	);
}

export default memo(Router);
