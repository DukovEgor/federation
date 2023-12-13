import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '@/constant/store';

import { api } from '../api';

import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
	[NameSpace.User]: userProcess.reducer,
	[NameSpace.Api]: api.reducer,
});
