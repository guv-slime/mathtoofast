import { useEffect, useState } from "react";
import StartMenu from "./StartMenu";
import CoolButton from "./CoolButton";
import Timer from "./Timer";
import Logs from "./Logs";
import QuizCard from "./QuizCard";

const nums = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
];

function printProblem(x, y, probType) {
  if (probType === "+") {
    return x + "+" + y;
  } else {
    return x + "-" + y;
  }
}

function createProblem(arr) {
  let prob = [];
  for (let i = 0; i < 2; i++) {
    prob.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return prob;
}

function Quiz() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [submission, setSubmission] = useState("");
  const [problem, setProblem] = useState(createProblem(nums));
  const [problemType, setProblemType] = useState("+");
  const [score, setScore] = useState(0);
  const [answerLog, setAnswerLog] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const question = printProblem(problem[0], problem[1], problemType);

  function addOrSubtract() {
    if (Math.floor(Math.random() * 2) === 0) {
      setProblemType("+");
    } else {
      setProblemType("-");
    }
  }

  function startQuiz() {
    setIsQuizStarted(true);
    setIsQuizActive(true);
  }

  function restartQuiz() {
    handleHighScore();
    setIsQuizStarted(false);
    setIsQuizActive(true);
    setSubmission("");
    newProblem();
    setScore(0);
    setAnswerLog([]);
  }

  const handleTimeUp = () => {
    setIsQuizActive(false);
  };

  const handleHighScore = () => {
    if (highScore < score) {
      setHighScore(score);
    }
  };

  function submitIt() {
    if (!isQuizActive) {
      alert("Time's Up! Score: " + score);
      return;
    }

    // ADDITION TYPE
    if (problemType === "+") {
      if (problem[0] + problem[1] == submission) {
        setScore(score + 1);
        setFeedback("Correct! ✅");
        answerLog.push(
          "Correct! " + problem[0] + " + " + problem[1] + " = " + submission
        );
      } else {
        setFeedback("Incorrect! ❌");
        if (submission === "") {
          answerLog.push(
            "Incorrect! " +
              problem[0] +
              " + " +
              problem[1] +
              " = No Input! |" +
              " Correct Answer: " +
              (problem[0] + problem[1])
          );
        } else {
          answerLog.push(
            "Incorrect! " +
              problem[0] +
              " + " +
              problem[1] +
              " = " +
              submission +
              " | Correct Answer: " +
              (problem[0] + problem[1])
          );
        }
      }
    } else {
      // SUBTRACTION TYPE
      if (problem[0] - problem[1] == submission) {
        setScore(score + 1);
        setFeedback("Correct! ✅");
        answerLog.push(
          "Correct! " + problem[0] + " - " + problem[1] + " = " + submission
        );
      } else {
        setFeedback("Incorrect! ❌");
        if (submission === "") {
          answerLog.push(
            "Incorrect! " +
              problem[0] +
              " - " +
              problem[1] +
              " = No Input! |" +
              " Correct Answer: " +
              (problem[0] - problem[1])
          );
        } else {
          answerLog.push(
            "Incorrect! " +
              problem[0] +
              " - " +
              problem[1] +
              " = " +
              submission +
              " | Correct Answer: " +
              (problem[0] - problem[1])
          );
        }
      }
    }

    // end of submitIt()
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 500);

    newProblem();
    setSubmission("");
  }

  function newProblem() {
    addOrSubtract();
    setProblem(createProblem(nums));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      submitIt();
    }
  }

  return (
    <>
      {!isQuizStarted ? (
        <StartMenu onClick={startQuiz} highScore={highScore} />
      ) : (
        <div>
          <Timer onTimeUp={handleTimeUp} />
          <QuizCard>
            <p className="text-8xl font-expose">{question}</p>
            <input
              autoFocus
              className="border-2 border-black"
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              onKeyDown={handleKeyDown}
              pattern="^-?[0-9]*$"
              inputMode="numeric"
              placeholder="Enter/Space to Submit"
            />
            <div className="font-arsenal uppercase text-center">
              <p className="text-2xl">Score: {score}</p>
              {feedback && (
                <span
                  className={`absolute bottom-[10rem] text-xl rotate-[-7deg] left-1/2 -translate-x-1/2 p-1 rounded-lg bg-black uppercase font-arsenal transition-opacity ${
                    isVisible ? "opacity-100" : "opacity-0"
                  } ${
                    feedback.includes("Correct")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {feedback}
                </span>
              )}
            </div>
            {isQuizActive ? (
              <div className="relative">
                <CoolButton onClick={submitIt} buttonLabel={"Submit"} />
              </div>
            ) : (
              <div className="relative">
                <CoolButton onClick={restartQuiz} buttonLabel={"New Game"} />
              </div>
            )}
          </QuizCard>
          {answerLog.length > 0 && <Logs answerLog={answerLog} />}
        </div>
      )}
    </>
  );
}

export default Quiz;
