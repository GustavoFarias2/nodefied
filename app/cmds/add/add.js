
// Importing FileSystem to create pastes and files
import fs from 'fs';

// Function for add something to the project
export function add(rl) {

  // Asking what the user want to add
  rl.question(`
  \x1b[1mWhat you need to\x1b[0m \x1b[1m\x1b[32mAdd\x1b[0m\x1b[1m?
  entity,
  rout (post, get, put, delete),\x1b[0m

`, (res) => {

    console.log(res)

  })

}