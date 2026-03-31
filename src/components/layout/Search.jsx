import { useState } from 'react';
import styles from './search.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchPaintings } from '../../slices/paintingsSlice';
import { addPainter } from '../../slices/historySlice';

const Search = () => {
	const dispatch = useDispatch();
	const [input, setInput] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (ev) => {
		ev.preventDefault();
		dispatch(fetchPaintings(input));
		dispatch(addPainter(input));
		setInput('');
		navigate('/gallery/1');
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				placeholder="Artist / Painting"
				value={input}
				onChange={(ev) => setInput(ev.target.value)}
				className={`${styles.searchBar} ${styles.input}`}
			/>
			<input
				type="submit"
				value="Search"
				className={`${utilStyles.button} ${styles.input} ${styles.search}`}
			/>
		</form>
	);
};

export default Search;
