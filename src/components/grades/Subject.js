import React, { Component } from 'react';

class Subject extends Component {
  constructor() {
    super();
    this.state = {
      gradeList: []
    }
  }

  componentDidMount() {

  }

  render() {
    return (
        <div className="card">
          <a className="card-header" id={this.props.subject.name + "Header"} data-toggle="collapse" data-target={"#" + this.props.subject.name} aria-expanded="false" aria-controls={this.props.subject.name}>
            {this.props.subject.name}
          </a>

          <div id={this.props.subject.name} className="collapse" aria-labelledby={this.props.subject.name + "Header"}>
            <div className="card-body" style={{padding: "0px", margin: "-1px"}}>
              <ul className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Subject;
