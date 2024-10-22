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

function tester () {
  console.log('hello');
}

function Quiz () {
  let problem = createProblem(nums);
  let question = printProblem(problem[0], problem[1]);
  

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white max-w-sm p-4 rounded-md flex flex-col items-center space-y-4">
          <p className="text-8xl font-expose">{question}</p>
          <input type="text" className="border-2 border-black" />
          <CoolButton /> 
          {/* Cool button on submit creates: a new problem and +1 or -1 if answer is correct*/}
        </div>
      </div>
    </>
  )
}

export default Quiz;