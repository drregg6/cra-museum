import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { strToUrl } from '../utils/strHelper';

export const fetchPaintings = createAsyncThunk(
	'paintings/fetchPaintings',
	async (painter = 'rembrandt van rijn') => {
		const painterUrl = strToUrl(painter);
		const url = `https://api.artic.edu/api/v1/artworks/search?q=${painterUrl}&query[term][is_public_domain]=true&limit=100&fields=id,title,image_id,artist_display`;
		const res = await axios.get(url);
		return res.data.data;
	},
);

const paintingsSlice = createSlice({
	name: 'paintings',
	initialState: {
		paintings: [],
		isLoading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPaintings.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchPaintings.fulfilled, (state, action) => {
				state.paintings = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchPaintings.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default paintingsSlice.reducer;
