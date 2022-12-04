const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const elfPairs = rawInput.split('\n').map((line) => {
    return line.split(",").map((p) => p.split("-").map((x) => parseInt(x, 10)))
  })

  console.info(elfPairs.reduce((b, c) => {
    const elf1 = c[0];
    const elf2 = c[1];
    if(elf1[1]-elf1[0] >= elf2[1]-elf2[0]){
      if(elf2[0] >= elf1[0] && elf2[1] <= elf1[1])
        return b+1
    }else{
      if(elf1[0] >= elf2[0] && elf1[1] <= elf2[1])
        return b+1
    }
    return b
  }, 0))
}
main();

