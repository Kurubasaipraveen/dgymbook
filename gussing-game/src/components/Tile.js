import React from "react";

const Tittle = ({ letter, status }) => {
  return (
    <div className={`tile ${status}`}>
      {letter.toUpperCase()}
    </div>
  );
};

export default Tittle;
