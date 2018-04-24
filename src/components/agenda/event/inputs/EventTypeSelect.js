import React, { Component } from 'react';
import EventIcon from '../EventIcon';
import IconRadio from 'utility/components/inputfields/IconRadio';
import Event from 'data/entities/Event';

class EventTypeSelect extends Component {
  componentDidMount() {
    this.props.changeHandler(Event.eventType.Homework);
  }

  render() {
    let iconList = Object.values(Event.eventType).map(iconName => {
      return {value: iconName, icon: <EventIcon type={iconName} />};
    });

    return (
      <IconRadio list={iconList} active={this.props.value} changeHandler={this.props.changeHandler} />
    );
  }
}

export default EventTypeSelect;
