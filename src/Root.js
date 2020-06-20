import React from "react";






export default class Root extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-md-2 pr-1">
          {this.props.page.leftmenu}
          </div>

          <div className="col-md-10 ">
            <div className="row">
              <div className="col-md-12 pr-1" style={{marginLeft: "10px"}}>
              {this.props.page.menu}
              
              </div>
            </div>{" "}
            <div className="row">
              <div className="col-md-9 pr-1"  style={{padding: "70px"}}>
  
                {this.props.page.body}
              </div>
              <div className="col-md-3 pr-1" style={{paddingRight: "5px",paddingTop: "70px"}}>
              {this.props.page.login}
                  </div>
            </div>
        
          </div>
        </div>
      </div>
    );
  }
}
