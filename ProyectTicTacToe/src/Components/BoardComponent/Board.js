import React,{Component} from "react";
import Square from "../SquareComponent/Square.js";
import "./board.css"

class Board extends Component{
    constructor(props){
        super(props);
        this.state={
            squares:Array(9).fill(null),
            xIsNext:true,
        }
    }
    handleClick(i){
        const scuaresSlice=this.state.squares.slice();
        scuaresSlice[i]=(this.state.xIsNext) ?"X":"O";
        this.setState({
            squares:scuaresSlice,
            xIsNext:!this.state.xIsNext
        });
    }
    
    renderSquare(i){
        return(  
            <Square 
            onClick={() => this.handleClick(i)}
            value={this.state.squares[i]}/>
        );
    }

    render(){
        
        const status = "Next player: " + (this.state.xIsNext ? "X":"O");
        
        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {console.log("ejecutando render return "+this.state.squares[1])}
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

export default Board;