import React from "react";
import moment from "moment";
import MainContainer from "./MainContainer";
import { sortBy } from "lodash";

class Employees extends React.Component {
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
  createTable() {
    const table = this.state.employees.map(employee => (
      <tr>
        <td>
          {employee.FirstName} {employee.LastName} -{" "}
          {employee.Position.PositionName}
        </td>
        <td>
          {employee.AddressStreet}. {employee.AddressCity}{" "}
          {employee.AddressState}, {employee.AddressZip}
        </td>
        <td>
          {employee.PhoneNum} ex: {employee.Extension}
        </td>
        <td>
          {moment(employee.HireDate)
            .utc()
            .format("LL")}
        </td>
        <td>$ {employee.SalaryBonus}</td>
      </tr>
    ));
    return table;
  }
  render() {
    return (
      <MainContainer sidebar="Employees">
        <h1 className="page-header">Employees</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name & Position</th>
                  <th>Adress</th>
                  <th>Phone Num</th>
                  <th>Hire Date</th>
                  <th>Salary Bonus</th>
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

export default Employees;
