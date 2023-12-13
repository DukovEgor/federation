import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '@/constant/store';

import { UserProcess } from '@/types/user-process';

const initialState: UserProcess = {
	user: null,
};

export const userProcess = createSlice({
	name: NameSpace.User,
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUser } = userProcess.actions;
