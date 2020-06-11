import {
  GET_PAINTINGS
} from './types';
import axios from 'axios';
import { strToUrl } from '../utils/strHelper';

export const fetchPaintings = (painter='rembrandt van rijn') => async dispatch => {
  try {
    const painterUrl = strToUrl(painter);
    const url = `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.REACT_APP_RIJKSMUSEUM_API}&q=${painterUrl}&s=relevance&ps=150&imgonly=true&toppieces=true`;
    console.log(url);
    const res = await axios.get(url);
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