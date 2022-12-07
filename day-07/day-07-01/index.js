const fs = require('fs')
const path = require('path')

const main = () => {
  const rawInput = fs.readFileSync(path.join(__dirname, './inputs/inputs-02.txt'), 'utf-8');

  const cmdOutput = rawInput.split("\n");

  let currentPath = [];
  const folders = [];
  cmdOutput.forEach((blockCmd) => {
    const [a,b,c] = blockCmd.split(" ");
    if(a === "$" && b === "cd"){ //If is a cd command
      if(c === "/"){
        currentPath = ["/"]; // Return to root
      }else if(c === ".."){
        currentPath.splice(currentPath.length-1, 1); // Remove level
      }else{
        currentPath.push(`${c}/`); // Enter level
      }
    }

    else if(a === "$" && b === "ls"){ //If is a ls command
      folders.push({
        path: currentPath.join(""),
        size: 0,
        children: []
      })
    }

    else { //If is a file or dir info
      if(a === "dir"){ //If is dir
        const folder = folders.find((x) => x.path === currentPath.join(""));
        folder.children.push({
          tyee: "D",
          name: b,
          size: 0
        })
      }
      else { //If is file
        const folder = folders.find((x) => x.path === currentPath.join(""));
        folder.children.push({
          type: "F",
          name: b,
          size: parseInt(a, 10)
        })
      }
    }
  })

  const getFolderSize = (folder) => {
    let totalFolderSize = 0;
    folder.children.forEach((child) => {
      if(child.type === "F"){
        totalFolderSize += child.size;
      }else{
        const childFolder = folders.find((x) => x.path === (folder.path + `${child.name}/`));
        child.size = getFolderSize(childFolder);
        childFolder.size = child.size;
        totalFolderSize += child.size; 
      }
    })
    folder.size = totalFolderSize;
    return totalFolderSize;
  }

  const totalSize = getFolderSize(folders[0]); //Calculate all the folders size

  // Get the folders that are small than the value
  // Map to numbers
  // Sum
  console.info(folders.filter((x) => x.size <= 100000).map((x) => x.size).reduce((a, b) => a + b, 0));
}
main();