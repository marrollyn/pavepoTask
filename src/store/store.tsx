import { configureStore } from '@reduxjs/toolkit';
import filterDataReducer from '../slice/userFiltersSlice';
import currentUserReducer from '../slice/currentUserSlice';

export const store = configureStore({
	reducer: {
		filterData: filterDataReducer,
		currentUser: currentUserReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
