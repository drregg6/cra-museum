import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Copyright &copy;{new Date().getFullYear()} <a href="http://www.daveregg.com" target="_blank" rel="noopener noreferrer">Dave Regg</a><br />
        Powered by <a href="https://www.rijksmuseum.nl/" target="_blank" rel="noopener noreferrer">Rijksmuseum</a>
      </p>
    </footer>
  )
}

export default Footer;