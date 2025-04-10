import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TinitialState {
	cityList: string[];
	companyList: string[];
	chosenCity: string[];
	chosenCompany: string[];
}

const initialState: TinitialState = {
	cityList: [],
	companyList: [],
	chosenCity: [],
	chosenCompany: [],
};

const filterDataSlice = createSlice({
	name: 'filterData',
	initialState,
	reducers: {
		setData(
			state,
			action: PayloadAction<{ cityList: string[]; companyList: string[] }>
		) {
			state.cityList = action.payload.cityList;
			state.companyList = action.payload.companyList;
		},
	},
});

export const { setData } = filterDataSlice.actions;
export default filterDataSlice.reducer;
