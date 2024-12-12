import { useEffect, useState } from "react";
import CoolButton from "./CoolButton";

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
  const [submission, setSubmission] = useState("");
  const [problem, setProblem] = useState(createProblem(nums));
  const [score, setScore] = useState(0);
  const [answerLog, setAnswerLog] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const question = printProblem(problem[0], problem[1]);

  function submitIt() {
    if (problem[0] + problem[1] == submission) {
      console.log(
        "Correct! " + problem[0] + " + " + problem[1] + " = " + submission
      );
      setScore(score + 1);
      setFeedback("Correct! ✅");
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

    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 400);

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
      <div className="flex justify-center relative">
        <div className="bg-white max-w-sm p-4 rounded-md flex flex-col items-center space-y-4">
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
                className={`absolute bottom-[8rem] text-3xl rotate-[-9deg] left-1/2 -translate-x-1/2 p-1 rounded-lg bg-black uppercase font-arsenal transition-opacity ${
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
          <div className="relative">
            <CoolButton onClick={submitIt} />
          </div>
        </div>
      </div>
      <ul>
        {answerLog.map((item, index) => (
          <li key={index}>
            {"Q" + (index + 1) + ": "}
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Quiz;
