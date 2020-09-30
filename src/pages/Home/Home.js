import React, { useContext } from 'react';
import styles from './Home.module.scss';
import UserContext from '../../context/UserContext';
import MgmtHome from '../../containers/MgmtHome/MgmtHome';
import ResHome from '../../containers/ResHome/ResHome';

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <div className={styles.container}>
      <div className={styles.header} data-test-id="header" >Home</div>
      {userContext.user.account_type === 'Building Manager' ? <MgmtHome /> : <ResHome />}
    </div>
  );
};

export default Home;
