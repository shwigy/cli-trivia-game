import readline from 'readline';
import { runGame } from './src/game.js';
import c from './src/colors.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Run game execution engine loop
runGame(rl).catch(err => {
  console.error(`\n  ${c.red}Unexpected error:${c.reset}`, err);
  rl.close();
  process.exit(1);
});