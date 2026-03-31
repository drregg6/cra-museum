import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
	name: 'history',
	initialState: {
		history: [],
	},
	reducers: {
		addPainter: (state, action) => {
			if (!state.history.includes(action.payload)) {
				state.history.unshift(action.payload);
			}
		},
		deleteHistory: (state) => {
			state.history = [];
		},
	},
});

export const { addPainter, deleteHistory } = historySlice.actions;
export default historySlice.reducer;
