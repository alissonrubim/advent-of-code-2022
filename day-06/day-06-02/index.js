const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-06.txt'), 'utf-8');

  const allChars = rawInput.split("");
  const validChars = []
  allChars.forEach((char, charIndex) => {
    if(validChars.length >= 14){
      const lastChars = validChars.filter((c, ci) => ci >= validChars.length - 14);

      if(lastChars.filter((c, ci) => lastChars.indexOf(c) === ci).length === lastChars.length)
        return;
    }
    validChars.push(char);
  })

  console.info(validChars.length)
}
main();