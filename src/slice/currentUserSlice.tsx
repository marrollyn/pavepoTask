import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../types';
import { RootState } from '../store/store';

interface TinitialState {
	user: TUser | null;
}

const initialState: TinitialState = {
	user: null,
};

const currentUserSlice = createSlice({
	name: 'filterData',
	initialState,
	reducers: {
		setCurrentUser(state, action: PayloadAction<TUser>) {
			state.user = action.payload;
		},
		clearCurrentUser(state) {
			state.user = null;
		},
	},
});

export const getCurrentUser = (state: RootState) => state.currentUser.user;

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
