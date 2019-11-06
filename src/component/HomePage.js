import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import '../css/Game.css';
import {
  dispatchOnline,
  dispatchOffline,
  restartGame
} from '../actions/indexAction';

class HomePage extends React.PureComponent {
  playOnline = () => {
    const { dispatchOnlines, restartGames, history } = this.props;
    restartGames();
    dispatchOnlines();
    history.push('/playOnline');
  };

  playOffline = () => {
    const { dispatchOfflines, restartGames, history } = this.props;
    restartGames();
    dispatchOfflines();
    history.push('/playwithboss');
  };

  render() {
    return (
      <div>
        <div className="shadow-lg mt-5 p-5 option">
          <h3>Chọn chế độ chơi game</h3>
          <Button onClick={this.playOnline}>Đánh với người</Button>
          <br />
          <Button onClick={this.playOffline}>Đánh mới máy</Button>
        </div>
      </div>
      // <Router>
      //     <div>
      //       <ul>
      //         <li>
      //           <Link to="/playOnline" onClick={this.playOnline} >
      //             <Icon className="icon" type="user" /> Đánh với người
      //           </Link>
      //         </li>
      //         <br />
      //         <li>
      //           <Link to="/playwithboss" onClick={this.playOffline}>
      //             <Icon className="icon" type="home" /> Đánh với máy
      //           </Link>
      //         </li>
      //         <br />
      //       </ul>
      //     </div>

      //     <Switch>
      //       <Route exact path="/playwithboss">
      //         <MapApp />
      //       </Route>
      //       <Route exact path="/playOnline">
      //         <MapApp/>
      //       </Route>
      //     </Switch>
      // </Router>
    );
  }
}

const mapRouterStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  dispatchOnlines: () => dispatch(dispatchOnline()),
  dispatchOfflines: () => dispatch(dispatchOffline()),
  restartGames: () => dispatch(restartGame())
});

export default connect(
  mapRouterStateToProps,
  mapDispatchToProps
)(withRouter(HomePage));
