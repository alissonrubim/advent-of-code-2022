const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const rawInputRows = rawInput.split("\n");
  const map = rawInputRows.map((x) => x.split("").map((y) => parseInt(y, 10)));

  let count = (map.length * 2)+ ((map[0].length - 2) * 2);


  const countView = (treeValue, treesArray) => {
    let isBlockingView = false
    return treesArray.filter((x) => {
      if(!isBlockingView){
        if(x >= treeValue){
          isBlockingView = true;
          return true;
        }
        return true;
      }
    }).length 
  } 

  let maxScore = 0;
  for(let rowIndex = 1; rowIndex < map.length -1; rowIndex ++){
    const rowValue = map[rowIndex];
    for(let colIndex = 1; colIndex < map[rowIndex].length -1; colIndex++){
      const colValue = rowValue[colIndex];

      const left = countView(colValue, rowValue.filter((x, xi) => xi < colIndex).reverse())
      const right = countView(colValue, rowValue.filter((x, xi) => xi > colIndex))
      const top  = countView(colValue, map.filter((x, xi) => (xi < rowIndex)).map((x) => x[colIndex]).reverse())
      const bottom = countView(colValue, map.filter((x, xi) => (xi > rowIndex)).map((x) => x[colIndex]))

      const score = left * right * top * bottom;
      if(score > maxScore)
        maxScore = score;

      // const right = rowValue.filter((x, xi) => xi > colIndex).filter((x) => x >= colValue).length
      // const top  = map.filter((x, xi) => (xi < rowIndex)).filter((x) => x[colIndex] >= colValue).length
      // const bottom =  map.filter((x, xi) => (xi > rowIndex)).filter((x) => x[colIndex] >= colValue).length
    }
  }

  console.info(maxScore)
}
main();