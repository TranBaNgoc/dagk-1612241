import createInitialState from '../utils/createInitialState';

const tickSquare = (state = createInitialState(), action) => {
  switch (action.type) {
    case 'TICK_SQUARE':
      return {
        ...state,
        index: action.index,
        history: action.history.concat([
          {
            squares: action.newSquaresArr
          }
        ]),
        stepNumber: action.history.length,
        xIsNext: !action.xIsNext
      };
    case 'SET_AUTO':
      return {
        ...state,
        isAuto: !action.isAuto
      };
    case 'CHECK_WIN':
      return {
        ...state,
        check: true,
        checkWin: true,
        arrWin: action.arrTem,
        arrWinTemp: action.arrTem
      };
    case 'PUSH_MESSAGE':
      return {
        ...state,
        messages: action.message
      };

    case 'RESTART_GAME':
      return {
        ...state,
        history: [
          {
              squares: Array(400).fill(null)
          }
      ],
      arrWin: [],
      arrWinTemp: [],
      stepNumber: 0,
      xIsNext: true,
      check: false,
      checkWin: false,
      moves: [],
      isIncrease: true,
      isDecrease: false,
      error:{},
      pending: false,
      isAuto: false,
      messages: [],
      index: -1,
      };
    case 'GOTO_MOVE':
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0,
        arrWin: action.arrWinTemp,
        check: true
      };
    case 'LOGOUT_ACOUNT':
      return {
        ...state,
        currentUser: {},
        pending: false
      };
    case 'FALSE_AUTO':
      return {
        ...state,
        isAuto: true
      };
    case 'GOTO_MOVE_WIN':
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0,
        arrWin: [],
        check: false
      };
    case 'SORT_LIST':
      return {
        ...state,
        moves: action.newList
      };
    case 'INCREASE':
      return {
        ...state,
        isIncrease: true,
        isDecrease: false
      };

    case 'DECREASE':
      return {
        ...state,
        isIncrease: false,
        isDecrease: true
      };

    case 'LOGIN_ACOUNT':
      return {
        ...state,
        currentUser: action.payload,
        pending: false
      };
    case 'RELOAD_DB':
      return {
        ...state,
        currentUser: action.payload
      };

    case 'EDIT_PASS':
      return {
        ...state.currentUser,
        Password: action.Password
      };

    case 'LOGIN_FACEBOOK':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'REGISTER_ERR':
      return {
        ...state,
        error: action.payload
      };
    case 'PLAY_ONLINE':
      return {
        ...state,
        withPerson: true
      };
    case 'PLAY_OFFLINE':
      return {
        ...state,
        withPerson: false
      };

    case 'CONFIRM_REGISTER':
      return {
        ...state
      };
    case 'PENDING_LOGIN':
      return {
        ...state,
        pending: true
      };

    default:
      return state;
  }
};

export default tickSquare;
