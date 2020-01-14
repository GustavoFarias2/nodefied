
import { create } from './cmds/create.js'

// Commands for the application
export default function commands() {

  const cmds = {

    // Empty command
    '': (rl) => rl.close(),

    help(rl) {
      // Writting controls
      Object.keys(cmds).forEach((cmd) => rl.write(" " + cmd + "\n"));
      // Closing 
      setTimeout(() => rl.close(), 100);
    },

    create,

  };

  return cmds;

}