/*

https://data.rijksmuseum.nl/object-metadata/api/
https://www.rijksmuseum.nl/en/search/advanced

The purpose of Index
= Render data from store onto Index

*/

import React from 'react';
import styles from './index.module.scss';

const Index = () => {
  return (
    <div className={styles.homepage}>
      <p>Search for an artist in the searchbox above!</p>
    </div>
  )
}

// Index.propTypes = {
  
// }

export default Index;