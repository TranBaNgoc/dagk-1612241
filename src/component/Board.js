import React from 'react';
import Square from './Square';

class Board extends React.Component {
  fCCheck(i) {
    const { arrWin } = this.props;
    arrWin.filter(idx => {
      if (idx === i) return true;
      return false;
    });
  }

  renderSquare(i) { 
    const { arrWins, squares, onClick } = this.props;
    if (arrWins.length === 0) {
      if (squares[i] === 'O') {
        return (
          <Square
            key={i}
            color="red"
            styles="white"
            value={squares[i]}
            onClick={() => onClick(i)}
          />
        );
      }

      return (
        <Square
          key={i}
          color="black"
          styles="white"
          value={squares[i]}
          onClick={() => onClick(i)}
        />
      );
    }
    let check = false;
    arrWins.forEach(element => {
      if (element === i) {
        check = true;
      }
    });
    if (check) {
      if (squares[i] === 'O') {
        return (
          <Square
            key={i}
            color="red"
            styles="#28A745"
            value={squares[i]}
            onClick={() => onClick(i)}
          />
        );
      }
      return (
        <Square
          key={i}
          color="black"
          styles="#28A745"
          value={squares[i]}
          onClick={() => onClick(i)}
        />
      );
    }
    if (squares[i] === 'O') {
      return (
        <Square
          key={i}
          color="red"
          styles="white"
          value={squares[i]}
          onClick={() => onClick(i)}
        />
      );
    }
    return (
      <Square
        key={i}
        color="black"
        styles="white"
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    let items = [];
    const itemss = [];

    for (let index = 0; index < 20; index += 1) {
      const i = 20;
      const lenght = 20 * (index + 1);
      for (let y = i * index; y < lenght; y += 1) {
        items.push(this.renderSquare(y));
      }
      itemss.push(
        <div key={index} className="board-row">
          {items}
        </div>
      );
      items = [];
    }

    return (
      <div className="shadow pl-3 pr-3 pb-3 mt-3 bg-white rounded ">
        <div className="status1">
          <h3>GAME CARO</h3>
          {itemss}
        </div>
      </div>
    );
  }
}


export default Board