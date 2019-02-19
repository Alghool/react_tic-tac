import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
  
  export default class Game extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        history: [{
          squares:Array(9).fill(null),
          thisSquare: null
        }],
        stepNumber: 0,
        xIsNext: true,
        sortDesc: false
      }
    }


    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const winner = calculateWinner(squares);
      
      if(winner || squares[i]) return;
      squares[i] = this.state.xIsNext? 'X': 'O';
      this.setState({ 
        history: history.concat([{squares: squares, thisSquare: i}]),
        stepNumber : history.length,
        xIsNext: !this.state.xIsNext
      });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    resort(){
        this.setState({
            sortDesc: !this.state.sortDesc,
        })
    }

    render() {
      let history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      let status;
      if(winner){
        status = "Winner is " + winner;
      }else{
        status = 'Next player: '+ (this.state.xIsNext? 'X' : 'O');
      }

      const moves = history.map((step, move)=>{
        const location = getSquareLocation(step.thisSquare);
        let desc = move? 'move: ' + move + '- x: ' + location[0] + ' y: '+ location[1] + ' - player: ' + step.squares[step.thisSquare]  : 'Go To Start';
        desc = (move === this.state.stepNumber)? <b>{desc}</b> : desc;
        return (
          <li key={move}>
            <button onClick={()=>this.jumpTo(move)} > {desc} </button>
          </li>
        ) 
      });

      if(this.state.sortDesc){
        moves.reverse();
    } 

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i)=>this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <p>steps history <button onClick={()=>this.resort()}>sort {this.state.sortDesc? 'DESC': 'ASC'}</button></p>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function getSquareLocation(i){
      const locations = [
            [0,0], [0,1], [0,2],
            [1,0], [1,1], [1,2], 
            [2,0], [2,1], [2,2]
        ]

        return locations[i];
  }