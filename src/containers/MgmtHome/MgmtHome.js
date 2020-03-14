import React, { PureComponent } from 'react';
import styles from './MgmtHome.module.scss';
import firebase from '../../config/firebase-config';
import Button from '../../components/Button/Button';
import { getPropertiesByManagerId } from '../../api/property';
import { getOpenTasksByManagerId, fetchYelpServices } from '../../api/task';

// import helpers from '../../helpers';
import UserContext from '../../context/UserContext';

class MgmtHome extends PureComponent {
  state = {
    properties: [],
    openTasks: [],
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { user } = this.context;

    const propertiesData = await getPropertiesByManagerId(user.id);
    const tasksData = await getOpenTasksByManagerId(user.id);

    this.setState({
      properties: propertiesData.data,
      openTasks: tasksData.data,
      loading: false
    });
  };

  fetchYelpServices = async event => {};

  renderOpenTasks = () => {
    const { openTasks } = this.state;
    return openTasks.map(t => {
      const { task, resident, property } = t;

      return (
        <div className={styles.taskWrapper} key={t.id}>
          <div className={styles.taskTitle}>
            {property.name} - {resident.unit} - {task.name} - {t.urgency_level}
          </div>
          <div className={styles.taskDetails}>
            <div className={styles.taskData}>
              <div className={styles.dataLabel}>Resident name:</div>
              {resident.first_name} {resident.last_name}
            </div>
            <div className={styles.taskData}>
              <div className={styles.dataLabel}>Notes from the resident:</div>
              {t.notes}
            </div>
            <div className={styles.actionsWrapper}>
              <a href={`mailto:${resident.email}`} className={styles.taskData}>
                Contact Resident
              </a>
              <div className={styles.taskData} onClick={this.fetchYelpServices} id={t.id}>
                Find a service
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const { user } = this.context;
    const { loading } = this.state;

    if (loading) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.accountInfoWrapper}>
          <div className={styles.col}>
            <div className={styles.header}>Open Tasks</div>
            {this.renderOpenTasks()}
          </div>
          <div className={styles.col}></div>
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

export default MgmtHome;

MgmtHome.contextType = UserContext;
