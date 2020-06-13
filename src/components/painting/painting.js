import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './painting.module.scss';
import {
  useParams,
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchPaintings } from '../../actions/paintings';
import { fetchPainting } from '../../actions/painting';
import { addPainter } from '../../actions/history';

import Loader from '../loader/Loader';

const Painting = ({
  fetchPaintings,
  fetchPainting,
  addPainter,
  painting: { painting, isLoading }
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchPainting(id);
  }, [fetchPainting, id]);
  if (painting) {
    addPainter(painting.title);
  }
  console.log(painting)

  const handleClick = () => {
    addPainter(painting.principalOrFirstMaker);
    fetchPaintings(painting.principalOrFirstMaker);
  }

  return (
    <div className={styles.painting}>
      {
        isLoading ? (
          <Loader />
        ) : (
          <>
            <a href={painting.webImage.url} target="_blank" rel="noopener noreferrer">
              <img className={styles.image} src={painting.webImage.url} alt={painting.title} />
            </a>
            <h1 className={styles.title}>{ painting.title }</h1>
            <div className={styles.details}>
              <h2 className={styles.painter}><Link onClick={() => handleClick()} to={`/gallery/1`}>{ painting.principalOrFirstMaker }</Link></h2>
              <p>
                Created in { painting.dating.presentingDate }{ painting.productionPlaces.length > 0 && (
                   `${' '}near ${ painting.productionPlaces[0] }`
                  )
                }
              </p>
            </div>
            <div className={styles.description}>
              <p>
                { painting.label.description }
              </p> 
            </div>
            {
              painting.techniques && (
                <div className={styles.techniques}>
                  {
                    painting.techniques.map(technique => (
                      <span>
                        { technique }
                      </span>
                    ))
                  }
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}

Painting.propTypes = {
  fetchPaintings: PropTypes.func.isRequired,
  fetchPainting: PropTypes.func.isRequired,
  addPainter: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  painting: PropTypes.object
}

const mapStateToProps = state => ({
  painting: state.painting
});

export default connect(
  mapStateToProps,
  {
    fetchPaintings,
    fetchPainting,
    addPainter
  }
)(Painting);