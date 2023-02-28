// Import the CSS file for styling
import "../App.css";

import React, { useContext } from "react";
import { QuizContext } from "../Helpers/Context";
import { Questions } from "../Helpers/QuestionBank";

// Define a function component for the end screen of the quiz
function EndScreen() {
  // Access the quiz context to retrieve and update the score and game state
  const {score, setScore, setGameState} = useContext(QuizContext);

  // Define a function to reset the score and game state when the quiz is restarted
  const restartQuiz = () => {
    setScore(0);
    setGameState("menu");
  };

  // Render the end screen of the quiz, displaying the score and a button to restart
  return (
    <div className="EndScreen">
      <h1>Thank you for playing Quiz!</h1>
      <h3>Your Score: {score} / {Questions.length} </h3>
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
}

// Export the EndScreen component for use in other parts of the application
export default EndScreen;
