import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPainting = createAsyncThunk(
	'painting/fetchPainting',
	async (id) => {
		const res = await axios.get(`${import.meta.env.VITE_ART_API_BASE}/artworks/${id}`);
		return res.data.data;
	}
);

export const generateArtGuide = createAsyncThunk(
	'painting/generateArtGuide',
	async (painting) => {
		const res = await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/art-guide`, {
			title: painting.title,
			artist_title: painting.artist_title,
			date_display: painting.date_display,
			place_of_origin: painting.place_of_origin,
			medium_display: painting.medium_display,
			description: painting.description,
		});
		return res.data.guide;
	}
);

const paintingSlice = createSlice({
	name: 'painting',
	initialState: {
		painting: null,
		isLoading: false,
		artGuide: null,
		isLoadingGuide: false,
	},
	reducers: {
		clearPainting: (state) => {
			state.painting = null;
			state.artGuide = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPainting.pending, (state) => {
				state.isLoading = true;
				state.painting = null;
				state.artGuide = null;
			})
			.addCase(fetchPainting.fulfilled, (state, action) => {
				state.painting = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchPainting.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(generateArtGuide.pending, (state) => {
				state.isLoadingGuide = true;
				state.artGuide = null;
			})
			.addCase(generateArtGuide.fulfilled, (state, action) => {
				state.artGuide = action.payload;
				state.isLoadingGuide = false;
			})
			.addCase(generateArtGuide.rejected, (state) => {
				state.isLoadingGuide = false;
			});
	},
});

export const { clearPainting } = paintingSlice.actions;
export default paintingSlice.reducer;
