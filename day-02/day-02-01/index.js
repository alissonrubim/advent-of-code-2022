const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-01.txt'), 'utf-8');

  const matchRules = {
    "ROCK" : "SCISSORS", // Rock beat Scissors
    "SCISSORS" : "PAPER", // Scissors beat Paper
    "PAPER" : "ROCK" // Paper beat Rock
  }

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

  const convertMyMove = (move) => move === "X" ? "ROCK" : (move === "Y" ? "PAPER" : "SCISSORS")

  const calculateMatch = (rivalMove, myMove) => {
    if(rivalMove === myMove)
      return "DRAW"
    else if(matchRules[myMove] === rivalMove)
      return "WIN"
    return "LOSE"
  }

  const playsLine = rawInput.split("\n");
  const plays = playsLine.map((line) => {
    return {
      RivalMove: convertRivalMove(line.split(" ")[0]),
      MyMove: convertMyMove(line.split(" ")[1])
    }
  }).map((match) => {
    const result = calculateMatch(match.RivalMove, match.MyMove);
    return matchPoints[result] + movePoints[match.MyMove]
  })

  console.info(plays.reduce((b, a) => b + a, 0))
}
main();

