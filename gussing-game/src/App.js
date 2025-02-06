import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import WordGrid from "./components/WordGrid";
import Keyboard from "./components/Keyboard";
import Message from "./components/Message";
import Confetti from "./components/animation"; 
import { WORDS, MAX_ATTEMPTS, getFeedback, updateUsedKeys } from "./utils/gameUtils";

function App() {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(Array(MAX_ATTEMPTS).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");
  const [message, setMessage] = useState("");
  const [usedKeys, setUsedKeys] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }, []);
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameStatus !== "playing") return;

      const key = e.key.toUpperCase();
      if (key === "ENTER") handleSubmit();
      else if (key === "BACKSPACE") handleBackspace();
      else if (/^[A-Z]$/.test(key)) handleLetter(key);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, gameStatus]);

  const handleLetter = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== 5) {
      setMessage("Word must be 5 letters");
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    if (!WORDS.includes(currentGuess)) {
      setMessage("Not in word list");
      setTimeout(() => setMessage(""), 1500);
      return;
    }

    const newGuesses = [...guesses];
    newGuesses[guesses.findIndex((g) => g === "")] = currentGuess;
    setGuesses(newGuesses);

    const feedback = getFeedback(currentGuess, targetWord);
    setUsedKeys(updateUsedKeys(feedback, usedKeys));

    if (currentGuess === targetWord) {
      setGameStatus("won");
      setMessage("🎉 Congratulations! You won! 🎉");
    } else if (newGuesses.every((g) => g !== "")) {
      setGameStatus("lost");
      setMessage(`😢 Game over! The word was ${targetWord}`);
    } else {
      setCurrentGuess("");
    }
  };

  const startNewGame = () => {
    setTargetWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses(Array(MAX_ATTEMPTS).fill(""));
    setCurrentGuess("");
    setGameStatus("playing");
    setUsedKeys({});
    setMessage("");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`game-container ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <WordGrid guesses={guesses} currentGuess={currentGuess} targetWord={targetWord} />
      <Message message={message} />
      <Keyboard
        usedKeys={usedKeys}
        onKeyPress={(key) => {
          if (gameStatus !== "playing") return;
          if (key === "Enter") handleSubmit();
          else if (key === "Backspace") handleBackspace();
          else if (key.length === 1) handleLetter(key);
        }}
      />
      {gameStatus === "won" && <Confetti />} {/* Show Confetti on win */}
      {gameStatus !== "playing" && (
        <button className="new-game" onClick={startNewGame}>
          New Game
        </button>
      )}
    </div>
  );
}

export default App;
