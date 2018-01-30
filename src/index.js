import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const score2Win = 5;
const size = 10;

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(grid) {
    let size2Test = size - score2Win;
    for (let x = 0; x <= size2Test; x++) {
        for (let y = 0; y <= size2Test; y++) {
            let scoreDL = 1;
            let scoreDR = 1;
            let playerDL = false;
            let playerDR = false;
            for (let d = 0; d < score2Win; d++) {
                let cell1 = grid[x + d][y + d];
                if (playerDR === cell1 && cell1 !== '') {
                    scoreDR++;
                    if (scoreDR === score2Win) {
                        return playerDR;
                    }
                } else {
                    playerDR = cell1;
                    scoreDR = 1;
                }
                let cell2 = grid[x - d + (score2Win - 1)][y + d];
                if (playerDL === cell2 && cell2 !== '') {
                    scoreDL++;
                    if (scoreDL === score2Win) {
                        return playerDL;
                    }
                } else {
                    playerDL = cell2;
                    scoreDL = 1;
                }
            }
        }
    }
    for(let x = 0; x < size; x++){
        let scoreH = 1;
        let scoreV = 1;
        let playerH = false;
        let playerV = false;
        for(let y = 0; y < size; y++){
            if (playerH === grid[x][y] && grid[x][y] !== ''){
                scoreH++;
                if (scoreH === score2Win){
                    return playerH;
                }
            } else {
                playerH = grid[x][y];
                scoreH = 1;
            }
            if (playerV === grid[y][x] && grid[y][x] !== ''){
                scoreV++;
                if (scoreV === score2Win){
                    return playerV;
                }
            } else {
                playerV = grid[y][x];
                scoreV = 1;
            }
        }
    }
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        let square = Array(size);
        for (let i=0; i<size; i++){
            square[i] = Array(size).fill('');
        }
        this.state = {
            squares: square,
            xIsNext: true,
        };
    }

    handleClick(x, y) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[x][y]) {
            return;
        }
        squares[x][y] = (this.state.xIsNext ? 'X' : 'O');
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        let divs = [];
        for (let y = 0; y < size; y++){
            let squares = [];
            for (let x = 0; x < size; x++){
                squares.push(<Square value={this.state.squares[x][y]} onClick={() => this.handleClick(x, y)}/>);
            }
            divs.push(<div className="board-row">{squares}</div>);
        }

        return (
            <div>
                <div className="status">{status}</div>
                {divs}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
