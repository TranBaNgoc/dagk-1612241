import { connect } from 'react-redux'
import Register from '../register/home'
 import {fecthAccount,restartGame} from '../actions/indexAction'

 const mapStateToProps = state => ({
    state: state.tickSquare
})

const mapDispatchToProps = dispatch => ({
    registerAcc: (Username,Password,gmail,gender,avatar) => dispatch(fecthAccount(Username,Password,gmail,gender,avatar)),
    restartGame: () => dispatch(restartGame()),
   
})

export default connect( mapStateToProps, mapDispatchToProps)(Register)