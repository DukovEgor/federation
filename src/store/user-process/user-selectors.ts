import { RootState } from '@/types/state';

export const selectUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) =>
	state.user.user?.access_token;
