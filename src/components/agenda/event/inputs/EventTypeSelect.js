import React, { Component } from 'react';
import EventIcon from '../EventIcon';
import IconRadio from 'utility/components/inputfields/IconRadio';
import Event from 'data/entities/Event';

class EventTypeSelect extends Component {
  constructor() {
    super();
    this.state = {
      eventTypeSelection: ""
    }
  }

  componentWillReceiveProps(props) {
    this.setState({eventTypeSelection: props.value});
  }

  componentDidMount() {
    this.props.changeHandler("homework");
  }

  render() {
    let iconList = Object.values(Event.eventType).map(iconName => {
      return {value: iconName, icon: <EventIcon type={iconName} />};
    });

    return (
      <IconRadio list={iconList} active={this.eventTypeSelection} changeHandler={this.props.changeHandler} />
    );
  }
}

export default EventTypeSelect;
