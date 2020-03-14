import React from 'react';
import styles from './Landing.module.scss';
import Button from '../../components/Button/Button';
import helpers from '../../helpers';
import Logo from '../../assets/Logo.png';
import LandingImage from '../../assets/LandingImage.jpg';

const Landing = () => {
  const authModule = () => {
    return (
      <div className={styles.authContainer}>
        <div className={styles.wrapper}>
          <img className={styles.logo} src={Logo} />
          <div className={styles.title}>properti</div>

          <Button
            path={'/signup'}
            text={'Sign Up'}
            bgColor={helpers.isMobile ? 'offWhite' : 'darkBlue'}
          />

          <Button
            path={'/signin'}
            text={'Sign In'}
            bgColor={helpers.isMobile ? 'offWhite' : 'darkBlue'}
          />
        </div>
        <div className={styles.footer}>
          <div>Terms & Conditions | Privacy Policy</div>
          <div>Contact Us | Learn More</div>
        </div>
      </div>
    );
  };

  if (helpers.isMobile) {
    return authModule();
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={LandingImage} className={styles.landingImage} />
      </div>
      {authModule()}
    </div>
  );
};

export default Landing;
