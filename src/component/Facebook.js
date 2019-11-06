import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { fecthAccount,loginAccount } from '../actions/indexAction';

class Facebook extends Component {
  responseFacebook = response => {
   
    const { registerAcc, logAccount } = this.props;
    Promise.resolve(
      registerAcc(
        response.name,
        response.userID,
        response.email,
        response.name,
        response.name
      )
    ).then(()=> {
      logAccount(response.email,response.userID)
    });
  };

  componentClicked = () => console.log('clicked');

  render() {
    const fbContent = (
      <FacebookLogin
        appId="2752746501423488"
        autoLoad={false}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
      />
    );
    // }

    return <div>{fbContent}</div>;
  }
}

const mapRouterStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  registerAcc: (Username, Password, gmail, gender, avatar) =>
    dispatch(fecthAccount(Username, Password, gmail, gender, avatar)),
  logAccount: (Username,Password) => dispatch(loginAccount(Username,Password)),


});

export default connect(
  mapRouterStateToProps,
  mapDispatchToProps
)(Facebook);
