import styles from './card.module.scss';
import { Link } from 'react-router-dom';
import { shortenToFifty } from '../../utils/strHelper';

const Card = ({ id, desc = 'default', title, imageUrl, painter = 'dave' }) => {
	if (painter === 'anonymous') {
		painter = 'Anonymous';
	}
	return (
		<div className={styles.card}>
			<Link to={`/painting/${id}`} className={styles.imageLink}>
				<img src={imageUrl} alt={desc} />
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


export default Card;
