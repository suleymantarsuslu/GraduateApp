import React from "react";

import Login from "./CommonPages/Login";
import ApplicantMenu from "./ApplicantPages/ApplicantMenu";
import ApplicantLeftMenu from "./ApplicantPages/ApplicantLeftMenu";
import Applicants from "./GradSchoolsPages/Applicants";
import Profile from "./ApplicantPages/Profile";
import Logout from "./Logout";
import Programs from "./CommonPages/Programs";
import Register from "./CommonPages/Register";
import Notification from "./ApplicantPages/Notification";
import UploadDocuments from "./ApplicantPages/UploadDocuments";
import OpenProgram from "./GradSchoolsPages/OpenProgram";
import EditProgram from "./GradSchoolsPages/EditProgram";
import Dashboard from "./CommonPages/Dashboard";
import CommonLeftMenu from "./CommonPages/CommonLeftMenu";
import CommonMenu from "./CommonPages/CommonMenu";
import Root from "./Root";
import GradschoolLeftMenu from "./GradSchoolsPages/GradschoolLeftMenu";
import GradschoolPrograms from "./GradSchoolsPages/GradschoolPrograms";
import GradSchoolNotifications from "./GradSchoolsPages/GradSchoolNotifications";
import Documents from "./GradSchoolsPages/Documents";
import DepartmentLeftMenu from "./DepartmentPages/DepartmentLeftMenu";
import SendNotification from "./DepartmentPages/SendNotification";
import DepartmentInterview from "./DepartmentPages/DepartmentInterview";
import CreateInterview from "./DepartmentPages/CreateInterview";
import ApplicantInterview from "./ApplicantPages/ApplicantInterview";
import EditInterview from "./DepartmentPages/EditInterview";
import ChangePassword from "./ApplicantPages/ChangePassword";

import RoadMap from "./CommonPages/RoadMap";
import GradeInterview from "./DepartmentPages/GradeInterview";
import ApplicantProgress from "./ApplicantPages/ApplicantProgress";

export default class App extends React.Component {
  state = {
    applicationFile: null,
    currentPage: "",
    loginPage: false,
    program: "",
    token: "",
    currentApplicant: "",
    currentInterview:"",
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

  setApplicationFile = (anApplicationFile) => {
    this.setState({ applicationFile: anApplicationFile });
  };

  setProgram = (programId) => {
    this.setState({ program: programId });
  };

  setProfile = (aProfile) => {
    this.setState({ profile: aProfile });
  };

  setCurrentApplicant = (anAplicant) => {
    this.setState({ currentApplicant: anAplicant });
  };


  setCurrentInterview = (anInterview) => {
    this.setState({ currentInterview: anInterview });
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
        return <DepartmentLeftMenu setCurrentPage={this.setCurrentPage} />;
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
          <ApplicantMenu
            profile={this.state.profile}
            setCurrentPage={this.setCurrentPage}
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
        case "RoadMap":
          return (
            <RoadMap/>
          );
      case "Profile":
        return <Profile token={this.state.token}  setCurrentPage={this.setCurrentPage}/>;
      case "Programs":
        return <Programs />;
      case "UploadDocuments":
        return (
          <UploadDocuments
            token={this.state.token}
            setCurrentPage={this.setCurrentPage}
            
          />
        );
      case "GradschoolPrograms":
        return (
          <GradschoolPrograms
            setProgram={this.setProgram}
            setCurrentPage={this.setCurrentPage}
            token={this.state.token}
          />
        );
       
      case "Notification":
        return <Notification token={this.state.token} setCurrentPage={this.setCurrentPage}/>;
      case "SendNotification":
        return (
          <SendNotification
            token={this.state.token}
            setCurrentPage={this.setCurrentPage}
          />
        );
      case "GradSchoolNotifications":
        return (
          <GradSchoolNotifications
            token={this.state.token}
            setCurrentPage={this.setCurrentPage}
          />
        );
      case "Applicants":
        return (
          <Applicants
          setApplicationFile={this.setApplicationFile}
            token={this.state.token}
            setCurrentApplicant={this.setCurrentApplicant}
            setCurrentPage={this.setCurrentPage}
          />
        );
      case "OpenProgram":
        return <OpenProgram token={this.state.token} />;

      case "Documents":
        return (
          <Documents
          applicationFile={this.state.applicationFile}
            token={this.state.token}
            currentApplicant={this.state.currentApplicant}
          />
        );

      case "EditProgram":
        return (
          <EditProgram token={this.state.token} program={this.state.program} />
        );

        case "DepartmentInterview":
          return (
            <DepartmentInterview
              token={this.state.token}
              setCurrentApplicant={this.setCurrentApplicant}
              setCurrentPage={this.setCurrentPage}
              setCurrentInterview = {this.setCurrentInterview}
            />
          );
          case "CreateInterview":
            return (
              <CreateInterview
                token={this.state.token}
                setCurrentApplicant={this.setCurrentApplicant}
                setCurrentPage={this.setCurrentPage}
                currentApplicant={this.state.currentApplicant}
              />
            );

            case "ChangePassword":
              return (
                <ChangePassword
                  token={this.state.token}
                  setCurrentApplicant={this.setCurrentApplicant}
                  setCurrentPage={this.setCurrentPage}
                  currentApplicant={this.state.currentApplicant}
                />
              );

            case "EditInterview":
              return (
                <EditInterview
                  token={this.state.token}
                  setCurrentApplicant={this.setCurrentApplicant}
                  setCurrentPage={this.setCurrentPage}
                  currentApplicant={this.state.currentApplicant}
                  currentInterview={this.state.currentInterview}
                />
              );
            case "ApplicantInterview":
            return (
              <ApplicantInterview
                token={this.state.token}
                setCurrentApplicant={this.setCurrentApplicant}
                setCurrentPage={this.setCurrentPage}
                currentApplicant={this.state.currentApplicant}
              />);
              case "GradeInterview":
                return (
                  <GradeInterview
                    token={this.state.token}
                    setCurrentApplicant={this.setCurrentApplicant}
                    setCurrentPage={this.setCurrentPage}
                    currentApplicant={this.state.currentApplicant}
                    currentInterview={this.state.currentInterview}
                  />);
                  case "ApplicantProgress":
                return (
                  <ApplicantProgress
                    token={this.state.token}
                    setCurrentApplicant={this.setCurrentApplicant}
                    setCurrentPage={this.setCurrentPage}
                    currentApplicant={this.state.currentApplicant}
                    currentInterview={this.state.currentInterview}
                  />
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
        applicationFile={this.state.applicationFile}
          setApplicationFile={this.setApplicationFile}
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
    var page ={};
    page.leftmenu = this.openLeftMenu();
    page.menu = this.openMenu();
    page.body = this.openCurrentPage();
    page.login = this.openLogin();
    return page;
  };

  render() {
    var page = this.openPage();
    return (
       <Root page={page} />
        // <ApplicantProgress/>
  
  
    );
  }
}
