import c from './colors.js';
import questions from './questions.js';
import { clearScreen, divider, prompt } from './utils.js';

const QUESTION_TIME = 15;
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const gameState = {
  score: 0,
  results: [],
  timerInterval: null,
  timeLeft: QUESTION_TIME,
};

function stopTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
}

function displayWelcome() {
  clearScreen();
  console.log(`\n${c.bold}${c.cyan}`);
  console.log('  #====================================#');
  console.log('  |         T R I V I A  !!!           |');
  console.log('  |      Test your knowledge.          |');
  console.log('  |      Beat the clock.               |');
  console.log(`  #====================================#${c.reset}`);

  console.log(`\n  ${c.bold}How to Play:${c.reset}`);
  console.log(`  ${c.dim}•  ${questions.length} questions across multiple topics${c.reset}`);
  console.log(`  ${c.dim}•  ${QUESTION_TIME} seconds to answer each question${c.reset}`);
  console.log(`  ${c.dim}•  Type A, B, C, or D then press Enter${c.reset}`);
  console.log(`  ${c.dim}•  Unanswered questions count as wrong${c.reset}\n`);
  divider();
}

function displayQuestion(q, index) {
  clearScreen();
  const header = [
    `${c.bold}${c.cyan}TRIVIA${c.reset}`,
    `${c.dim}Question ${index + 1} of ${questions.length}${c.reset}`,
    `${c.cyan}${c.bold}Score: ${gameState.score}${c.reset}`,
  ].join(`  ${c.dim}|${c.reset}  `);

  console.log(`\n  ${header}\n`);
  divider();
  console.log(`\n  ${c.bold}${c.magenta}[ ${q.category} ]${c.reset}`);
  console.log(`\n  ${c.bold}${c.yellow}${q.question}${c.reset}\n`);

  for (let i = 0; i < q.options.length; i++) {
    console.log(`  ${c.cyan}${c.bold} ${OPTION_LABELS[i]}.${c.reset}  ${q.options[i]}`);
  }

  console.log();
  divider();
  console.log(`  ${c.dim} You have ${QUESTION_TIME} seconds — enter A, B, C, or D:${c.reset}`);
  divider();
  process.stdout.write('  > ');
}

function getAnswerWithTimer(rl) {
  return new Promise((resolve) => {
    let resolved = false;
    gameState.timeLeft = QUESTION_TIME;

    gameState.timerInterval = setInterval(() => {
      gameState.timeLeft--;

      if (gameState.timeLeft === 5) {
        process.stdout.write(`\n\n  ${c.yellow}${c.bold}  5 seconds left!${c.reset}\n  > `);
      }

      if (gameState.timeLeft <= 0) {
        stopTimer();
        if (!resolved) {
          resolved = true;
          process.stdout.write(`\n\n  ${c.red}${c.bold}  Time's up!${c.reset}\n`);
          resolve(null);
        }
      }
    }, 1000);

    rl.once('line', (input) => {
      if (!resolved) {
        stopTimer();
        resolved = true;
        resolve(input.trim().toUpperCase());
      }
    });
  });
}

function processAnswer(input, q) {
  const validInputs = ['A', 'B', 'C', 'D'];
  if (!validInputs.includes(input)) {
    return { isCorrect: false, invalidInput: true, chosenIndex: -1 };
  }
  const chosenIndex = OPTION_LABELS.indexOf(input);
  const isCorrect = chosenIndex === q.correctIndex;
  return { isCorrect, invalidInput: false, chosenIndex };
}

function displayFeedback(result, q, timedOut) {
  const correctAnswer = `${OPTION_LABELS[q.correctIndex]}. ${q.options[q.correctIndex]}`;
  console.log();
  divider('─', 52);

  if (timedOut || result.invalidInput) {
    const reason = timedOut ? 'Time expired!' : `Invalid input.`;
    console.log(`\n  ${c.red}${c.bold}✗  ${reason}${c.reset}`);
    console.log(`  ${c.dim}Correct answer: ${c.reset}${c.green}${c.bold}${correctAnswer}${c.reset}`);
  } else if (result.isCorrect) {
    console.log(`\n  ${c.green}${c.bold} Correct! Well done.${c.reset}`);
  } else {
    console.log(`\n  ${c.red}${c.bold} Incorrect.${c.reset}`);
    console.log(`  ${c.dim}Correct answer: ${c.reset}${c.green}${c.bold}${correctAnswer}${c.reset}`);
  }
  console.log();
}

