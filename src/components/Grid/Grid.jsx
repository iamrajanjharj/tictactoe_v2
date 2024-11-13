import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IsWinner from "../IsWinner/IsWinner";

function restart() {
  window.location.reload();
}

function Grid({ noOfCards }) {
  const [turn, setTurn] = useState(true);
  const [board, setBoard] = useState(Array(noOfCards).fill(""));
  const [winner, setWinner] = useState("");

  function play(index) {
    if (turn) {
      board[index] = "0";
    } else {
      board[index] = "X";
    }
    const winner = IsWinner(board, turn ? "0" : "X");
    if (winner) {
      setWinner(winner);
      toast(`Congratulations. ${winner} won the game.`);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  return (
    <>
      {winner && (
        <>
          <h1 className="highlight">Winner is {winner}.</h1>
          <button className="reset" onClick={restart}>
            Restart
          </button>
          <ToastContainer position="top-center" />
        </>
      )}
      <h1 className="highlight">Current Turn: {turn ? "0" : "X"}</h1>
      <div className="grid">
        {board.map((val, idx) => {
          return <Card onPlay={play} key={idx} player={val} index={idx} />;
        })}
      </div>
    </>
  );
}

export default Grid;
