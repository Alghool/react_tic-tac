import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
  
  export default class Board extends React.Component {

    renderSquare(i) {
        let winningClass = ''
        if(this.props.line){
            if(this.props.line.includes(i)){
                winningClass = 'winner';
            }
        }
      return <Square 
        value = {this.props.squares[i]} 
        onClick= {() => this.props.onClick(i)}
        winningClass = {winningClass}
      />;
    }


    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  