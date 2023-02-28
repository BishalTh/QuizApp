import React, { useState, useContext, useEffect, useCallback } from "react";
import { QuizContext } from "../Helpers/Context";
import { Questions } from "../Helpers/QuestionBank";
import "./Quiz.css";

function Quiz() {
  
  const { score, setScore, setGameState } = useContext(QuizContext);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [optionChosen, setOptionChosen] = useState("");
  const [optionState, setOptionState] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });

  const handleOptionClick = (option) => {
    const correctAnswer = currentQuestion.answer;
    const newState = { ...optionState };
    newState[option] = option === correctAnswer ? "correct" : "wrong";
    setOptionState(newState);
    setOptionChosen(option);
    if (option === correctAnswer) {
      setScore(score + 1);
    }
  };

  const getNextQuestion = useCallback(() => {
    const remainingQuestions = Questions.filter(
      (question) => !answeredQuestions.includes(question)
    );
    if (remainingQuestions.length === 0) {
      // All questions have been answered
      setCurrentQuestion(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    setCurrentQuestion(remainingQuestions[randomIndex]);
  }, [answeredQuestions]);

  const nextQuestion = useCallback(() => {
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    getNextQuestion();
    setOptionChosen("");
    setOptionState({
      A: "",
      B: "",
      C: "",
      D: "",
    });
  }, [answeredQuestions, currentQuestion, getNextQuestion]);

  useEffect(() => {
    getNextQuestion();
  }, [getNextQuestion]);

  const finishQuiz = useCallback(() => {
    setGameState("endScreen");
  }, [setGameState]);

  const optionColor = (option) => {
    if (optionState[option] === "correct") {
      return "green";
    } else if (optionState[option] === "wrong" && optionChosen === option) {
      return "red";
    } else {
      return "";
    }
  };

  if (currentQuestion === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Quiz">
      <h1 className="question">{currentQuestion.prompt}</h1>
      <div className="options">
        <button
          style={{ backgroundColor: optionColor("A") }}
          disabled={optionChosen}
          onClick={() => handleOptionClick("A")}
        >
          {currentQuestion.optionA}
        </button>
        <button
          style={{ backgroundColor: optionColor("B") }}
          disabled={optionChosen}
          onClick={() => handleOptionClick("B")}
        >
          {currentQuestion.optionB}
        </button>
        <button
          style={{ backgroundColor: optionColor("C") }}
          disabled={optionChosen}
          onClick={() => handleOptionClick("C")}
        >
          {currentQuestion.optionC}
        </button>
        <button
          style={{ backgroundColor: optionColor("D") }}
          disabled={optionChosen}
          onClick={() => handleOptionClick("D")}
        >
          {currentQuestion.optionD}
        </button>
      </div>
      {answeredQuestions.length === Questions.length - 1 ? (
        <button disabled={!optionChosen} onClick={finishQuiz}>
          Finish Quiz
        </button>
      ) : (
        <button disabled={!optionChosen} onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
