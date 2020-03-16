import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SideNav.module.scss';
import Logo from '../../assets/Logo.png';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Account } from '../../assets/account.svg';

const SideNav = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoWrapper}>
          <img src={Logo} className={styles.logo} />
        </div>
        <div className={styles.menu}>
          <Link to={'/home'}>
            <div className={styles.menuItem}>
              <Home className={styles.icon} />
              Home
            </div>
          </Link>

          <Link to={'/account'}>
            <div className={styles.menuItem}>
              <Account className={styles.icon} />
              Account
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
