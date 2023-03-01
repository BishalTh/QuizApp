/*
This is a functional component that renders the Quiz UI
It uses the QuizContext to manage the state of the quiz
It also imports the Questions array from the QuestionBank module
*/
import React, { useState, useContext, useEffect, useCallback } from "react";
import { QuizContext } from "../Helpers/Context";
import { Questions } from "../Helpers/QuestionBank";
import "./Quiz.css";

function Quiz() {
  // Import the state variables and functions from the QuizContext
  const { score, setScore, setGameState } = useContext(QuizContext);
  // Set the state variables for the current question, answered questions, and the option that the user has chosen
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [optionChosen, setOptionChosen] = useState("");

  // Set the state variable for the color of each option (green for correct, red for incorrect)
  const [optionState, setOptionState] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });

  // Handle the user clicking on an option
  const handleOptionClick = (option) => {
    // Check if the option is correct or not and set the optionState accordingly
    const correctAnswer = currentQuestion.answer;
    const newState = { ...optionState };
    newState[option] = option === correctAnswer ? "correct" : "wrong";
    setOptionState(newState);
    // Set the option that the user has chosen
    setOptionChosen(option);
    // If the option is correct, increase the score by 1
    if (option === correctAnswer) {
      setScore(score + 1);
    }
  };

  // Get the next question (randomly chosen from the remaining questions)
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
  // Move on to the next question
  const nextQuestion = useCallback(() => {
    // Add the current question to the answeredQuestions array
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    // Get the next question
    getNextQuestion();
    // Reset the chosen option and the optionState
    setOptionChosen("");
    setOptionState({
      A: "",
      B: "",
      C: "",
      D: "",
    });
  }, [answeredQuestions, currentQuestion, getNextQuestion]);

  // Use the useEffect hook to get the first question when the component mounts
  useEffect(() => {
    getNextQuestion();
  }, [getNextQuestion]);

  // Move to the end screen (final score) when the quiz is finished
  const finishQuiz = useCallback(() => {
    setGameState("endScreen");
  }, [setGameState]);

  // Set the color of each option based on whether it is correct, incorrect, or unselected
  const optionColor = (option) => {
    if (optionState[option] === "correct") {
      return "green";
    } else if (optionState[option] === "wrong" && optionChosen === option) {
      return "red";
    } else {
      return "";
    }
  };
  // Render the UI for the quiz
  if (currentQuestion === null) {
    return <div>Loading...</div>;
  }

  return (
    /*
Render the Quiz component with current question prompt and options.
The button element for each option is disabled if the user has already selected an option.
The background color of each button option changes depending on whether it is the correct or incorrect answer.
If the user has answered all questions except the last one, display a "Next Question" button that is disabled until an option is selected.
If the user has reached the last question, display a "Finish Quiz" button that is disabled until an option is selected.
*/
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
