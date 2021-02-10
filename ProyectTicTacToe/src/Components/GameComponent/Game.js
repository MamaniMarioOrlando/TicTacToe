import React,{Component} from "react";
import Board from "../BoardComponent/Board.js";
import "./game.css"

class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            history:[{
                squares:Array(9).fill(null),
            }],
            xIsNext:true,
            stepNumber:0

        }
    }

    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0,
        });
    }

    handleClick(i){
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current= history[history.length-1];
        const scuaresSlice=current.squares.slice();
        if(this.calculateWinner(scuaresSlice)|| scuaresSlice[i]){
            return;
        }
        scuaresSlice[i]=(this.state.xIsNext) ?"X":"O";
        this.setState({
            history:history.concat([{
                squares:scuaresSlice,
            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext
        });
    }

    calculateWinner(squares){
        const lines=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i=0;i<lines.length;i++){
            const [a,b,c]=lines[i];
            if(squares[a]&&squares[a]===squares[b]&& squares[a]=== squares[c]){
                console.log("square[a] "+squares[a]+" a =" + a+"squares[b] "+squares[b]+"square[c] "+squares[c]);
                return squares[a];
            }
        }
        return null;
    }

    render(){

        const history=this.state.history;
        const current=history[this.state.stepNumber];
        const winner=this.calculateWinner(current.squares);

        const moves=history.map((step,move)=>{
            const desc=move?"Go to move #"+ move: "Go to game start";
            return(
            <li key={move}>
                <button onClick={()=>this.jumpTo(move)}>{desc}</button>
            </li>);
        });
        console.log("is current "+current);
        let status;
        if(winner){
            status="Winner is: "+winner;
        }else{
            status=" Next Player is: "+(this.state.xIsNext?"X":"O");
        }
        return(

            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i)=>this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;