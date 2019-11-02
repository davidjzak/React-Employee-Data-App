import React from "react";
import ProjectPanel from "./ProjectPanel";
import MainContainer from "./MainContainer";
import TeamPanel from "./TeamPanel";
import EmployeePanel from "./EmployeePanel";

class Overview extends React.Component {
  render() {
    return (
      <MainContainer sidebar="Overview">
        <h1 className="page-header">Overview</h1>
        <div className="row">
          <div className="col-md-4">
            <ProjectPanel />
          </div>
          <div className="col-md-4">
            <TeamPanel />
          </div>
          <div className="col-md-4">
            <EmployeePanel />
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default Overview;
