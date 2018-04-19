import React, { Component } from 'react';

class IconRadio extends Component {
  constructor() {
    super();
    this.state = {
      currentActive: 0
    }
  }

  clickHandler(i) {
    console.log(i);
    this.props.changeHandler();
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
  gradeShowHandler() {
    this.props.gradeShowHandler(this.props.exam);
  }

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
