import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPainting = createAsyncThunk(
	'painting/fetchPainting',
	async (id) => {
		const res = await axios.get(`${import.meta.env.VITE_ART_API_BASE}/artworks/${id}`);
		return res.data.data;
	}
);

export const generateArtGuide = (painting) => async (dispatch) => {
	dispatch(artGuideStarted());
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/art-guide`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: painting.title,
				artist_title: painting.artist_title,
				date_display: painting.date_display,
				place_of_origin: painting.place_of_origin,
				medium_display: painting.medium_display,
				description: painting.description,
			}),
		});

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			for (const line of chunk.split('\n\n')) {
				if (!line.startsWith('data: ')) continue;
				const data = line.slice(6).trim();
				if (data === '[DONE]') continue;
				try {
					const { text } = JSON.parse(data);
					if (text) dispatch(artGuideChunkReceived(text));
				} catch {}
			}
		}
		dispatch(artGuideCompleted());
	} catch (error) {
		console.error(error);
		dispatch(artGuideError());
	}
};

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
		artGuideStarted: (state) => {
			state.isLoadingGuide = true;
			state.artGuide = '';
		},
		artGuideChunkReceived: (state, action) => {
			state.artGuide += action.payload;
		},
		artGuideCompleted: (state) => {
			state.isLoadingGuide = false;
		},
		artGuideError: (state) => {
			state.isLoadingGuide = false;
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
			});
	},
});

export const { clearPainting, artGuideStarted, artGuideChunkReceived, artGuideCompleted, artGuideError } =
	paintingSlice.actions;
export default paintingSlice.reducer;
