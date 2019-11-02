import React from "react";
import moment from "moment";
import { sortBy } from "lodash";
import { Link } from "react-router-dom";

class ProjectsPanel extends React.Component {
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
  projectList() {
    const listProjects = this.state.projects.map(project => (
      <tr>
        <td>{project.ProjectName}</td>
        <td>Active {moment().diff(project.ProjectStartDate, "days")} Days</td>
      </tr>
    ));
    return listProjects;
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Projects</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>{this.projectList()}</tbody>
            </table>
          </div>
          <Link to="/projects" className="btn btn-primary form-control">
            View All Project Data
          </Link>
        </div>
      </div>
    );
  }
}

export default ProjectsPanel;
