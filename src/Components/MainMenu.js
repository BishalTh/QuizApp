import "../App.css";
import React, { useContext } from "react";
import { QuizContext } from "../Helpers/Context";


export default function MainMenu() {
  const { setGameState } = useContext(QuizContext);
  return (
    <div className="Menu">
      <button
        onClick={() => {
          setGameState("quiz");
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}
