import { useEffect } from 'react';
import styles from './painting.module.scss';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPaintings } from '../../slices/paintingsSlice';
import { fetchPainting, generateArtGuide } from '../../slices/paintingSlice';
import { addPainter } from '../../slices/historySlice';

import Loader from '../loader/Loader';

const IIIF_BASE = import.meta.env.VITE_IIIF_BASE;

const Painting = () => {
	const dispatch = useDispatch();
	const { painting, isLoading, artGuide, isLoadingGuide } = useSelector(
		(state) => state.painting
	);
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
					<div className={styles.artGuide}>
						{artGuide === null && (
							<button
								className={styles.guideButton}
								onClick={() => dispatch(generateArtGuide(painting))}
							>
								✦ AI Art Guide
							</button>
						)}
						{artGuide === '' && <Loader />}
						{artGuide !== null && artGuide !== '' && (
							<div className={styles.guideText}>
								<h3 className={styles.guideHeading}>✦ Art Guide</h3>
								{artGuide.split('\n\n').map((para, i) => (
									<p key={i}>{para}</p>
								))}
								{isLoadingGuide && <span className={styles.cursor}>▌</span>}
							</div>
						)}
					</div>
				</>
			) : (
				<p>Painting not found.</p>
			)}
		</div>
	);
};

export default Painting;
