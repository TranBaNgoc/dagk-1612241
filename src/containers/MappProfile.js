import { connect } from 'react-redux';
import Profile from '../profile/home';
import { updateInfor } from '../actions/indexAction';

const mapStateToProps = state => ({
  state: state.tickSquare
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (ID,gmail, Username, gender, avatar,Password) =>
    dispatch(updateInfor(ID,gmail, Username, gender, avatar,Password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
