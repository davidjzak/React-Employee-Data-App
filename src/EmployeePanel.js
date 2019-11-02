import React from "react";
import { sortBy } from "lodash";
import { Link } from "react-router-dom";
class EmployeePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }
  componentDidMount() {
    fetch("http://pure-citadel-90161.herokuapp.com/employees")
      .then(res => res.json())
      .then(data => {
        this.setState({
          employees: sortBy(data, [
            function(employee) {
              return employee.Extension;
            }
          ])
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  employeeList() {
    const listEmployees = this.state.employees.map(employee => (
      <tr>
        <td>
          {employee.FirstName} {employee.LastName}
        </td>
        <td>{employee.Position.PositionName}</td>
      </tr>
    ));
    return listEmployees;
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Employees</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>{this.employeeList()}</tbody>
            </table>
          </div>
          <Link to="/employees" className="btn btn-primary form-control">
            View All Employee Data
          </Link>
        </div>
      </div>
    );
  }
}

export default EmployeePanel;
