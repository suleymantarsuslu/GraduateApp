import React, { Component, PropTypes } from "react";
import axios from "axios";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import { Switch, Redirect, BrowserRouter } from "react-router-dom";
import Login from "./CommonPages/Login";
import ApplicantMenu from "./ApplicantPages/ApplicantMenu";
import ApplicantLeftMenu from "./ApplicantPages/ApplicantLeftMenu";
import { Container, Row, Col } from "reactstrap";
import Applicants from "./GradSchoolsPages/Applicants";
import Profile from "./ApplicantPages/Profile";
import Logout from "./Logout";
import Programs from "./CommonPages/Programs";
import Register from "./CommonPages/Register";
import Footer from "./ApplicantPages/Footer";
import Notification from "./ApplicantPages/Notification";

import UploadDocuments from "./ApplicantPages/UploadDocuments";
import ChangePassword from "./ApplicantPages/ChangePassword";
import OpenProgram from "./GradSchoolsPages/OpenProgram";
import EditProgram from "./GradSchoolsPages/EditProgram";
import Dashboard from "./CommonPages/Dashboard";
import CommonLeftMenu from "./CommonPages/CommonLeftMenu";
import CommonMenu from "./CommonPages/CommonMenu";
import Root from "./Root";
import Applicant from "./GradSchoolsPages/Applicants";
import GradschoolLeftMenu from "./GradSchoolsPages/GradschoolLeftMenu";
import GradschoolPrograms from "./GradSchoolsPages/GradschoolPrograms";
import GradSchoolNotifications from "./GradSchoolsPages/GradSchoolNotifications";
export default class App extends React.Component {
  state = {
    currentPage: "",
    loginPage: false,
    program: "",
    token: "",
    profile: {
      role: "",
      _id: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      phon: "",
      address: "",
      __v: 0,
    },
  };

  componentWillMount = async () => {
    await this.getProfile;
  };

  changeIsLoggedIn = (LoggedIn) => {
    this.setState({ isLoggedIn: LoggedIn });
  };

  changeProfil = (profil) => {
    this.setState({ currentCategory: profil });
  };

  setProgram = (programId) => {
    this.setState({ program: programId });
  };

  setProfile = (aProfile) => {
    this.setState({ profile: aProfile });
  };

  setCurrentPage = (value) => {
    this.setState({
      currentPage: value,
    });
  };

  setToken = (value) => {
    this.setState({ token: value });
  };

  setLogin = () => {
    if (this.state.loginPage) {
      this.setState({ loginPage: false });
    } else {
      this.setState({ loginPage: true });
    }
  };

  openLeftMenu = () => {
    switch (this.state.profile.role) {
      case "":
        return <CommonLeftMenu setCurrentPage={this.setCurrentPage} />;
      case "applicant":
        return <ApplicantLeftMenu setCurrentPage={this.setCurrentPage} />;
      case "gradschool":
        return <GradschoolLeftMenu setCurrentPage={this.setCurrentPage} />;
      case "department":
        return (
          <Programs
            setPrograms={this.setPrograms}
            changeCategory={this.changeCategory}
            currentCategory={this.state.currentCategory}
            info={this.state.isLoggedIn}
          />
        );
      case "admin":
        return <ApplicantLeftMenu setCurrentPage={this.state.setCurrentPage} />;

      default:
        return CommonLeftMenu;
    }
  };

  openMenu = () => {
    switch (this.state.profile.role) {
      case "":
        return (
          <CommonMenu
            setCurrentPage={this.setCurrentPage}
            setLogin={this.setLogin}
          />
        );
      case "applicant":
        return (
          <ApplicantMenu
            profile={this.state.profile}
            setCurrentPage={this.setCurrentPage}
          />
        );
      case "gradschool":
        return (
          <ApplicantMenu
            profile={this.state.profile}
            setCurrentPage={this.setCurrentPage}
          />
        );
      case "department":
        return (
          <Programs
            setPrograms={this.setPrograms}
            changeCategory={this.changeCategory}
            currentCategory={this.state.currentCategory}
            info={this.state.isLoggedIn}
          />
        );
      case "admin":
        return null;

      default:
        return (
          <CommonMenu
            setCurrentPage={this.setCurrentPage}
            setLogin={this.setLogin}
          />
        );
    }
  };

  openCurrentPage = () => {
    switch (this.state.currentPage) {
      case "":
        return <Dashboard />;
      case "Register":
        return <Register />;
      case "Profile":
        return <Profile token={this.state.token} />;
      case "Programs":
        return <Programs />;
      case "UploadDocuments":
        return <UploadDocuments token={this.state.token} />;
        case "GradschoolPrograms":
        return <GradschoolPrograms setProgram={this.setProgram} setCurrentPage={this.setCurrentPage} token={this.state.token} />;
      case "Notification":
        return <Notification token={this.state.token} />;
        case "GradSchoolNotifications":
        return <GradSchoolNotifications token={this.state.token} setCurrentPage={this.setCurrentPage}/>;
      case "Applicants":
        return <Applicants token={this.state.token} />;
        case "OpenProgram":
        return <OpenProgram token={this.state.token} />;
      case "EditProgram":
        return (
          <EditProgram token={this.state.token} program={this.state.program}/>
        );
      case "Logout":
        return <Logout />;
      default:
        return null;
    }
  };

  openLogin = () => {
    if (this.state.loginPage) {
      return (
        <Login
          setProfile={this.setProfile}
          setLogin={this.setLogin}
          setCurrentPage={this.setCurrentPage}
          setToken={this.setToken}
        />
      );
    } else {
      return null;
    }
  };

  openPage = () => {
    var page = new Object();
    page.leftmenu = this.openLeftMenu();
    page.menu = this.openMenu();
    page.body = this.openCurrentPage();
    page.login = this.openLogin();
    return page;
  };

  render() {
    var page = this.openPage();
    return(
     <Root page={page} />
    // <Applicant token={this.state.token} Program={this.state.program}/>
    );
  }
}
