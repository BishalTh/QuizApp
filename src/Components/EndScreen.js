import "../App.css";
import React, { useContext } from "react";
import { QuizContext } from "../Helpers/Context";
import { Questions } from "../Helpers/QuestionBank";

function EndScreen() {
  const {score, setScore, setGameState} = useContext(QuizContext);
  const restartQuiz =() =>  {
    setScore(0);
    setGameState("menu");
  }
  return <div className="EndScreen">
    <h1>Thank you for playing Quiz!</h1>
    <h3>Your Score: {score} / {Questions.length} </h3>
    <button onClick={restartQuiz} > Restart Quiz</button>
  </div>;
}

export default EndScreen;
