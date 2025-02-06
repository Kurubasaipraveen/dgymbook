import React from "react";
import Tile from "./Tile";
import { getFeedback } from "../utils/gameUtils";
const WordGrids = ({ guesses, currentGuess, targetWord }) => {
  return (
    <div className="grid">
      {guesses.map((guess, i) => {
        const isCurrent = i === guesses.findIndex((g) => g === "");
        const letters = isCurrent ? currentGuess.padEnd(5, " ") : guess;
        const feedback = guess ? getFeedback(guess, targetWord) : [];
        return (
          <div key={i} className="row">
            {letters.split("").map((letter, j) => (
              <Tile
                key={j}
                letter={letter}
                status={feedback[j]?.status || (isCurrent && currentGuess[j] ? "active" : "")}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default WordGrids;
