// Import the CSS file for styling
import "../App.css";

import React, { useContext } from "react";
import { QuizContext } from "../Helpers/Context";

// Define a functional component for the main menu of the quiz
export default function MainMenu() {
  // Access the quiz context to retrieve the setGameState function
  const { setGameState } = useContext(QuizContext);

  // Render the main menu of the quiz, consisting of a single button to start the quiz
  return (
    <div className="Menu">
      <button
        // When the button is clicked, call the setGameState function to change the game state to "quiz"
        onClick={() => {
          setGameState("quiz");
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};
