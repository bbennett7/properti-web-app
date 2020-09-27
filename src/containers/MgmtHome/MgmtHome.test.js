import React from 'react';
import { mount } from 'enzyme';
import MgmtHome from './MgmtHome';

describe('MgmtHome', () => {
  const mockTasks = [
    {
      id: 1,
      urgency_level: 'High',
      task: {
        name: 'First Task',
        notes: 'This is the first task.',
        status: 'Open'
      },
      resident: {
        first_name: 'Joe',
        last_name: 'Smith',
        email: 'joe@example.com',
        unit: 1
      }, 
      property : {
        id: 1,
        name: 'First Property'
      }
    },
    {
      id: 2,
      urgency_level: 'Low',
      task: {
        name: 'Second Task',
        notes: 'This is the second task.',
        status: 'Open'
      },
      resident: {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@example.com',
        unit: 2
      }, 
      property : {
        id: 2,
        name: 'Second Property'
      }
    }
  ]

  const wrapper = mount(<MgmtHome />);

  wrapper.setState({
    openTasks: [...mockTasks],
    expandedTask: '',
    activeUpdate: false,
    activeUpdateId: '',
    loading: false
  })

  const secondTaskToggle = wrapper.find('svg').findWhere(s => s.props().id === 2)

  it('toggles rendering expanded task info in state', () => {
    secondTaskToggle.simulate('click');

    expect(wrapper.state().expandedTask).toEqual('2');
  })

  it('toggles hiding expanded task info in state', () => {
    secondTaskToggle.simulate('click');
    
    expect(wrapper.state().expandedTask).toEqual('');
  })
})