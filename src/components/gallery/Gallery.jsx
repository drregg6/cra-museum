import { useState } from 'react';
import styles from './gallery.module.scss';
import { useSelector } from 'react-redux';

import Card from './Card';
import Pagination from './Pagination';
import Loader from '../loader/Loader';

const IIIF_BASE = import.meta.env.VITE_IIIF_BASE;

const Gallery = () => {
	const { paintings, isLoading } = useSelector((state) => state.paintings);
	const [currentPage, setCurrentPage] = useState(1);
	const [paintingsPerPage] = useState(12);

	const indexOfLastPainting = currentPage * paintingsPerPage;
	const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
	const currentPaintings = paintings.slice(
		indexOfFirstPainting,
		indexOfLastPainting,
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div>
			{isLoading && <Loader />}
			{!isLoading && paintings.length === 0 && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					Sorry, can't find anything for that search.
				</div>
			)}
			{!isLoading && (
				<Pagination
					paintingsPerPage={paintingsPerPage}
					totalPaintings={paintings.length}
					paginate={paginate}
				/>
			)}
			<div className={styles.paintings}>
				{!isLoading &&
					currentPaintings.map((painting) => {
						const { id, title, image_id, artist_display } =
							painting;
						const imageUrl = `${IIIF_BASE}/${image_id}/full/400,/0/default.jpg`;
						return (
							<Card
								key={id}
								id={String(id)}
								title={title}
								imageUrl={imageUrl}
								painter={artist_display}
							/>
						);
					})}
			</div>
			{!isLoading && (
				<Pagination
					paintingsPerPage={paintingsPerPage}
					totalPaintings={paintings.length}
					paginate={paginate}
				/>
			)}
		</div>
	);
};

export default Gallery;
