import React, { PureComponent } from 'react';
import styles from './Account.module.scss';
import firebase from '../../config/firebase-config';
import Button from '../../components/Button/Button';
// import helpers from '../../helpers';
import UserContext from '../../context/UserContext';
import { getProperties } from '../../api/property';
import { updateUser } from '../../api/user';

class Account extends PureComponent {
  state = {
    activeUpdate: false,
    properties: [],
    updatedProperty: {
      id: '',
      unit: '',
      error: ''
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const data = await getProperties();

      return this.setState({
        properties: data.data
      });
    } catch (err) {
      return err;
    }
  };

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

  renderUpdateForm = () => {
    const { properties } = this.state;
    return (
      <form onSubmit={this.handleOnSubmit} className={styles.form}>
        <select onChange={this.handleOnChange} id={'id'}>
          <option value="Select">Select Building</option>
          {properties.map(p => (
            <option value={p.id} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <div>
          <label>Unit</label>
          <input id="unit" onChange={this.handleOnChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  toggleUpdate = () => {
    this.setState({
      activeUpdate: !this.state.activeUpdate
    });
  };

  handleOnChange = event => {
    event.preventDefault();
    if (event.target.value === 'Select') {
      return this.setState({
        updatedProperty: {
          ...this.state.updatedProperty,
          id: ''
        }
      });
    }

    const update = {};
    update[event.target.id] = event.target.value;

    return this.setState({
      updatedProperty: {
        ...this.state.updatedProperty,
        ...update
      }
    });
  };

  handleOnSubmit = async () => {
    const { id } = this.context.user;
    const { updatedProperty } = this.state;
    const body = {
      property_id: updatedProperty.id,
      unit: updatedProperty.unit
    };
    console.log(id, updatedProperty);
    try {
      const data = await updateUser(id, body);
      console.log(data.data);
      this.context.updateUser(data.data);
      console.log(this.context);
    } catch (err) {
      this.setState({
        updatedProperty: err
      });
    }
  };

  render() {
    const { user } = this.context;
    const { activeUpdate } = this.state;
    if (!user) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>Account</div>
        <div className={styles.accountInfoWrapper}>
          <div className={styles.col}>
            <div className={styles.fieldTitle}>Name</div>
            <div className={styles.fieldData}>
              {user.first_name}&nbsp;{user.last_name}
            </div>

            <div className={styles.fieldTitle}>Email</div>
            <div className={styles.fieldData}>{user.email}</div>
          </div>
          <div className={styles.col}>
            {!user.property ? (
              <div className={styles.fieldData}>
                You have not added your building to your account yet. Please select your building
                from the list below and add your unit number.
                {this.renderUpdateForm()}
              </div>
            ) : (
              <React.Fragment>
                <div className={styles.fieldTitle}>Property</div>
                <div className={styles.fieldData}>
                  {user.property.name}, Unit &nbsp;{user.unit}
                </div>

                {user.account_type === 'Building Manager' ? null : (
                  <React.Fragment>
                    <div className={styles.fieldTitle}>Property Manager</div>
                    <div className={styles.fieldData}>
                      {user.property_manager.first_name}&nbsp;{user.property_manager.last_name}
                    </div>
                    <div className={styles.fieldData}>
                      <a href={`mailto:${user.property_manager.email}`}>
                        Contact your property manager
                      </a>
                    </div>
                  </React.Fragment>
                )}
                <div className={styles.movedText}>
                  Moved recently?&nbsp;<div onClick={this.toggleUpdate}>Update your building.</div>
                </div>
                {activeUpdate ? this.renderUpdateForm() : null}
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
