import { setUser } from '@/store/user-process/user-process';

import { store } from '../store';

export const resetAuth = () => {
	store.dispatch(setUser(null));

	localStorage.removeItem('user');
};
