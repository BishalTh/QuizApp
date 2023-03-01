// Importing necessary modules and components
import "./App.css";
import React, { useState } from "react";
import MainMenu from "./Components/MainMenu";
import Quiz from "./Components/Quiz";
import EndScreen from "./Components/EndScreen";
import { QuizContext } from "./Helpers/Context";

function App() {
// Initializing game state and score using useState hook
const [gameState, setGameState] = useState("menu");
const [score, setScore] = useState(0);

// Rendering different game screens based on the current game state
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

// Wrapping game screen in QuizContext.Provider to make context values available to all components
return (
<div className="App">
<h1>Quiz App</h1>
<QuizContext.Provider value={{ gameState, setGameState, score, setScore }}>
{gameScreen}
</QuizContext.Provider>
</div>
);
}

// Exporting App component as default
export default App;