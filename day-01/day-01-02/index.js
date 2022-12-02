const fs = require('fs')
const path = require('path')

const main = () => {
  // Collect inputs
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');
  
  // Add all the elves data in the array
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

  // Transform the elves array in a array with the calories sum for each elf
  const elvesSumArr = elves.map((elve) => elve.reduce((b, a) => b + a, 0));

  let topElvesMax = 0;
  for(let i=0; i<3; i++){
    const maxValue = Math.max.apply(null, elvesSumArr); // Get the maximum value
    topElvesMax += maxValue;
    elvesSumArr.splice(elvesSumArr.indexOf(maxValue), 1); // Remove this value from the array
  }

  console.info(topElvesMax);
}
main();