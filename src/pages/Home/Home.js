import React, { useContext } from 'react';
import styles from './Home.module.scss';
import UserContext from '../../context/UserContext';
import MgmtHome from '../../containers/MgmtHome/MgmtHome';

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Home</div>
      {userContext.user.account_type === 'Building Manager' ? <MgmtHome /> : null}
    </div>
  );
};

export default Home;
