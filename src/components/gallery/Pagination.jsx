import styles from './pagination.module.scss';
import { Link } from 'react-router-dom';

const Pagination = ({ paintingsPerPage, totalPaintings, paginate }) => {
	const pageNumbers = [];
	const limit = Math.ceil(totalPaintings / paintingsPerPage);

	for (let i = 1; i <= limit; i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className={styles.pagination}>
			{pageNumbers.map((number) => {
				return (
					<li key={number} className={styles.page}>
						<Link
							to={`/gallery/${number}`}
							onClick={() => paginate(number)}
						>
							{number}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};


export default Pagination;
