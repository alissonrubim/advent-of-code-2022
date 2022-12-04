const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const repeatedItems = [];

  const backpacks = rawInput.split("\n").map((x) => x.split(""))
  backpacks.forEach((bp) => {
    const p1 = bp.slice(0, bp.length/2);
    const p2 = bp.slice(bp.length/2, bp.length);
    repeatedItems.push(p1.find((item) => p2.includes(item)));
  });

  const prio = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  console.info(repeatedItems.map((x) => prio.indexOf(x) + 1).reduce((a, b) => a + b, 0))
}
main();

