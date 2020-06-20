import {
  GET_PAINTING,
  CLEAR_PAINTING
} from './types';
import axios from 'axios';

export const fetchPainting = (id) => async dispatch => {
  try {
    const res = await axios.get(`https://www.rijksmuseum.nl/api/en/collection/${id}?key=${process.env.REACT_APP_RIJKSMUSEUM_API}`);
    const payload = res.data.artObject;
    console.log(payload)
    dispatch(clearPainting);
    dispatch({
      type: GET_PAINTING,
      payload
    });
  } catch (error) {
    console.error(error);
  }
}

export const clearPainting = () => {
  return { type: CLEAR_PAINTING }
}