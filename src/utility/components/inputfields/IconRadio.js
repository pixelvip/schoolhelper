import React, { Component } from 'react';

class IconRadio extends Component {
  constructor() {
    super();
    this.state = {
      currentActive: 0
    }
  }

  clickHandler(i) {
    this.setState({currentActive: i});
    this.props.changeHandler(this.props.list[i].value);
  }

  componentWillReceiveProps(props) {
    let obj = this.props.list.filter(button => button.value === props.active)[0];
    let index = this.props.list.indexOf(obj);
    this.setState({currentActive: index});
  }

  render() {
    let buttonList = this.props.list.map((item, i) =>
      <IconButton key={i} index={i} active={i===this.state.currentActive} clickHandler={this.clickHandler.bind(this)} icon={item.icon} />
    );

    return (
      <div className="btn-group d-flex" role="group">
        {buttonList}
      </div>
    );
  }
}

class IconButton extends Component {
  render() {
    let buttonClassName = "btn btn-light w-100";
    if (this.props.active) {
      buttonClassName += " active";
    }

    return (
      <button type="button" className={buttonClassName} onClick={() => this.props.clickHandler(this.props.index)}>{this.props.icon}</button>
    )
  }
}

export default IconRadio;
