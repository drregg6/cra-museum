import { GET_PAINTING, CLEAR_PAINTING } from './types';
import axios from 'axios';

export const fetchPainting = (id) => async (dispatch) => {
	try {
		const res = await axios.get(
			`https://api.artic.edu/api/v1/artworks/${id}`,
		);
		const payload = res.data.data;
		console.log(payload);
		dispatch(clearPainting);
		dispatch({
			type: GET_PAINTING,
			payload,
		});
	} catch (error) {
		console.error(error);
	}
};

export const clearPainting = () => {
	return { type: CLEAR_PAINTING };
};
