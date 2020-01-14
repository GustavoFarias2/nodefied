
// Importing FileSystem to create pastes and files
import fs from 'fs';

// Funcition for create dirs and content
export default function mkDirs(pastes) {

  // Start creating
  return new Promise((resolve, reject) => mkdir(pastes).then(() => resolve()).catch((err) => reject(err)));

}

async function mkdir(paste) {

  await console.log(' \x1b[33mcreating paste:\x1b[0m ' + paste['name']);
  // Creating dir
  await fs.mkdir(paste['name'], () => {

    // Writing files
    paste['files'].forEach((file) => {
      console.log(' \x1b[32mcreating file:\x1b[0m ' + file['name']);
      fs.writeFile(file['name'], file['content'], (err) => err && console.log(err))
    });

    // Recursive creating paste
    paste['pastes'].forEach((dir) => {
      mkdir(dir)
    });

  });

}