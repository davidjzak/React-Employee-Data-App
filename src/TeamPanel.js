import React from "react";
import { sortBy } from "lodash";
import { Link } from "react-router-dom";

class TeamPanel extends React.Component {
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
        console.log(data);
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
  teamList() {
    const listTeams = this.state.teams.map(team => (
      <tr>
        <td>{team.TeamName}</td>
        <td>{team.Employees.length} Employees</td>
      </tr>
    ));
    return listTeams;
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Teams</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>{this.teamList()}</tbody>
            </table>
          </div>
          <Link to="/teams" className="btn btn-primary form-control">
            View All Team Data
          </Link>
        </div>
      </div>
    );
  }
}

export default TeamPanel;
