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

function printProblem (x , y) {
  return x + '+' + y;
}

function createProblem (arr) {
  let prob = [];
  for(let i = 0; i < 2; i++) {
    prob.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return prob;
}  

function Quiz () {
  const [submission, setSubmission] = useState('');
  const [problem, setProblem] = useState(createProblem(nums));
  const question = printProblem(problem[0], problem[1]);

  function submitIt() {
    if (problem[0] + problem[1] == submission) {
      console.log('Correct! ' + problem[0] + ' + ' + problem[1] + ' = ' + submission )
    } else {
      console.log('Incorrect! ' + problem[0] + ' + ' + problem[1] + ' != ' + submission + ' Correct Answer: ' + (problem[0] + problem[1]))
    }
    newProblem();
    setSubmission('');
  }

  function newProblem() {
    setProblem(createProblem(nums));
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      submitIt();
    }
  }

  return (
    <>
      <div className="flex justify-center relative">
        <div className="bg-white max-w-sm p-4 rounded-md flex flex-col items-center space-y-4">
          <p className="text-8xl font-expose">{question}</p>
          {/* Question can be like the text boxes in game */}
          <input 
            className="border-2 border-black" 
            value={submission}
            onChange={e => setSubmission(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Style the input box ^ to look like the responses you can give in the game */}
          <div className="relative">
            <CoolButton 
              onClick={submitIt} /> 
          </div>
          {/* Cool button on submit creates: a new problem and +1 or -1 if answer is correct*/}
        </div>
      </div>
    </>
  )
}

export default Quiz;