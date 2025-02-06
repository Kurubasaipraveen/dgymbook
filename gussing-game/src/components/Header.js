import React from "react";

const Headers = ({ theme, toggleTheme }) => {
  return (
    <div className="both-row">
      <h1>Guess The Word</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};
export default Headers;
