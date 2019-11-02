import React from "react";
import MainContainer from "./MainContainer";
import moment from "moment";
import { sortBy } from "lodash";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  componentDidMount() {
    fetch("http://pure-citadel-90161.herokuapp.com/projects")
      .then(res => res.json())
      .then(data => {
        this.setState({
          projects: sortBy(data, [
            function(project) {
              return parseInt(project.ProjectName.match(/\d+/));
            }
          ])
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  createTable() {
    const table = this.state.projects.map(projectInfo => (
      <tr>
        <td>{projectInfo.ProjectName}</td>
        <td>{projectInfo.ProjectDescription}</td>
        <td>
          {moment(projectInfo.ProjectStartDate)
            .utc()
            .format("LL")}
        </td>
        <td>
          {projectInfo.ProjectEndDate
            ? moment(projectInfo.ProjectEndDate).format("LL")
            : "n/a"}
        </td>
      </tr>
    ));
    return table;
  }
  render() {
    return (
      <MainContainer sidebar="Projects">
        <h1 className="page-header">Projects</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>{this.createTable()}</tbody>
            </table>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default Projects;
