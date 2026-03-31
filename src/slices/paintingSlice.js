import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPainting = createAsyncThunk(
	'painting/fetchPainting',
	async (id) => {
		const res = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}`);
		return res.data.data;
	}
);

const paintingSlice = createSlice({
	name: 'painting',
	initialState: {
		painting: null,
		isLoading: false,
	},
	reducers: {
		clearPainting: (state) => {
			state.painting = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPainting.pending, (state) => {
				state.isLoading = true;
				state.painting = null;
			})
			.addCase(fetchPainting.fulfilled, (state, action) => {
				state.painting = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchPainting.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { clearPainting } = paintingSlice.actions;
export default paintingSlice.reducer;
