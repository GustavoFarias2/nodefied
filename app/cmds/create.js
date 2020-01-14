
// Importing pastes and the files content
import pastes from './files.js';

// Import mkdir funcition
import mkDirs from './functions.js';

import child_process from 'child_process';

export function create(rl) {

  // Setting server name
  rl.question(`\n Your \x1b[1mProject Name\x1b[0m please(default => \x1b[1mserver\x1b[0m): `, (res) => {
    const name = res != "" ? res : "server";

    // Setting server port
    rl.question(` \x1b[1mServer Port\x1b[0m(default => \x1b[1m3000\x1b[0m): `, (res) => {
      const port = res != "" ? parseInt(res) : 3000;

      // Start to create the pastes
      console.log(`\n \x1b[1m\x1b[34mcreating:\x1b[0m \x1b[1m${name}\x1b[0m \n`);

      // Making dirs and content
      mkDirs(pastes).then(() => {

        child_process.execSync(`cd ./${name} && npm install express cors body-parser mysql`, { stdio: [0, 1, 2] });
        // Console completed message
        console.log(` Server ${name} created! do "cd ./${name} && node server" to run\n`);
        // Close readline
        rl.close();

      }).catch((err) => console.log(err));
    })
  })

}