function displayResults() {
  clearScreen();
  const total = questions.length;
  const pct = Math.round((gameState.score / total) * 100);

  let grade;
  if (pct >= 90) grade = `${c.cyan}Outstanding!!!${c.reset}`;
  else if (pct >= 75) grade = `${c.green}Great job!${c.reset}`;
  else if (pct >= 60) grade = `${c.yellow}Not bad, keep going!${c.reset}`;
  else if (pct >= 40) grade = `${c.yellow}Keep practicing!${c.reset}`;
  else grade = `${c.red}Don't give up, try again!${c.reset}`;

  console.log(`\n${c.bold}${c.cyan}`);
  console.log('  #====================================#');
  console.log('  |          GAME COMPLETE!            |');
  console.log(`  #====================================#${c.reset}\n`);
  console.log(`  ${c.bold}Final Score:${c.reset}  ${c.cyan}${c.bold}${gameState.score} / ${total}${c.reset}  (${pct}%)`);
  console.log(`  ${c.bold}Grade:${c.reset}        ${grade}\n`);
  divider('=', 52);

  const correctResults = gameState.results.filter(r => r.correct);
  const incorrectResults = gameState.results.filter(r => !r.correct);

  console.log(`\n  ${c.bold}${c.green} Correct (${correctResults.length})${c.reset}`);
  if (correctResults.length === 0) {
    console.log(`    ${c.dim}None${c.reset}`);
  } else {
    correctResults
      .map((r, i) => `  ${c.green}${c.bold} ${i + 1}.${c.reset} ${c.dim}${r.question}${c.reset}`)
      .forEach(line => console.log(line));
  }

  console.log(`\n  ${c.bold}${c.red} Incorrect / Missed (${incorrectResults.length})${c.reset}`);
  if (incorrectResults.length === 0) {
    console.log(`    ${c.dim}None, perfect score!${c.reset}`);
  } else {
    incorrectResults
      .map(r => 
        `  ${c.red}X${c.reset} ${c.dim}${r.question}${c.reset}\n` +
        `    ${c.gray}Your answer: ${r.yourAnswer}${c.reset}\n` +
        `    ${c.green}Correct:     ${r.rightAnswer}${c.reset}`
      )
      .forEach(line => console.log(line));
  }
  console.log();
  divider('═', 52);
}

function resetGameState() {
  gameState.score = 0;
  gameState.results = [];
}

export async function runGame(rl) {
  displayWelcome();
  await prompt(rl, `\n  Press ${c.cyan}ENTER${c.reset} to begin...\n  > `);

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    displayQuestion(q, i);

    const input = await getAnswerWithTimer(rl);
    const timedOut = input === null;

    let result = { isCorrect: false, invalidInput: false, chosenIndex: -1 };
    let yourAnswer = 'No answer (time expired)';

    if (!timedOut) {
      result = processAnswer(input, q);
      if (result.invalidInput) {
        yourAnswer = `Invalid input: "${input}"`;
      } else {
        yourAnswer = `${input}. ${q.options[result.chosenIndex]}`;
      }
    }

    if (result.isCorrect) {
      gameState.score++;
    }

    gameState.results.push({
      question: q.question,
      correct: result.isCorrect,
      yourAnswer: yourAnswer,
      rightAnswer: `${OPTION_LABELS[q.correctIndex]}. ${q.options[q.correctIndex]}`
    });

    displayFeedback(result, q, timedOut);

    if (i < questions.length - 1) {
      await prompt(rl, `  Press ${c.cyan}ENTER${c.reset} for the next question...\n  > `);
    }
  }

  displayResults();

  const again = await prompt(rl, `  Play again? (${c.cyan}y${c.reset}/${c.dim}n${c.reset}): `);

  if (again.trim().toLowerCase() === 'y') {
    resetGameState();
    rl.removeAllListeners('line');
    await runGame(rl);
  } else {
    console.log(`\n  ${c.cyan}${c.bold}Thanks for playing Trivia! Goodbye.${c.reset}\n`);
    rl.close();
    process.exit(0);
  }
}