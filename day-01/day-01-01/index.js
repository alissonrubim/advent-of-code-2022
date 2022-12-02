const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');
  
  const elves = [];
  rawInput.split("\n").forEach(line => {
    if(line === "")
      elves.push([])
    else{
      if(elves[elves.length-1] === undefined)
        elves.push([])
      elves[elves.length-1].push(parseInt(line, 10))
    }
  });

  console.info(Math.max.apply(null, elves.map((elve) => elve.reduce((b, a) => b + a, 0))))
}
main();