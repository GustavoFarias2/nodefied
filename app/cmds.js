
import { create } from './cmds/create/create.js';
import { add } from './cmds/add/add.js';

// Commands for the application
export default function commands() {

  const cmds = {

    // Empty command
    '': (rl) => rl.close(),

    help(rl) {
      // Writting controls
      console.log('\n \x1b[1m\x1b[32mNodefied commands \x1b[0m>');
      Object.keys(cmds).forEach((cmd) => cmd != '' && console.log(" " + cmd + ", "));
      // Closing 
      setTimeout(() => rl.close(), 100);
    },

    create,

    add,

  };

  return cmds;

}