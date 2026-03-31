import { useState } from 'react';
import styles from './history.module.scss';
import utilStyles from '../../styles/utils.module.scss';
import { useNavigate } from 'react-router-dom';
import { shortenToFifty } from '../../utils/strHelper';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPaintings } from '../../slices/paintingsSlice';
import { addPainter, deleteHistory } from '../../slices/historySlice';

const History = () => {
	const dispatch = useDispatch();
	const history = useSelector((state) => state.history.history);
	const navigate = useNavigate();
	const [expand, toggleExpand] = useState(false);

	const handleClick = (painter) => {
		dispatch(fetchPaintings(painter));
		dispatch(addPainter(painter));
		navigate('/gallery/1');
	};

	const displayed = expand ? history : history.slice(0, 5);

	return (
		<div className={styles.history}>
			<ul className={styles.list}>
				{displayed.map((painter) => (
					<li
						key={painter}
						className={styles.item}
						onClick={() => handleClick(painter)}
					>
						{shortenToFifty(painter)}
					</li>
				))}
			</ul>
			{history.length > 0 && (
				<div className={styles.buttons}>
					{history.length > 5 && (
						<button
							className={`${utilStyles.button} ${styles.expand} ${styles.button}`}
							onClick={() => toggleExpand(!expand)}
						>
							{expand ? 'Less' : 'More'}
						</button>
					)}
					<button
						className={`${utilStyles.button} ${styles.button}`}
						onClick={() => dispatch(deleteHistory())}
					>
						Delete History
					</button>
				</div>
			)}
		</div>
	);
};

export default History;
