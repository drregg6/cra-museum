import { configureStore } from '@reduxjs/toolkit';
import paintingsReducer from './slices/paintingsSlice';
import paintingReducer from './slices/paintingSlice';
import historyReducer from './slices/historySlice';

const store = configureStore({
	reducer: {
		paintings: paintingsReducer,
		painting: paintingReducer,
		history: historyReducer,
	},
});

export default store;
