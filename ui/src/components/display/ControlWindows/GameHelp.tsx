import React from "react";
import "../../style/GameHelp.scss";

const GameHelp = () => {
  return (
    <div className="game-help">
      {/* Documentation */}
      <div className="documentation">
        <div className="game-help-heading">Game documentation</div>
        <a href="https://hackmd.io/m9AjLcheSXClw9ttzHQmVw?view">
          https://hackmd.io/m9AjLcheSXClw9ttzHQmVw?view
        </a>
      </div>
      {/* Game rules */}
      <div className="rules">
        <div className="game-help-heading">Game rules</div>
        <div className="game-rules-rules">
          Rule 1: The game starts with each player choosing a set of four pieces
          (usually colored red, blue, green, and yellow) and placing them on the
          starting square. <br /> <br />
          Rule 2: The objective of the game is to move all four pieces around
          the board and return them to the starting square before your
          opponents. <br /> <br />
          Rule 3: On each turn, players roll two dice to determine how many
          spaces they can move their pieces. <br /> <br />
          Rule 4: The number on each die represents how many spaces a piece can
          move. For example, if a player rolls a 3 and a 6, they can move one
          piece 3 spaces and another piece 6 spaces. <br /> <br />
          Rule 5: Pieces can only move forward, never backward. <br /> <br />
          Rule 6: If a piece lands on a square occupied by an opponent’s piece,
          it can “knock off” that piece and send it back to the starting square.{" "}
          <br /> <br />
          Rule 7: A piece can only be moved to a square that is empty or
          occupied by an opponent’s piece. <br /> <br />
          Rule 8: If a player rolls a double (two 6s), they can move one piece
          the total number of spaces shown on the dice (e.g., 6 spaces for two
          3s). <br /> <br />
          Rule 9: if a player 3 pieces reached Home, only one is left. and the
          piece reached the home column. A person should be shifted to one Dice,
          if the player wants to play with 2 dice he/she gets the exact number
          which in the case of one, is not possible <br /> <br />
          Rule 10: If a player has no pieces on the board, they can only roll
          the dice to try to get a double, which allows them to enter a piece
          into play. <br /> <br />
          Rule 11: The game ends when one player has all four pieces back on the
          starting square. That player is the winner.
        </div>
      </div>
    </div>
  );
};

export default GameHelp;
