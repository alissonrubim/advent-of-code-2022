const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const prio = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  const groupsBackpages = []
  const backpacks = rawInput.split("\n").map((x) => x.split(""));
  backpacks.forEach((bp,  bgI) => {
    if(bgI % 3 === 0)
      groupsBackpages.push([])
    groupsBackpages[groupsBackpages.length-1].push(bp)
  });

  console.info(groupsBackpages.map((g) => {
    const commonItem = g[0].find((item) => g[1].includes(item) && g[2].includes(item));
    return prio.indexOf(commonItem) + 1
  }).reduce((a, b) => a + b, 0))
}
main();

