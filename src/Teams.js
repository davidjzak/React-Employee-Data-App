import { sortBy } from "lodash";
import React from "react";
import MainContainer from "./MainContainer";

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }
  componentDidMount() {
    fetch("http://pure-citadel-90161.herokuapp.com/teams")
      .then(res => res.json())
      .then(data => {
        this.setState({
          teams: sortBy(data, [
            function(team) {
              return parseInt(team.TeamName.match(/\d+/));
            }
          ])
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  createTable() {
    const table = this.state.teams.map((team, index) => (
      <tr key={index}>
        <td>{team.TeamName}</td>
        <td>{this.getProjects(team)}</td>
        <td>{team.Employees.length}</td>
        <td>
          {team.TeamLead.FirstName} {team.TeamLead.LastName}
        </td>
      </tr>
    ));
    return table;
  }
  getProjects(currentTeam) {
    let projects = currentTeam.Projects.map((project, index) => (
      <li key={index}>{project.ProjectName}</li>
    ));
    return <ul>{projects}</ul>;
  }

  render() {
    return (
      <MainContainer sidebar="Teams">
        <h1 className="page-header">Teams</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Projects</th>
                  <th>Employees</th>
                  <th>TeamLead</th>
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

export default Teams;
