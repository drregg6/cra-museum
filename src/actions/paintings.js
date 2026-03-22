import { GET_PAINTINGS } from './types';
import axios from 'axios';
import { strToUrl } from '../utils/strHelper';

export const fetchPaintings =
	(painter = 'rembrandt van rijn') =>
	async (dispatch) => {
		try {
			const painterUrl = strToUrl(painter);
			const url = `https://api.artic.edu/api/v1/artworks/search?q=${painterUrl}&query[term][is_public_domain]=true&limit=24&fields=id,title,image_id`;
			console.log(url);
			const res = await axios.get(url);
			const payload = res.data.data;
			// const pagination = res.data.pagination;
			console.log(payload);
			dispatch({
				type: GET_PAINTINGS,
				payload,
			});
		} catch (error) {
			console.error(error);
		}
	};

/*

  payload: [
    {
      id: xxx,
      title: title,
      image_id: yyy
    }
  ]

  */
