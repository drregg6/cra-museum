import {
  GET_PAINTINGS
} from './types';
import axios from 'axios';

export const fetchPaintings = () => async dispatch => {
  try {
    const res = await axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=${process.env.REACT_APP_RIJKSMUSEUM_API}&involvedMaker=Rembrandt+van+Rijn`);
    const payload = res.data.artObjects;
    console.log(payload);
    dispatch({
      type: GET_PAINTINGS,
      payload
    });
  } catch (error) {
    console.error(error);
  }
}