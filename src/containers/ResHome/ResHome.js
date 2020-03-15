import React, { PureComponent } from 'react';
import styles from './ResHome.module.scss';
import { getTasks, createTask, createUserTask } from '../../api/task';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
// import helpers from '../../helpers';
import UserContext from '../../context/UserContext';
import { ReactComponent as Expand } from '../../assets/add.svg';
import { ReactComponent as Trash } from '../../assets/trash-can.svg';

class ResHome extends PureComponent {
  state = {
    user: {},
    openTasks: [],
    completedTasks: [],
    loading: true,
    error: '',
    searchMessage: '',
    expandedTask: '',
    taskOptions: [],
    createNewTaskForm: {
      taskId: '',
      newTaskName: '',
      urgencyLevel: '',
      notes: ''
    },
    createTaskError: ''
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const openTasks = [];
    const completedTasks = [];

    try {
      const data = await getTasks();

      this.context.tasks.forEach(t => {
        if (t.status === 'Completed') {
          return completedTasks.push(t);
        }
        return openTasks.push(t);
      });

      return this.setState({
        openTasks,
        completedTasks,
        taskOptions: [...data.data],
        loading: false
      });
    } catch (err) {
      return err;
    }
  };

  handleFormChange = event => {
    event.preventDefault();
    const { value, id } = event.currentTarget;

    const updatedObj = {};

    if (value === 'Select' && (id === 'urgencyLevel' || id === 'taskId')) {
      updatedObj[id] = '';
    } else {
      updatedObj[id] = value;
    }

    this.setState({
      createNewTaskForm: {
        ...this.state.createNewTaskForm,
        ...updatedObj
      }
    });

    console.log(this.state);
  };

  handleCreateTask = async event => {
    event.preventDefault();
    this.setState({
      createTaskError: ''
    });

    const { taskId, newTaskName, urgencyLevel, notes } = this.state.createNewTaskForm;
    const { user } = this.context;

    if ((taskId === '' && newTaskName === '') || urgencyLevel === '' || notes === '') {
      return this.setState({
        createTaskError: { message: 'All fields are required.' }
      });
    }

    try {
      let tId = taskId;
      if (newTaskName !== '') {
        const data = await createTask({ name: newTaskName });
        tId = data.data.id;
      }

      const body = {
        task_id: tId,
        urgency_level: urgencyLevel,
        notes,
        property_id: user.property.id
      };

      const data = await createUserTask(user.id, body);

      if (newTaskName !== '') {
        data.data.task = { id: tId, name: newTaskName };
      } else {
        const match = this.state.taskOptions.find(t => t.id === tId);
        data.data.task = match;
      }

      this.context.updateTasks([...this.state.openTasks, ...this.state.completedTasks, data.data]);

      const updatedTaskOptions =
        newTaskName !== '' && !this.state.taskOptions.find(t => t.id === tId)
          ? [...this.state.taskOptions, { id: tId, name: newTaskName }]
          : [...this.state.taskOptions];

      return this.setState({
        openTasks: [...this.state.openTasks, data.data],
        taskOptions: updatedTaskOptions,
        createTaskError: '',
        createNewTaskForm: {
          taskId: '',
          newTaskName: '',
          urgencyLevel: '',
          notes: ''
        }
      });
    } catch (err) {
      console.log(err);
      return this.setState({
        createTaskError: { message: 'Error creating task.' }
      });
    }
  };

  toggleExpanded = event => {
    event.preventDefault();
    const { expandedTask } = this.state;
    const { id } = event.currentTarget;

    return this.setState({
      expandedTask: expandedTask === id ? '' : id
    });
  };

  renderTasks = tasks => {
    const { expandedTask } = this.state;

    return tasks.map(t => {
      const { task } = t;

      return (
        <div className={styles.taskWrapper} key={t.id}>
          <div className={styles.taskTitle}>
            {task.name}
            <Expand className={styles.smallIcon} id={t.id} onClick={this.toggleExpanded} />
            <Trash className={styles.smallIcon} />
          </div>
          {expandedTask !== t.id ? null : (
            <div className={styles.taskDetails}>
              <div className={styles.taskData}>
                <div className={styles.dataLabel}>Urgency:</div>
                {t.urgency_level}
              </div>
              <div className={styles.taskData}>
                <div className={styles.dataLabel}>Notes:</div>
                {t.notes}
              </div>
              <div className={styles.taskData}>
                <div className={styles.dataLabel} id={t.id}>
                  Status:
                </div>
                {t.status}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  render() {
    const {
      loading,
      openTasks,
      completedTasks,
      taskOptions,
      createTaskError,
      createNewTaskForm
    } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.accountInfoWrapper}>
          <div className={styles.col}>
            <div className={styles.header}>Tasks</div>
            <div className={styles.subHeader}>Open Tasks</div>
            {this.renderTasks(openTasks)}
            <div className={styles.subHeader}>Completed Tasks</div>
            {this.renderTasks(completedTasks)}
          </div>
          <div className={styles.col}>
            <div className={styles.header}>Create a Task</div>
            <form onSubmit={this.handleCreateTask} className={styles.createForm}>
              <div className={styles.dropdownWrapper}>
                <select
                  id="taskId"
                  name="taskId"
                  onChange={this.handleFormChange}
                  value={createNewTaskForm.taskId === '' ? 'Select' : createNewTaskForm.taskId}
                >
                  <option value="Select" selected>
                    Select Task
                  </option>
                  {taskOptions.map(t => {
                    return (
                      <option value={t.id} key={t.id}>
                        {t.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  id="urgencyLevel"
                  name="urgencyLevel"
                  value={
                    createNewTaskForm.urgencyLevel === ''
                      ? 'Select'
                      : createNewTaskForm.urgencyLevel
                  }
                  onChange={this.handleFormChange}
                >
                  <option value="Select">Select Urgency Level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className={styles.createNewTaskWrapper}>
                <label name="newTask"> Or create a new task </label>
                <input
                  name="newTask"
                  id="newTaskName"
                  value={createNewTaskForm.newTaskName}
                  onChange={this.handleFormChange}
                />
              </div>
              <div className={styles.notesWrapper}>
                <label name="notes"> Notes </label>
                <textarea
                  name="notes"
                  id="notes"
                  value={createNewTaskForm.notes}
                  onChange={this.handleFormChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            {createTaskError === '' ? null : (
              <div className={styles.error}>
                {createTaskError.error ? createTaskError.error : createTaskError.message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ResHome;

ResHome.contextType = UserContext;
