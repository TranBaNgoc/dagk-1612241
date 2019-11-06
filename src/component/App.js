import React from 'react';
import Swal from 'sweetalert2';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import SocketIO from 'socket.io-client';
import '../css/App.css';
import Board from './Board';

const messagesList = [];
let youNext = true;
const io = SocketIO.connect('https://restfullapi-1612241.herokuapp.com/');
class App extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props;
    const { currentUser } = state;

    io.on('BroadcastMessage', message => {
      messagesList.push(
        <div
          style={
            currentUser.Username === message.user.Username
              ? { textAlign: '-webkit-right', marginBottom: '10px' }
              : { textAlign: '-webkit-left', marginBottom: '10px' }
          }
        >
          <div className="message-time">{message.user.Username}</div>
          <div className="message-text" style={{ background: '#A0DE96' }}>
            {message.value}
          </div>
        </div>
      );

      const { pushMessage } = this.props;
      pushMessage(messagesList);
    });

    io.on('NewStep', message => {
      if (message.user.Username !== currentUser.Username) {
        youNext = true;
      } else {
        youNext = false;
      }
      this.handleClick(message.index);
    });

    io.on('broadcastRQUndo', message => {
      if (message.user.Username !== currentUser.Username) {
        Swal.fire({
          type: 'error',
          title: 'Account or password not found!!!',
          text: 'Try again!!!'
        });
      }
    });
  }

  
  componentDidUpdate = () => {
    const { state } = this.props;
    const { isAuto, check, withPerson } = state;
    if (withPerson) {
      return null;
    }
    if (check) {
      return null;
    }
    if (isAuto === true) {
        this.handleClick(Math.floor(Math.random() * 399));

    }
    return null;
  };  

  addStep = i => {
    const { state } = this.props;
    const { withPerson } = state;
    if (withPerson) {
      if (youNext) {
        const { currentUser } = state;
        io.emit('AddStep', { index: i, user: currentUser });
        this.handleClick(i);
      }
    } 
    else {
      this.handleClick(i);
    }
  };

  handleClick = i => {
    const { state } = this.props;
    const { isAuto } = state;
    const { history } = state;
    const { stepNumber, check, xIsNext } = state;
    const { tickSquares, checkWin } = this.props;
    const history1 = history.slice(0, stepNumber + 1);
    const current = history1[history1.length - 1];
    const newSquaresArr = current.squares.slice();
    if (check) {
      Swal.fire({
        imageUrl:
          'https://www.cointelligence.com/content/wp-content/uploads/2019/02/Game-Over-Hodler.jpg',
        title: 'Game over',
        text: 'Please restart game!!!'
      });
      return null;
    }

    if (newSquaresArr[i] === null) {
      const { setAuto } = this.props;
      setAuto(isAuto);
      const length = 20;
      const arrTem = [];
      newSquaresArr[i] = xIsNext ? 'X' : 'O';
      tickSquares(i, newSquaresArr, history, xIsNext);

      switch (newSquaresArr[i]) {
        case 'O': {
          // hàng
          for (let colum = 1; colum < 6; colum += 1) {
            if (
              ((newSquaresArr[i - colum] === 'X' &&
                newSquaresArr[i - colum + 6] !== 'X') ||
                (newSquaresArr[i - colum] !== 'X' &&
                  newSquaresArr[i - colum + 6] === 'X') ||
                (newSquaresArr[i - colum] !== 'X' &&
                  newSquaresArr[i - colum + 6] !== 'X')) &&
              newSquaresArr[i - colum + 1] === 'O' &&
              newSquaresArr[i - colum + 2] === 'O' &&
              newSquaresArr[i - colum + 3] === 'O' &&
              newSquaresArr[i - colum + 4] === 'O' &&
              newSquaresArr[i - colum + 5] === 'O'
            ) {
              arrTem.push(i - colum + 1);
              arrTem.push(i - colum + 2);
              arrTem.push(i - colum + 3);
              arrTem.push(i - colum + 4);
              arrTem.push(i - colum + 5);

              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: '0 is winner :)'
              });
              return null;
            }
          }
          // dọc
          for (let row = 1; row < 6; row += 1) {
            if (
              ((newSquaresArr[i - row * length] === 'X' &&
                newSquaresArr[i + (-row + 6) * length] !== 'X') ||
                (newSquaresArr[i - row * length] !== 'X' &&
                  newSquaresArr[i + (-row + 6) * length] === 'X') ||
                (newSquaresArr[i - row * length] !== 'X' &&
                  newSquaresArr[i + (-row + 6) * length] !== 'X')) &&
              newSquaresArr[i + (-row + 1) * 20] === 'O' &&
              newSquaresArr[i + (-row + 2) * 20] === 'O' &&
              newSquaresArr[i + (-row + 3) * 20] === 'O' &&
              newSquaresArr[i + (-row + 4) * 20] === 'O' &&
              newSquaresArr[i + (-row + 5) * 20] === 'O'
            ) {
              arrTem.push(i + (-row + 1) * 20);
              arrTem.push(i + (-row + 2) * 20);
              arrTem.push(i + (-row + 3) * 20);
              arrTem.push(i + (-row + 4) * 20);
              arrTem.push(i + (-row + 5) * 20);

              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: '0 is winner :)'
              });
              return null;
            }
          }
          // chéo phải
          for (let row = 1; row < 6; row += 1) {
            if (
              ((newSquaresArr[i - row * (length + 1)] === 'X' &&
                newSquaresArr[i + (-row + 6) * (length + 1)] !== 'X') ||
                (newSquaresArr[i - row * (length + 1)] !== 'X' &&
                  newSquaresArr[i + (-row + 6) * (length + 1)] === 'X') ||
                (newSquaresArr[i - row * (length + 1)] !== 'X' &&
                  newSquaresArr[i + (-row + 6) * (length + 1)] !== 'X')) &&
              newSquaresArr[i + (-row + 1) * (length + 1)] === 'O' &&
              newSquaresArr[i + (-row + 2) * (length + 1)] === 'O' &&
              newSquaresArr[i + (-row + 3) * (length + 1)] === 'O' &&
              newSquaresArr[i + (-row + 4) * (length + 1)] === 'O' &&
              newSquaresArr[i + (-row + 5) * (length + 1)] === 'O'
            ) {
              arrTem.push(i + (-row + 1) * (length + 1));
              arrTem.push(i + (-row + 2) * (length + 1));
              arrTem.push(i + (-row + 3) * (length + 1));
              arrTem.push(i + (-row + 4) * (length + 1));
              arrTem.push(i + (-row + 5) * (length + 1));
              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: '0 is winner :)'
              });
              return null;
            }
          }

          // chéo trái
          for (let row = 1; row < 6; row += 1) {
            if (
              ((newSquaresArr[i - row * (length - 1)] === 'X' &&
                newSquaresArr[i + (-row + 6) * (length - 1)] !== 'X') ||
                (newSquaresArr[i - row * (length - 1)] !== 'X' &&
                  newSquaresArr[i + (-row + 6) * (length - 1)] === 'X') ||
                (newSquaresArr[i - row * (length - 1)] !== 'X' &&
                  newSquaresArr[i + (-row + 6) * (length - 1)] !== 'X')) &&
              newSquaresArr[i + (-row + 1) * (length - 1)] === 'O' &&
              newSquaresArr[i + (-row + 2) * (length - 1)] === 'O' &&
              newSquaresArr[i + (-row + 3) * (length - 1)] === 'O' &&
              newSquaresArr[i + (-row + 4) * (length - 1)] === 'O' &&
              newSquaresArr[i + (-row + 5) * (length - 1)] === 'O'
            ) {
              arrTem.push(i + (-row + 1) * (length - 1));
              arrTem.push(i + (-row + 2) * (length - 1));
              arrTem.push(i + (-row + 3) * (length - 1));
              arrTem.push(i + (-row + 4) * (length - 1));
              arrTem.push(i + (-row + 5) * (length - 1));
              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: '0 is winner :)'
              });
              return null;
            }
          }
          break;
        }
        case 'X': {
          // hàng
          for (let colum = 1; colum < 6; colum += 1) {
            if (
              ((newSquaresArr[i - colum] === 'O' &&
                newSquaresArr[i - colum + 6] !== 'O') ||
                (newSquaresArr[i - colum] !== 'O' &&
                  newSquaresArr[i - colum + 6] === 'O') ||
                (newSquaresArr[i - colum] !== 'O' &&
                  newSquaresArr[i - colum + 6] !== 'O')) &&
              newSquaresArr[i - colum + 1] === 'X' &&
              newSquaresArr[i - colum + 2] === 'X' &&
              newSquaresArr[i - colum + 3] === 'X' &&
              newSquaresArr[i - colum + 4] === 'X' &&
              newSquaresArr[i - colum + 5] === 'X'
            ) {
              arrTem.push(i - colum + 1);
              arrTem.push(i - colum + 2);
              arrTem.push(i - colum + 3);
              arrTem.push(i - colum + 4);
              arrTem.push(i - colum + 5);
              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: 'X is winner :)'
              });
              return null;
            }
          }

          // dọc
          for (let row = 1; row < 6; row += 1) {
            if (
              ((newSquaresArr[i - row * length] === 'O' &&
                newSquaresArr[i + (-row + 6) * length] !== 'O') ||
                (newSquaresArr[i - row * length] !== 'O' &&
                  newSquaresArr[i + (-row + 6) * length] === 'O') ||
                (newSquaresArr[i - row * length] !== 'O' &&
                  newSquaresArr[i + (-row + 6) * length] !== 'O')) &&
              newSquaresArr[i + (-row + 1) * 20] === 'X' &&
              newSquaresArr[i + (-row + 2) * 20] === 'X' &&
              newSquaresArr[i + (-row + 3) * 20] === 'X' &&
              newSquaresArr[i + (-row + 4) * 20] === 'X' &&
              newSquaresArr[i + (-row + 5) * 20] === 'X'
            ) {
              arrTem.push(i + (-row + 1) * 20);
              arrTem.push(i + (-row + 2) * 20);
              arrTem.push(i + (-row + 3) * 20);
              arrTem.push(i + (-row + 4) * 20);
              arrTem.push(i + (-row + 5) * 20);
              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: 'X is winner :)'
              });
            }
          }
          // chéo phải
          for (let row = 1; row < 6; row += 1) {
            if (
              ((newSquaresArr[i - row * (length + 1)] === 'O' &&
                newSquaresArr[i + (-row + 6) * (length + 1)] !== 'O') ||
                (newSquaresArr[i - row * (length + 1)] !== 'O' &&
                  newSquaresArr[i + (-row + 6) * (length + 1)] === 'O') ||
                (newSquaresArr[i - row * (length + 1)] !== 'O' &&
                  newSquaresArr[i + (-row + 6) * (length + 1)] !== 'O')) &&
              newSquaresArr[i + (-row + 1) * (length + 1)] === 'X' &&
              newSquaresArr[i + (-row + 2) * (length + 1)] === 'X' &&
              newSquaresArr[i + (-row + 3) * (length + 1)] === 'X' &&
              newSquaresArr[i + (-row + 4) * (length + 1)] === 'X' &&
              newSquaresArr[i + (-row + 5) * (length + 1)] === 'X'
            ) {
              arrTem.push(i + (-row + 1) * (length + 1));
              arrTem.push(i + (-row + 2) * (length + 1));
              arrTem.push(i + (-row + 3) * (length + 1));
              arrTem.push(i + (-row + 4) * (length + 1));
              arrTem.push(i + (-row + 5) * (length + 1));
              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: 'X is winner :)'
              });
            }
          }

          // chéo trái
          for (let row = 1; row < 6; row += 1) {
            if (
              ((newSquaresArr[i - row * (length - 1)] === 'O' &&
                newSquaresArr[i + (-row + 6) * (length - 1)] !== 'O') ||
                (newSquaresArr[i - row * (length - 1)] !== 'O' &&
                  newSquaresArr[i + (-row + 6) * (length - 1)] === 'O') ||
                (newSquaresArr[i - row * (length - 1)] !== 'O' &&
                  newSquaresArr[i + (-row + 6) * (length - 1)] !== 'O')) &&
              newSquaresArr[i + (-row + 1) * (length - 1)] === 'X' &&
              newSquaresArr[i + (-row + 2) * (length - 1)] === 'X' &&
              newSquaresArr[i + (-row + 3) * (length - 1)] === 'X' &&
              newSquaresArr[i + (-row + 4) * (length - 1)] === 'X' &&
              newSquaresArr[i + (-row + 5) * (length - 1)] === 'X'
            ) {
              arrTem.push(i + (-row + 1) * (length - 1));
              arrTem.push(i + (-row + 2) * (length - 1));
              arrTem.push(i + (-row + 3) * (length - 1));
              arrTem.push(i + (-row + 4) * (length - 1));
              arrTem.push(i + (-row + 5) * (length - 1));
              checkWin(arrTem);

              Swal.fire({
                imageUrl:
                  'https://st.quantrimang.com/photos/image/2018/03/06/danh-co-caro-640.jpg',
                title: 'HAPPY',
                text: 'X is winner :)'
              });
            }
          }
          break;
        }
        default:
          break;
      }
    }
    return null;
  };

  handleClickReset = () => {
    const { restartGame } = this.props;
    youNext = true;
    restartGame();
  };

  sendMessage = e => {
    const { state } = this.props;
    const { currentUser } = state;
    e.preventDefault();
    io.emit('AddMessage', {
      value: e.target.messageText.value,
      user: currentUser,
      index: state.index
    });
    e.target.messageText.value = '';
  };

  requireJumto = i => {
    const { state } = this.props;
    const { currentUser } = state;

    io.emit('rqUndo', {
      index: i,
      user: currentUser
    });
  };

  jumpTo = step => {
    const { state, goToMove, goToMoveWin, setfIsAuto } = this.props;
    const { history, checkWin, arrWinTemp } = state;
    const length = history.length - 1;
    if (checkWin === true && step === length) {
      goToMove(step, arrWinTemp);
    } else {
      goToMoveWin(step);
      if (step % 2 !== 0) {
        setfIsAuto();
      }
    }
    return null;
  };

  // sort = list => {
  //   const newList = [];
  //   const { sortList } = this.props;
  //   let size = list.length;
  //   for (let i = 0; i < list.length; i += 1) {
  //     newList.push(list[size - 1]);
  //     size -= 1;
  //   }
  //   sortList(newList);
  // };

  // fIncrease = list => {
  //   const { state, setIncrease } = this.props;
  //   const { isDecrease } = state;
  //   if (isDecrease) {
  //     this.sort(list);
  //     setIncrease();
  //     return list;
  //   }
  //   return null;
  // };

  // fDecrease = list => {
  //   const { state, setDecrease } = this.props;
  //   const { isIncrease } = state;

  //   if (isIncrease) {
  //     this.sort(list);
  //     setDecrease();
  //     return list;
  //   }

  //   return null;
  // };

  // sortHistory = list => {
  //   // console.log('sortHistory', this);
  //   const newList = [];
  //   let size = list.length;
  //   for (let i = 0; i < list.length; i += 1) {
  //     newList.push(list[size - 1]);
  //     size -= 1;
  //   }
  //   return newList;
  // };

  render() {
    const { state } = this.props;
    const {
      history,
      stepNumber,
      xIsNext,
      arrWin,
      messages,
      withPerson
    } = state;
    const current = history[stepNumber];
    const status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    const movess = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      const keyIdx = move;
      if (move === stepNumber)
        return (
          // <option style={{background: "#28A745"}} key={move} onClick={() => this.jumpTo(move)}><button>{desc}</button></option>
          <li key={keyIdx}>
            <button
              type="button"
              style={{ background: '#28A745' }}
              onClick={() => this.jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );

      return (
        // <option key={move} onClick={() => this.jumpTo(move)}>{desc}</option>
        <li key={keyIdx}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });
    // if (isDecrease) {
    //   movess = this.sortHistory(movess);
    // }

    // console.log(moves[moves.length].key)
    return (
      <div className="game">
        <div className="game-board status2">
          <div className="status3">
            <h5>
              <u>{status}</u>
            </h5>
            <br />
            <br />
            <button
              onClick={() => this.handleClickReset()}
              type="button"
              className="btn btn-success"
            >
              Restart game
            </button>
            <br />
            <br />
            {withPerson ? null : (
              <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <table className="  table table-bordered table-striped mb-0">
                  <thead>
                    <tr>
                      <th className="App" scope="col">
                        MoveList
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{movess}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <br />
            {withPerson ? (
              <div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.requireJumto(history.length - 1)}
                >
                  Undo
                </button>
              </div>
            ) : null}

            {/* 
              &emsp;
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.fDecrease(moves)}
              >
                Decrease
              </button>
            </div> */}
          </div>
          <Board
            arrWins={arrWin}
            squares={current.squares}
            onClick={index => this.addStep(index)}
            color={xIsNext}
          />
        </div>
        {withPerson ? (
          <div className="messenger" style={{ color: 'black' }}>
            <div className="message-header">CHAT BOX</div>
            <hr style={{ marginTop: '30px' }} />

            <div className="message-body" id="message-body">
              {messages}
            </div>

            <Form onSubmit={this.sendMessage} autoComplete="off">
              <InputGroup
                className="mb-3 message-input"
                style={{ padding: '0px', margin: '0px' }}
              >
                <FormControl
                  style={{ padding: '0px' }}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  name="messageText"
                />
                <InputGroup.Append>
                  <Button variant="success" type="submit">
                    Send
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
