import React, { PureComponent } from 'react';
import styles from './MgmtHome.module.scss';
import { getPropertiesByManagerId } from '../../api/property';
import { getOpenTasksByManagerId, updateTask } from '../../api/task';
import { fetchYelpServices } from '../../api/yelp';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
// import helpers from '../../helpers';
import UserContext from '../../context/UserContext';
import { ReactComponent as Filter } from '../../assets/filter.svg';
import { ReactComponent as Expand } from '../../assets/add.svg';
import { ReactComponent as Edit } from '../../assets/pencil.svg';

class MgmtHome extends PureComponent {
  state = {
    user: {},
    properties: [],
    openTasks: [],
    loading: true,
    loadingServices: false,
    localServices: [],
    error: '',
    searchMessage: '',
    activeFilter: false,
    activeUpdate: false,
    activeUpdateId: '',
    activeUpdateSelected: '',
    filteredTasks: [],
    filterByProperties: [],
    expandedTask: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (Object.keys(this.state.user).length === 0) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { user } = this.context;

    if (!user) {
      return null;
    }

    const propertiesData = await getPropertiesByManagerId(user.id);
    const openTasksData = await getOpenTasksByManagerId(user.id);

    return this.setState({
      properties: propertiesData.data,
      openTasks: openTasksData.data,
      loading: false,
      user
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
          searchMessage: "No services found for this building's area."
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

  toggleUpdate = event => {
    event.preventDefault();
    return this.setState({
      activeUpdate: !this.state.activeUpdate,
      activeUpdateId: this.state.activeUpdate ? '' : event.currentTarget.id,
      activeUpdateSelected: ''
    });
  };

  handleDropdownChange = event => {
    event.preventDefault();
    const { value } = event.currentTarget;
    if (value === 'Select') {
      return this.setState({
        activeUpdateSelected: ''
      });
    }

    return this.setState({
      activeUpdateSelected: value
    });
  };

  updateTaskStatus = async event => {
    event.preventDefault();
    const { activeUpdateSelected, activeUpdateId, openTasks } = this.state;
    const i = openTasks.findIndex(t => t.id === activeUpdateId);
    const task = openTasks[i];

    if (task.status === activeUpdateSelected || activeUpdateSelected === 'Select') {
      return;
    }

    try {
      const data = await updateTask(task.resident.id, task.id, { status: activeUpdateSelected });
      const updatedOpenTasks = openTasks;
      task.status = data.data.status;
      updatedOpenTasks[i] = task;

      this.setState({
        openTasks: [...updatedOpenTasks]
      });
    } catch (err) {
      console.log(err);
    }
  };

  toggleExpanded = event => {
    event.preventDefault();
    const { expandedTask } = this.state;
    const { id } = event.currentTarget;

    return this.setState({
      expandedTask: expandedTask === id ? '' : id,
      activeUpdate: false,
      activeUpdateId: ''
    });
  };

  renderOpenTasks = () => {
    const {
      openTasks,
      filteredTasks,
      filterByProperties,
      activeUpdateId,
      expandedTask,
      activeFilter
    } = this.state;
    const tasks = filterByProperties.length > 0 && activeFilter ? filteredTasks : openTasks;
    return tasks.map(t => {
      const { task, resident, property } = t;

      return (
        <div className={styles.taskWrapper} key={t.id}>
          <div className={styles.taskTitle}>
            <div className={styles.titleText}>
              {property.name} - Unit {resident.unit} - {task.name} - {t.urgency_level} Priority
            </div>
            <Expand className={styles.smallIcon} id={t.id} onClick={this.toggleExpanded} />
          </div>
          {expandedTask !== t.id ? null : (
            <div className={styles.taskDetails}>
              <div className={styles.taskData}>
                <div className={styles.dataLabel}>Resident name:</div>
                {resident.first_name} {resident.last_name}
              </div>
              <div className={styles.taskData}>
                <div className={styles.dataLabel}>Notes from the resident:</div>
                {t.notes}
              </div>
              <div className={styles.taskData}>
                <div className={styles.dataLabel} id={t.id}>
                  Status:
                </div>
                {t.status}
                <Edit className={styles.smallIcon} onClick={this.toggleUpdate} id={t.id} />
              </div>
              {activeUpdateId !== t.id ? null : (
                <div className={styles.updateWrapper}>
                  <form onSubmit={this.updateTaskStatus}>
                    <select id={t.id} name={t.name} onChange={this.handleDropdownChange}>
                      <option value="Select">Select Status</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}
              <div className={styles.actionsWrapper}>
                <a href={`mailto:${resident.email}`} className={styles.action}>
                  Contact Resident
                </a>
                <div className={styles.action} onClick={this.getServices} id={t.id}>
                  Find a service
                </div>
              </div>
            </div>
          )}
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
            <a href={s.url} target="_blank" rel="noopener noreferrer">
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
      activeFilter: !this.state.activeFilter,
      filteredTasks: this.state.activeFilter ? [] : this.state.filteredTasks,
      filterByProperties: this.state.activeFilter ? [] : this.state.filterByProperties
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
