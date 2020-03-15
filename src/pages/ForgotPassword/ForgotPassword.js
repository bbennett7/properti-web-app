import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.scss';
import firebase from '../../config/firebase-config';
import Button from '../../components/Button/Button';
import helpers from '../../helpers';
import Logo from '../../assets/Logo.png';
import LandingImage from '../../assets/LandingImage.jpg';

class ForgotPassword extends PureComponent {
  state = {
    email: '',
    error: '',
    message: ''
  };

  handleOnChange = event => {
    return this.setState({
      email: event.target.value
    });
  };

  handleOnSubmit = async event => {
    event.preventDefault();
    const { email } = this.state;

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({
          email: '',
          message: 'You have been sent an email to reset your password.',
          error: ''
        });
      })
      .catch(error => {
        this.setState({
          error: `${error.message}`,
          message: ''
        });
      });
  };

  render() {
    const { error, message } = this.state;

    const authModule = () => {
      return (
        <div className={styles.authContainer}>
          <div className={styles.wrapper}>
            <img className={styles.logo} src={Logo} />
            <div className={styles.title}>properti</div>

            <form className={styles.form} onSubmit={this.handleOnSubmit}>
              <div className={styles.formRow}>
                <label name="email"> Email </label>
                <input name="email" onChange={this.handleOnChange} />
              </div>
              <Button
                type="submit"
                text={'Submit'}
                bgColor={helpers.isMobile ? 'offWhite' : 'darkBlue'}
                className={styles.button}
              />
            </form>
          </div>
          {message === '' ? null : <div className={styles.message}>{message}</div>}
          <div className={styles.error}>{error === '' ? null : error}</div>
          <div className={styles.actionText}>
            Don&apos;t have an account yet? <Link to={'/signup'}>Sign Up</Link>
          </div>
          <div className={styles.actionText}>
            Back to <Link to={'/signin'}>Sign In</Link>
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
  }
}

export default ForgotPassword;
