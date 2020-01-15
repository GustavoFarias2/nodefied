#!/usr/bin/env node

// Importing readline and using it to write and read console
import readeline from 'readline';
const rl = readeline.createInterface({ input: process.stdin, output: process.stdout });

// Importing the commands from cmds
import commands from './app/cmds.js';

rl.question(`
    \x1b[1m___\x1b[0m\x1b[31m___________________________\x1b[0m\x1b[1m 
   \x1b[1m/  \x1b[0m\x1b[31m/ /| |   / ________________/\x1b[0m\x1b[1m
  \x1b[1m/  \x1b[0m\x1b[33m/ / | |  / /\x1b[0m\x1b[1m                |
 \x1b[1m|  \x1b[0m\x1b[32m/ /  | | / /\x1b[0m\x1b[1m  \x1b[1m\x1b_____  ___ __\x1b[0m\x1b[1m   |
 \x1b[1m| \x1b[0m\x1b[36m/ /   | |/ /\x1b[0m\x1b[1m  \x1b[1m\x1b||_ || ||_ || |\x1b[0m\x1b[1m  |
 \x1b[1m|\x1b[0m\x1b[34m/ /    |   /\x1b[0m\x1b[1m   \x1b[1m\x1b||  || ||__||_/\x1b[0m\x1b[1m  /
 \x1b[0m\x1b[35m|_|\x1b[0m\x1b[1m_____\x1b[0m\x1b[35m|__|\x1b[0m\x1b[1m___________________/

  \x1b[1m\x1b[32mWelcome to NodeFied\x1b[0m
  \x1b[1m\x1b[4mWhat you wanna do? (help to see the commands)\x1b[0m

  Actual version 1.0.1

`, (res) => commands()[res](rl));