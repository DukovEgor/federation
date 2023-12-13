import { setUser } from '@/store/user-process/user-process';

import { store } from '../store';

export const init = () => {
	const user = localStorage.getItem('user');

	if (user && user !== 'undefined') {
		store.dispatch(setUser(JSON.parse(user)));
	}
};
