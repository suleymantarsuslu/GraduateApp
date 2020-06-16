import React, { Component } from "react";




export default class Footer extends Component {



  render() {
    return (
      <div className="wrapper"  >
        <footer className="footer">
          <div className="container-fluid">
            <nav>
              <ul className="footer-menu">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Programs</a>
                </li>
                <li>
                  <a href="#">Carieer</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
              </ul>
              <p className="copyright text-center">
                ©<script>document.write(new Date().getFullYear())</script>
                <a href="#">Izmir Institute of Technology</a>
              </p>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}
