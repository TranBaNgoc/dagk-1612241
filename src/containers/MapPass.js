import { connect } from 'react-redux';
import ChangePass from '../profile/changePass';
import { updatePass } from '../actions/indexAction';

const mapStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  updatePassword : (ID,gmail,Username,gender, avatar, Password) => dispatch(updatePass(ID,gmail,Username,gender, avatar, Password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePass);
