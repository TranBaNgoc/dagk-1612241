import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { fecthAccount, loginAccount } from '../actions/indexAction';

class Google extends Component {
  responseGoogle = response => {
    console.log('gg', response);
    const { registerAcc, logAccount } = this.props;
    Promise.resolve(
      registerAcc(
        response.profileObj.givenName,
        response.profileObj.googleId,
        response.profileObj.email,
        response.profileObj.givenName,
        response.profileObj.imageUrl
      )
    ).then(() => {
      logAccount(response.profileObj.email, response.profileObj.googleId);
    });
  };

  componentClicked = () => console.log('clicked');

  render() {
    const ggContent = (
      <GoogleLogin
        clientId="141881485069-shpmku2ru3ap5f6tr229plvg1ih8ug3s.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy="single_host_origin"
      />
    );
    // }

    return <div>{ggContent}</div>;
  }
}

const mapRouterStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  registerAcc: (Username, Password, gmail, gender, avatar) =>
    dispatch(fecthAccount(Username, Password, gmail, gender, avatar)),
  logAccount: (Username, Password) => dispatch(loginAccount(Username, Password))
});

export default connect(
  mapRouterStateToProps,
  mapDispatchToProps
)(Google);
