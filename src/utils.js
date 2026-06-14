import c from './colors.js';

export function clearScreen() {
  process.stdout.write('\x1Bc');
}

export function divider(char = '─', len = 52) {
  console.log(c.dim + char.repeat(len) + c.reset);
}

export function prompt(rl, text) {
  return new Promise(resolve => rl.question(text, resolve));
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}