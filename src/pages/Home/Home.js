import React, { useContext } from 'react';
import styles from './Home.module.scss';
import helpers from '../../helpers';
import UserContext from '../../context/UserContext';
import MgmtHome from '../../containers/MgmtHome/MgmtHome';

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Home</div>
      <MgmtHome />
    </div>
  );
};

export default Home;
