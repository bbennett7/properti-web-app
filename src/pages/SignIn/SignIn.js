import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.scss';
import firebase from '../../config/firebase-config';
import Button from '../../components/Button/Button';
import helpers from '../../helpers';
import Logo from '../../assets/Logo.png';
import LandingImage from '../../assets/LandingImage.jpg';

class SignIn extends PureComponent {
  state = {
    email: '',
    password: '',
    errors: []
  };

  handleOnChange = event => {
    const stateObj = {};
    stateObj[event.target.name] = event.target.value;

    return this.setState({
      ...this.state,
      ...stateObj
    });
  };

  handleOnSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const errors = [];

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        errors.push(`${error.message}`);
      });

    if (errors.length > 0) {
      return this.setState({
        errors
      });
    }

    return 'Successfully logged in.';
  };

  renderErrors = () => {
    return this.state.errors.map(e => {
      return (
        <div key={e} className={styles.error}>
          {e}
        </div>
      );
    });
  };

  render() {
    const { errors } = this.state;

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
              <div className={`${styles.formRow} ${styles.lastRow}`}>
                <label name="password"> Password </label>
                <input name="password" type="password" onChange={this.handleOnChange} />
              </div>
              <Button
                type="submit"
                text={'Sign In'}
                bgColor={helpers.isMobile ? 'offWhite' : 'darkBlue'}
                className={styles.button}
              />
            </form>
          </div>
          <div className={styles.errors}>{errors === [] ? null : this.renderErrors()}</div>
          <div className={styles.actionText}>
            Don&apos;t have an account yet? <Link to={'/signup'}>Sign Up</Link>
          </div>
          <div className={styles.actionText}>
            <Link to={'/forgot-password'}>Forgot Password</Link>
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

export default SignIn;
