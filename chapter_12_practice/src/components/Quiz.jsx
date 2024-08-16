import { useCallback, useRef, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const activeQuestionIndex =
  userAnswer.length ;

  const isQuizComplete = QUESTIONS.length === userAnswer.length;

  const handleSelectAnswer = (answer) => {
    setUserAnswer((prevAnswers) => [...prevAnswers, answer]);}
    
  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  },[handleSelectAnswer]);
  if (isQuizComplete) {
    return (
      <Summary userAnswers={userAnswer}/>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
        key={activeQuestionIndex}
        index={
          activeQuestionIndex
        }
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
