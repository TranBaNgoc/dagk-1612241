import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import HomePage from './component/HomePage';
import MapRegister from './containers/MapRegister';
import './css/Game.css';
import MapLogin from './containers/MapLogin';
import { getProfileFetch, restartGame } from './actions/indexAction';
import MappProfile from './containers/MappProfile';
import MapPass from './containers/MapPass';
import MapApp from './containers/MapApp';


class Game extends React.PureComponent {
  componentDidMount = () => {
    const { getProfileFetchs } = this.props;
    getProfileFetchs();
  };

  handleClick = () => {
    const { logoutAccount } = this.props;
    logoutAccount();
    localStorage.clear();
  };

  render() {
    const tokenn = localStorage.token;
    const { state } = this.props;
    const { currentUser } = state;
    
    if (tokenn != null) {
      return (
        <Router>
          <div className="sidenav">
            <ul>
              {currentUser.Username ? (
                <li className="user">
                  <Link to="/profile">
                  <Avatar size={64} src={currentUser.avatar}  />
                   <br/>
                   {currentUser.Username}
                  </Link>
                </li>
              ) : null}
              <br />
              <li>
                <Link to="/home">
                  <Icon className="icon" type="home" /> Home
                </Link>
              </li>
              <br />
              <li>
                <Link to="/login">
                  <text className="btnn" onClick={this.handleClick}>
                    <Icon className="icon" type="logout" /> Logout
                  </text>
                </Link>
              </li>
            </ul>
          </div>

          <div className="main">
            <div className="div70">
              <Switch>
                <Route path="/profile">
                  <MappProfile />
                </Route>
                <Route path="/editpassword">
                  <MapPass />
                </Route>
                <Route  path="/playOnline">
                  <MapApp />
                </Route>
                <Route  path="/playwithboss">
                  <MapApp />
                </Route>

                <Route path="/login">
                  <Redirect to="/home" />
                </Route>
                <Route path="/register">
                  <Redirect to="/home" />
                </Route>
                {tokenn ? (
                  <Route path="/home">
                    <HomePage />
                  </Route>
                ) : (
                  <Redirect to="/login" />
                )}
                <Route path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      );
    }
    return (
      <Router>
        <div className="sidenav">
          <ul>
            <li>
              <h3 className="title">CARO VN</h3>
            </li>
            <li>
              <Link to="/login">
                <Icon className="icon" type="login" /> Login
              </Link>
            </li>
            <br />
            <li>
              <Link to="/register">
                <Icon className="icon" type="select" /> Register
              </Link>
            </li>
            <br />
          </ul>
        </div>

        <div className="main">
          <div className="div70">
            {/* 
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login">
                <MapLogin />
              </Route>
              <Route path="/register">
                <MapRegister />
              </Route>
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapRouterStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  getProfileFetchs: () => dispatch(getProfileFetch()),
  logoutAccount: () => dispatch(restartGame())
});

export default connect(
  mapRouterStateToProps,
  mapDispatchToProps
)(Game);
