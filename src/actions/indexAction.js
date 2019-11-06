import axios from 'axios';

import {
  TICK_SQUARE,
  CHECK_WIN,
  RESTART_GAME,
  GOTO_MOVE,
  GOTO_MOVE_WIN,
  SORT_LIST,
  INCREASE,
  DECREASE,
  LOGIN_ACOUNT,
  LOGOUT_ACOUNT,
  CONFIRM_REGISTER,
  REGISTER_ERR,
  LOGIN_FACEBOOK,
  RELOAD_DB,
  PENDING_LOGIN,
  EDIT_PASS,
  SET_AUTO,
  FALSE_AUTO,
  PUSH_MESSAGE,
  PLAY_ONLINE,
  PLAY_OFFLINE
} from '../constants/actions';

export const tickSquare = (index, newSquaresArr, history, xIsNext) => ({
  type: TICK_SQUARE,
  index,
  newSquaresArr,
  history,
  xIsNext,
});

export const setFalseIsAuto = () => ({
  type: FALSE_AUTO
})

export const pushMessage = (message) => ({
  type: PUSH_MESSAGE,
  message
})

export const dispatchOnline = () => ({
  type: PLAY_ONLINE,
})

export const dispatchOffline = () => ({
  type: PLAY_OFFLINE,
})

export const setAuto = isAuto => ({
  type: SET_AUTO,
  isAuto
})

export const checkWin = arrTem => ({
  type: CHECK_WIN,
  arrTem
});

export const restartGame = () => ({
  type: RESTART_GAME
});

export const goToMove = (step, arrWinTemp) => ({
  type: GOTO_MOVE,
  step,
  arrWinTemp
});

export const loginByFacebook = facebook => ({
  type: LOGIN_FACEBOOK,
  payload: facebook
});

export const goToMoveWin = step => ({
  type: GOTO_MOVE_WIN,
  step
});

export const sortList = newList => ({
  type: SORT_LIST,
  newList
});

export const setIncrease = () => ({
  type: INCREASE
});

export const setDecrease = () => ({
  type: DECREASE
});

export const errLogin = () => ({
  type: LOGOUT_ACOUNT
});

export const confirmRegister = () => ({
  type: CONFIRM_REGISTER
});

export const logAccount = currentUser => ({
  type: LOGIN_ACOUNT,
  payload: currentUser
});

export const reloadDB = (ID, gmail, Username, gender, avatar, Password) => ({
  type: RELOAD_DB,
  payload: { ID, gmail, Username, gender, avatar, Password }
});

export const editPass = Password => ({
  type: EDIT_PASS,
  Password
});

export const registerErr = error => ({
  type: REGISTER_ERR,
  payload: error
});

export const pendingLogin = () => ({
  type: PENDING_LOGIN
});

export const fecthAccount = (Username, Password, gmail, gender, avatar) => {
  return dispatch => {
    return axios
      .post('https://api-caro-lchung.herokuapp.com/user/register', {
        Username,
        Password,
        gmail,
        gender,
        avatar
      })
      .then(response => response.data)
      .then(data => dispatch(registerErr(data)))
      .catch( (error)=> {
        console.log(error);
      });
  };
};

export const updateInfor = (ID, gmail, Username, gender, avatar, Password) => {
  return dispatch => {
    return axios
      .post('https://api-caro-lchung.herokuapp.com/editprofile', {
        ID,
        Username,
        gender,
        avatar
      })
      .then(response => response.data)
      .then(data => {
        if (data) {
          dispatch(reloadDB(ID, gmail, Username, gender, avatar, Password));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const loginAccount = (gmail, Password) => {
  return dispatch => {
    dispatch(pendingLogin());
    return axios
      .post('https://api-caro-lchung.herokuapp.com/user/login', {
        gmail,
        Password
      })
      .then(response => response.data)
      .then(data => {
        if (data.message) {
          // console.log(data)
        } else {
          localStorage.setItem('token', data.token);
          dispatch(logAccount(data.user));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(errLogin());
      });
  };
};

export const getProfileFetch = () => {
  return dispatch => {
    // localStorage.clear();
    const tokens = localStorage.token;
    if (tokens) {
      return axios
        .get('https://api-caro-lchung.herokuapp.com/me', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${tokens}`
          }
        })
        .then(resp => resp.data)
        .then(data => {
          if (data.message) {
            localStorage.removeItem('token');
          } else {
            console.log('daya: ', data)
            dispatch(logAccount(data));
          }
        });
    }
    return null;
  };
};

export const updatePass = (ID, gmail, Username, gender, avatar, Password) => {
  console.log('pass', Password);
  return dispatch => {
    return axios
      .post('https://api-caro-lchung.herokuapp.com/editpass', {
        ID,
        Password
      })
      .then(response => response.data)
      .then(data => {
        if (data) {
          dispatch(reloadDB(ID, gmail, Username, gender, avatar, Password));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
