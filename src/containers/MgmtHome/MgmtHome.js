import React, { PureComponent } from 'react';
import styles from './MgmtHome.module.scss';
import firebase from '../../config/firebase-config';
import Button from '../../components/Button/Button';
import { getPropertiesByManagerId } from '../../api/property';
import { getOpenTasksByManagerId } from '../../api/task';
import { fetchYelpServices } from '../../api/yelp';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
// import helpers from '../../helpers';
import UserContext from '../../context/UserContext';
import { ReactComponent as Filter } from '../../assets/filter.svg';

class MgmtHome extends PureComponent {
  state = {
    properties: [],
    openTasks: [],
    loading: true,
    loadingServices: false,
    localServices: [],
    error: '',
    searchMessage: '',
    activeFilter: false,
    filteredTasks: [],
    filterByProperties: []
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

  getServices = async event => {
    event.preventDefault();
    this.setState({
      loadingServices: true,
      localServices: [],
      searchMessage: ''
    });
    const { id } = event.currentTarget;
    const item = this.state.openTasks.find(t => t.id === id);
    const { task, property } = item;

    const queryString = `term=${task.name}&location=${property.street_address},${property.city},${property.state},${property.zip}`;

    try {
      const data = await fetchYelpServices(queryString);

      if (data.data.length === 0) {
        return this.setState({
          loadingServices: false,
          searchMessage: 'No services found for this building\'s area.'
        });
      }

      return this.setState({
        loadingServices: false,
        localServices: data.data
      });
    } catch (err) {
      return this.setState({
        error: err
      });
    }
  };

  renderOpenTasks = () => {
    const { openTasks, filteredTasks, filterByProperties } = this.state;
    const tasks = filterByProperties.length > 0 ? filteredTasks : openTasks;
    return tasks.map(t => {
      const { task, resident, property } = t;

      return (
        <div className={styles.taskWrapper} key={t.id}>
          <div className={styles.taskTitle}>
            {property.name} - Unit {resident.unit} - {task.name} - {t.urgency_level} Priority
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
              <div className={styles.taskData} onClick={this.getServices} id={t.id}>
                Find a service
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  renderLocalServices = () => {
    const { localServices } = this.state;
    return localServices.map(s => {
      return (
        <div className={styles.serviceWrapper} key={s.id}>
          <div className={styles.serviceTitle}>
            <a href={s.url} target="_blank">
              {s.name}
            </a>
            &nbsp;{s.rating} stars ({s.review_count} reviews) - ${s.price}
          </div>
          <div className={styles.serviceData}>
            {s.location.address1 ? `${s.location.address1},` : ''} {s.location.city},{' '}
            {s.location.state} {s.location.zip_code}
          </div>
          <div className={styles.serviceData}>{s.display_phone}</div>
        </div>
      );
    });
  };

  toggleFilter = () => {
    return this.setState({
      activeFilter: !this.state.activeFilter
    });
  };

  handleOnCheck = async event => {
    const propertyId = event.target.value;
    const { filteredTasks, filterByProperties, openTasks } = this.state;

    if (filterByProperties.includes(propertyId)) {
      const updatedFilterBy = filterByProperties.filter(p => p !== propertyId);
      const updatedFilteredTasks = filteredTasks.filter(t => t.property.id !== propertyId);

      return this.setState({
        filterByProperties: [...updatedFilterBy],
        filteredTasks: [...updatedFilteredTasks]
      });
    }
    const newFilterTasks = openTasks.filter(t => t.property.id === propertyId);

    return this.setState({
      filterByProperties: [...filterByProperties, propertyId],
      filteredTasks: [...newFilterTasks, ...filteredTasks]
    });
  };

  renderFilters = () => {
    const { properties } = this.state;

    return properties.map(p => {
      return (
        <div className={styles.filterWrapper} key={p.id}>
          <input
            onChange={this.handleOnCheck}
            className={styles.checkbox}
            type="checkbox"
            id={p.name}
            name={p.name}
            value={p.id}
            ref={`ref_${p.name}`}
          />
          <label htmlFor={p.name} className={styles.label}>
            {p.name}
          </label>
        </div>
      );
    });
  };

  render() {
    const { user } = this.context;
    const { loading, loadingServices, localServices, activeFilter, searchMessage } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.accountInfoWrapper}>
          <div className={styles.col}>
            <div className={styles.header}>
              Open Tasks <Filter className={styles.icon} onClick={this.toggleFilter} />
            </div>
            {activeFilter ? (
              <React.Fragment>
                <div className={styles.filterTitle}>Filter by Property</div>
                <div className={styles.filtersWrapper}>{this.renderFilters()}</div>
              </React.Fragment>
            ) : null}
            {this.renderOpenTasks()}
          </div>
          <div className={styles.col}>
            {loadingServices ? <LoadingSpinner /> : null}
            {searchMessage ? <div className={styles.message}>{searchMessage}</div> : null}
            {localServices.length === 0 ? null : this.renderLocalServices()}
          </div>
        </div>
      </div>
    );
  }
}

export default MgmtHome;

MgmtHome.contextType = UserContext;
