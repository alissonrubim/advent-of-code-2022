const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const inputLines = rawInput.split("\n");
  const bodyHeaderSplitIndex = inputLines.indexOf("");
  const inputHeader = inputLines.slice(0, bodyHeaderSplitIndex);
  const inputbody = inputLines.slice(bodyHeaderSplitIndex+1, inputLines.length); 


  const containerRows = [];
  inputHeader[inputHeader.length-1].split("").forEach((t, ti) => {
    if(t && t !== " "){
      const containerRowIndex = parseInt(t);
      containerRows[containerRowIndex-1] = [];
      for(var i = inputHeader.length-2; i >= 0; i--){
        const containerLetter = inputHeader[i].split("")[ti];
        if(containerLetter && containerLetter !== " ")
        containerRows[containerRowIndex-1].push(containerLetter)
      }
    }
  })

  inputbody.forEach((cmd) => {
    const regex = /move (\d*) from (\d*) to (\d*)/g;
    const regexResult = regex.exec(cmd);
    
    const quantity = parseInt(regexResult[1], 10);
    const fromIndex = parseInt(regexResult[2], 10) - 1;
    const toIndex = parseInt(regexResult[3], 10) - 1;

    const removed = containerRows[fromIndex].splice(containerRows[fromIndex].length - quantity, containerRows[fromIndex].length);
    containerRows[toIndex] = [...containerRows[toIndex], ...removed];
  })

  let result = "";
  containerRows.forEach((containers) => {
    result += containers[containers.length-1]
  })
  console.info(result);
}
main();