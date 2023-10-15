import { useEffect, useMemo, useState } from "react";
import "./App.css";
import words from "./assets/json/words.json";
import { POINT, TIMER } from "./config";
import { scramble } from "./utils";
import { CountdownTimer } from "./components";

function App() {
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isWrong, setIsWrong] = useState(false);
  const [remainingTime, setRemainingTime] = useState(TIMER);

  const question = useMemo(() => {
    const fq = words?.[counter] || null;
    if (fq) {
      return { ...fq, word: scramble(fq.word) };
    }
  }, [counter]);
  const totalQuestion = words.length;
  const buttonDisabled = answer?.trim()?.length === 0;

  const handleOnGuess = (e) => {
    e.preventDefault();
    const isCorrect = answer === words?.[counter]?.word;
    if (isCorrect) {
      setIsWrong(false);
      setAnswer("");
      setScore(score + POINT);
      setCounter(counter + 1);
    } else {
      setIsWrong(true);
    }
  };

  useEffect(() => {
    if (counter <= totalQuestion - 1 && remainingTime === 0) {
      setCounter(counter + 1);
    }
  }, [counter, totalQuestion, remainingTime]);

  return (
    <div className="word-scramble">
      {question ? (
        <>
          <small>Guess the word in</small>
          <CountdownTimer {...{ remainingTime, setRemainingTime }} />
          <h1>{question.word}</h1>
          <i>
            <strong>Hint:</strong>&nbsp;{question.definition}
          </i>
          <div>
            <form onSubmit={handleOnGuess} className="answer-form">
              <label htmlFor="answer">Your answer</label>
              <input
                type="text"
                id="answer"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                className="answer-input"
              />
              {isWrong && <small>Try again!</small>}
              <button type="submit" disabled={buttonDisabled}>
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p>Your score</p>
          <h1>{score}</h1>
          <button
            type="button"
            onClick={() => {
              setCounter(0);
              setRemainingTime(TIMER);
            }}
          >
            Try Again!
          </button>
        </>
      )}
    </div>
  );
}

export default App;
