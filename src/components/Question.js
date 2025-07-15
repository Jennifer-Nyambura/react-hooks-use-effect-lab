import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const { prompt, answers, correctIndex } = question;
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Start the interval to decrement timer
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup: clear interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // When timer reaches 0, call onAnswered(false)
    if (timeRemaining === 0) {
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswerClick(index) {
    const isCorrect = index === correctIndex;
    onAnswered(isCorrect);
  }

  return (
    <div>
      <h2>{prompt}</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={answer}>
            <button onClick={() => handleAnswerClick(index)}>{answer}</button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;
