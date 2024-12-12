import { useEffect, useState } from "react";
import StartMenu from "./StartMenu";
import CoolButton from "./CoolButton";
import Timer from "./Timer";

/*
  Problem Object?
  problem {
    type: addition or subtraction,
    num1: random number from json #1,
    num2: random number from json #2,
    addSolution: num1 + num2,
    subSolution: num1 - num2,
    print: num1 + type + num2
  }
*/
const nums = [5, 10, 15, 20, 25, 8, 23, 9, 7, 13];

function printProblem(x, y) {
  return x + "+" + y;
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
  const [score, setScore] = useState(0);
  const [answerLog, setAnswerLog] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const question = printProblem(problem[0], problem[1]);

  function startQuiz() {
    setIsQuizStarted(true);
    setIsQuizActive(true);
  }

  function restartQuiz() {
    handleHighScore();
    setIsQuizStarted(false);
    setIsQuizActive(true);
    setSubmission("");
    setProblem(createProblem(nums));
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
      alert("Game Over!");
      return;
    }

    if (problem[0] + problem[1] == submission) {
      console.log(
        "Correct! " + problem[0] + " + " + problem[1] + " = " + submission
      );
      setScore(score + 1);
      setFeedback("Correct! ✅");
      // change .push to use setAnswerLog
      answerLog.push(
        "Correct! " + problem[0] + " + " + problem[1] + " = " + submission
      );
    } else {
      console.log(
        "Incorrect! " +
          problem[0] +
          " + " +
          problem[1] +
          " != " +
          submission +
          " Correct Answer: " +
          (problem[0] + problem[1])
      );
      setFeedback("Incorrect! ❌");
      if (submission === "") {
        // change .push to use setAnswerLog
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
        // change .push to use setAnswerLog
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

    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 500);

    newProblem();
    setSubmission("");
  }

  function newProblem() {
    setProblem(createProblem(nums));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
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
          <div className="bg-white max-w-[300px] min-h-[400px] border-2 border-gray-200 p-4 rounded-md flex flex-col justify-center items-center relative mx-auto shadow-md shadow-red-950/50">
            <p className="text-8xl font-expose">{question}</p>
            <input
              className="border-2 border-black"
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              onKeyDown={handleKeyDown}
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
            <span className="text-3xl absolute top-3 left-3">♠</span>
            <span className="text-3xl absolute top-3 right-3">♥</span>
            <span className="text-3xl absolute left-3 bottom-3">♦</span>
            <span className="text-3xl absolute bottom-3 right-3">♣</span>
          </div>
          <ul>
            {answerLog.map((item, index) => (
              <li key={index}>
                {"Q" + (index + 1) + ": "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Quiz;
