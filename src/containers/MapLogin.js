import { connect } from 'react-redux'
import Login from '../login/home'
import {loginAccount} from '../actions/indexAction'

 const mapStateToProps = state => ({
    state: state.tickSquare
})

const mapDispatchToProps = dispatch => ({
    logAccount: (Username,Password) => dispatch(loginAccount(Username,Password)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)