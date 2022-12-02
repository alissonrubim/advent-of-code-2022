const { Console } = require('console');
const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-01.txt'), 'utf-8');

  const matchRules = [{
    Move: "ROCK",
    Beat: "SCISSORS",
    LoseFor: "PAPER",
  },{
    Move: "SCISSORS",
    Beat: "PAPER",
    LoseFor: "ROCK",
  },{
    Move: "PAPER",
    Beat: "ROCK",
    LoseFor: "SCISSORS"
  }]

  const movePoints = {
    "ROCK": 1,
    "PAPER": 2,
    "SCISSORS": 3
  }

  const matchPoints = {
    "LOSE": 0,
    "DRAW": 3,
    "WIN": 6
  }

  const convertRivalMove = (move) => move === "A" ? "ROCK" : (move === "B" ? "PAPER" : "SCISSORS")

  const convertExpectedResult = (move) => move === "X" ? "LOSE" : (move === "Y" ? "DRAW" : "WIN")

  const calculateMove = (rivalMove, expectedResult) => {
    if(expectedResult === "DRAW")
      return rivalMove    
    if(expectedResult === "WIN")
      return matchRules.find((x) => x.Move === rivalMove).LoseFor
    return matchRules.find((x) => x.Move === rivalMove).Beat
  }

  const playsLine = rawInput.split("\n");
  const plays = playsLine.map((line) => {
    return {
      RivalMove: convertRivalMove(line.split(" ")[0]),
      ExpectedResult: convertExpectedResult(line.split(" ")[1])
    }
  }).map((match) => {
    const move = calculateMove(match.RivalMove, match.ExpectedResult);
    return matchPoints[match.ExpectedResult] + movePoints[move]
  })

  console.info(plays.reduce((b, a) => b + a, 0))
}
main();

