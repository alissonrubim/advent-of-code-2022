const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const elfPairs = rawInput.split('\n').map((line) => {
    return line.split(",").map((p) => p.split("-").map((x) => parseInt(x, 10)))
  })

  console.info(elfPairs.reduce((b, c) => {
    const [a1, a2] = c[0];
    const [b1, b2] = c[1];
    if(b1 - a1 >= 0){
      if(b1 >= a1 && b1 <= a2){
        return b+1
      }
    }else{
      if(a1 >= b1 && a1 <= b2){
        return b+1
      }
    }
    return b
  }, 0))
}
main();

