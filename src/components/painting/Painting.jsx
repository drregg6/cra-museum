import { useEffect } from 'react';
import styles from './painting.module.scss';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPaintings } from '../../slices/paintingsSlice';
import { fetchPainting } from '../../slices/paintingSlice';
import { addPainter } from '../../slices/historySlice';

import Loader from '../loader/Loader';

const IIIF_BASE = 'https://www.artic.edu/iiif/2';

const Painting = () => {
	const dispatch = useDispatch();
	const { painting, isLoading } = useSelector((state) => state.painting);
	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchPainting(id));
	}, [dispatch, id]);

	const handleClick = () => {
		dispatch(addPainter(painting.artist_title));
		dispatch(fetchPaintings(painting.artist_title));
	};

	const imageUrl = painting
		? `${IIIF_BASE}/${painting.image_id}/full/843,/0/default.jpg`
		: null;

	return (
		<div className={styles.painting}>
			{isLoading ? (
				<Loader />
			) : painting ? (
				<>
					<a href={imageUrl} target="_blank" rel="noopener noreferrer">
						<img
							className={styles.image}
							src={imageUrl}
							alt={painting.title}
						/>
					</a>
					<h1 className={styles.title}>{painting.title}</h1>
					<div className={styles.details}>
						<h2 className={styles.painter}>
							<Link onClick={handleClick} to="/gallery/1">
								{painting.artist_title}
							</Link>
						</h2>
						<p>
							{painting.date_display}
							{painting.place_of_origin && ` — ${painting.place_of_origin}`}
						</p>
					</div>
					{painting.description && (
						<div
							className={styles.description}
							dangerouslySetInnerHTML={{ __html: painting.description }}
						/>
					)}
					{painting.medium_display && (
						<div className={styles.techniques}>
							<span>{painting.medium_display}</span>
						</div>
					)}
				</>
			) : (
				<p>Painting not found.</p>
			)}
		</div>
	);
};

export default Painting;
