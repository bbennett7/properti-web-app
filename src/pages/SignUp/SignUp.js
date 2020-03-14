import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SignUp.module.scss';
import firebase from '../../config/firebase-config';
// import { createUser } from '../../api/index';
import Button from '../../components/Button/Button';
import helpers from '../../helpers';
import Logo from '../../assets/Logo.png';
import LandingImage from '../../assets/LandingImage.jpg';

class SignUp extends PureComponent {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
  };

  validEmail = email => {
    return email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
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
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    const errors = [];

    Object.keys(this.state).forEach((key, i) => {
      switch (key) {
        case 'error':
          break;
        case 'firstName':
          if (firstName.length === 0) errors.push('First name is required.');
          break;
        case 'lastName':
          if (lastName.length === 0) errors.push('Last name is required.');
          break;
        case 'email':
          const emailIsValid = this.validEmail(email);
          if (!emailIsValid) errors.push('Email must be valid.');
          break;
        case 'password':
          if (password.length < 8) errors.push('Password must be at least 8 characters.');
          break;
        case 'confirmPassword':
          if (password !== confirmPassword) errors.push('Passwords do not match.');
          break;
        default:
          break;
      }
    });

    if (errors.length > 0) {
      return this.setState({
        errors
      });
    }

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        errors.push(`${error.message}`);
        return this.setState({
          errors
        });
      });

    const firebaseUser = await firebase.auth().currentUser;

    const body = {
      firebase_id: firebaseUser.uid,
      email: firebaseUser.email
    };

    // const dbUser = await createUser(body);

    // this.context.user = dbUser;
    // console.log(this.context);
    this.props.history.push('/signup/payment');
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
                <label name="firstName"> First Name </label>
                <input name="firstName" onChange={this.handleOnChange} />
              </div>
              <div className={styles.formRow}>
                <label name="lastName"> Last Name </label>
                <input name="lastName" onChange={this.handleOnChange} />
              </div>
              <div className={styles.formRow}>
                <label name="email"> Email </label>
                <input name="email" onChange={this.handleOnChange} />
              </div>
              <div className={styles.formRow}>
                <label name="password"> Password </label>
                <input name="password" type="password" onChange={this.handleOnChange} />
              </div>
              <div className={`${styles.formRow} ${styles.lastRow}`}>
                <label name="confirmPassword"> Confirm </label>
                <input name="confirmPassword" type="password" onChange={this.handleOnChange} />
              </div>
              <Button
                type="submit"
                text={'Create Account'}
                bgColor={helpers.isMobile ? 'offWhite' : 'darkBlue'}
                className={styles.button}
              />
            </form>
          </div>
          <div className={styles.errors}>{errors === [] ? null : this.renderErrors()}</div>
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

export default SignUp;
