import React from "react";
import MainContainer from "./MainContainer";

class NotFound extends React.Component {
  render() {
    return (
      <MainContainer sidebar="">
        <h1 className="page-header">Not Found</h1>
        <div className="row">
          <div className="col-md-12">
            <span>Page Not Found</span>
          </div>
        </div>
      </MainContainer>
    );
  }
}

export default NotFound;
