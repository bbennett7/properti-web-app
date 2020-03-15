import React, { PureComponent } from 'react';
import styles from './Account.module.scss';
import firebase from '../../config/firebase-config';
import Button from '../../components/Button/Button';
// import helpers from '../../helpers';
import UserContext from '../../context/UserContext';

class Account extends PureComponent {
  state = {};

  signOut = async event => {
    event.preventDefault();
    console.log('signing out');
    firebase
      .auth()
      .signOut()
      .then(async () => {
        console.log('Sign out success');
        await this.context.removeUser();
        this.props.history.push('/');
      })
      .catch(error => {
        console.log('Error signing out', error);
        return 'Error signing out.';
      });
  };

  render() {
    const { user } = this.context;

    if (!user) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>Account</div>
        <div className={styles.accountInfoWrapper}>
          <div className={styles.col}>
            <div className={styles.fieldTitle}>First Name</div>
            <div className={styles.fieldData}>{user.first_name}</div>

            <div className={styles.fieldTitle}>Last Name</div>
            <div className={styles.fieldData}>{user.last_name}</div>

            <div className={styles.fieldTitle}>Email</div>
            <div className={styles.fieldData}>{user.email}</div>
          </div>
          <div className={styles.col}>
            {!user.property ? (
              <div className={styles.fieldData}>
                You have not added your building to your account yet. Please select from the list
                below, and add your unit number.
              </div>
            ) : (
              <React.Fragment>
                <div className={styles.fieldTitle}>Property Name</div>
                <div className={styles.fieldData}>{user.first_name}</div>

                <div className={styles.fieldTitle}>Property Manager</div>
                <div className={styles.fieldData}>{user.last_name}</div>

                <div className={styles.fieldTitle}>Email</div>
                <div className={styles.fieldData}>{user.email}</div>
              </React.Fragment>
            )}
          </div>
        </div>
        <Button
          onClick={this.signOut}
          text={'Sign Out'}
          bgColor={'darkBlue'}
          className={styles.button}
        />
      </div>
    );
  }
}

export default Account;

Account.contextType = UserContext;
