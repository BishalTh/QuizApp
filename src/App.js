import "./App.css";
import React, { useState } from "react";
import MainMenu from "./Components/MainMenu";
import Quiz from "./Components/Quiz";
import EndScreen from "./Components/EndScreen";
import { QuizContext } from "./Helpers/Context";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);

  let gameScreen;
  if (gameState === "menu") {
    gameScreen = <MainMenu />;
  } else if (gameState === "quiz") {
    gameScreen = <Quiz />;
  } else if (gameState === "endScreen") {
    gameScreen = <EndScreen />;
  } else {
    gameScreen = <div>Error: Invalid game state</div>;
  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <QuizContext.Provider value={{ gameState, setGameState, score, setScore }}>
        {gameScreen}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
