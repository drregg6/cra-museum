import PropTypes from 'prop-types';
import styles from './card.module.scss';
import { Link } from 'react-router-dom';
import { shortenToFifty } from '../../utils/strHelper';

const Card = ({ id, desc = 'default', title, image, painter = 'dave' }) => {
	if (painter === 'anonymous') {
		painter = 'Anonymous';
	}
	return (
		<div className={styles.card}>
			<Link to={`/painting/${id}`} className={styles.imageLink}>
				<img
					src={`https://www.artic.edu/iiif/2/${image}/full/840,/0/default.jpg`}
					alt={desc}
				/>
			</Link>
			<div className={styles.details}>
				<Link to={`/painting/${id}`}>
					<h1>{shortenToFifty(title)}</h1>
				</Link>
				<h2>{painter}</h2>
			</div>
		</div>
	);
};

Card.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	desc: PropTypes.string,
	painter: PropTypes.string,
	image: PropTypes.string,
};

export default Card;
