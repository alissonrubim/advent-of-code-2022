const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const rawInputRows = rawInput.split("\n");
  const map = rawInputRows.map((x) => x.split("").map((y) => parseInt(y, 10)));

  let count = (map.length * 2)+ ((map[0].length - 2) * 2);

  for(let rowIndex = 1; rowIndex < map.length -1; rowIndex ++){
    const rowValue = map[rowIndex];
    for(let colIndex = 1; colIndex < map[rowIndex].length -1; colIndex++){
      const colValue = rowValue[colIndex];
      if(
        rowValue.filter((x, xi) => xi < colIndex).find((x) => x >= colValue) === undefined || //for left 
        rowValue.filter((x, xi) => xi > colIndex).find((x) => x >= colValue) === undefined || //for right
        map.filter((x, xi) => (xi < rowIndex)).find((x) => x[colIndex] >= colValue) === undefined || //for top
        map.filter((x, xi) => (xi > rowIndex)).find((x) => x[colIndex] >= colValue) === undefined //for bottom
      )
        count++;
    }
  }

  console.info(count)
}
main();