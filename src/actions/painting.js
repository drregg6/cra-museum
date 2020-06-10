import {
  GET_PAINTING
} from './types';
import axios from 'axios';

export const fetchPainting = () => async dispatch => {
  try {
    const res = await axios.get(`https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key=${process.env.REACT_APP_RIJKSMUSEUM_API}`);
    const payload = res.data;
    dispatch({
      type: GET_PAINTING,
      payload
    });
  } catch (error) {
    console.error(error);
  }
}