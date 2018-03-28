import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
        <div className="card">
          <a className="card-header" id={this.props.subject.name + "Header"} data-toggle="collapse" data-target={"#" + this.props.subject.name} aria-expanded="false" aria-controls={this.props.subject.name}>
            {this.props.subject.name}
          </a>

          <div id={this.props.subject.name} className="collapse" aria-labelledby={this.props.subject.name + "Header"}>
            <div className="card-body" style={{padding: "0px", margin: "-1px"}}>
              <ul className="list-group">
                {this.props.examList.length > 0 ? (
                  this.props.examList.map((exam, i) =>
                    <li key={i} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div>
                          {exam.title}
                        </div>
                        <div>
                          {exam.grade}
                        </div>
                      </div>
                    </li>
                  )
                ) : (<div />)}

                <button className="list-group-item btn btn-light">Add Grade</button>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Subject;
