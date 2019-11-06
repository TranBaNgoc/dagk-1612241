import { connect } from 'react-redux'
import App from '../component/App'
import { checkWin, tickSquare, restartGame, goToMove, goToMoveWin, sortList,
        setIncrease, setDecrease, setAuto, setFalseIsAuto, pushMessage } from '../actions/indexAction'

// import {tickSquare} from '../actions/indexAction'

const mapStateToProps = state => ({
    state: state.tickSquare
})

const mapDispatchToProps = dispatch => ({
    tickSquares: (i, newSquaresArr,history,xIsNext) => dispatch(tickSquare(i, newSquaresArr,history,xIsNext)),
    checkWin: (arrTem) => dispatch(checkWin(arrTem)),
    restartGame: () => dispatch(restartGame()),
    goToMove: (step,arrWinTemp) => dispatch(goToMove(step,arrWinTemp)),
    goToMoveWin: (step) => dispatch(goToMoveWin(step)),
    sortList: (newList) => dispatch(sortList(newList)),
    setIncrease: () => dispatch(setIncrease()),
    setDecrease: () => dispatch(setDecrease()),
    setAuto: (x)=> dispatch(setAuto(x)),
    setfIsAuto:() => dispatch(setFalseIsAuto()),
    pushMessage: (messagesList) => dispatch(pushMessage(messagesList))

})

export default connect(mapStateToProps, mapDispatchToProps)(App)