const questions = [
  {
    category:     'JavaScript',
    question:     'Which method adds one or more elements to the END of an array and returns the new length?',
    options:      ['unshift()', 'push()', 'concat()', 'splice()'],
    correctIndex: 1
  },
  {
    category:     'JavaScript',
    question:     'What does the typeof operator return when used on an array?',
    options:      ["'array'", "'list'", "'object'", "'undefined'"],
    correctIndex: 2
  },
  {
    category:     'JavaScript',
    question:     'Which keyword declares a block-scoped variable that CAN be reassigned?',
    options:      ['var', 'const', 'let', 'static'],
    correctIndex: 2
  },
  {
    category:     'JavaScript',
    question:     'Which array method returns a NEW array of elements that pass a test function?',
    options:      ['find()', 'forEach()', 'filter()', 'reduce()'],
    correctIndex: 2
  },
  {
    category:     'JavaScript',
    question:     'What value does a function return by default if no return statement is written?',
    options:      ['null', '0', 'false', 'undefined'],
    correctIndex: 3
  },
  {
    category:     'HTML',
    question:     'Which HTML tag links an external CSS stylesheet to a webpage?',
    options:      ['<style>', '<link>', '<script>', '<ref>'],
    correctIndex: 1
  },
  {
    category:     'HTML',
    question:     'What does the "alt" attribute on an <img> tag provide?',
    options:      [
      'Sets the image file path',
      'Adds a click event to the image',
      'Alternative text for accessibility and broken images',
      'Controls the image display size'
    ],
    correctIndex: 2
  },
  {
    category:     'CSS',
    question:     'Which CSS property controls the space INSIDE an element, between its content and its border?',
    options:      ['margin', 'border-spacing', 'padding', 'gap'],
    correctIndex: 2
  },
  {
    category:     'CSS',
    question:     'What does "display: flex" do to an element?',
    options:      [
      'Hides the element from the page',
      'Makes the element fill the full viewport',
      'Enables the Flexbox layout model on the container',
      'Stacks all child elements vertically only'
    ],
    correctIndex: 2
  },
  {
    category:     'Programming',
    question:     'What is the main purpose of a version control system like Git?',
    options:      [
      'To compile and run code automatically',
      'To track code changes and enable collaboration',
      'To connect a program to the internet',
      'To manage database records'
    ],
    correctIndex: 1
  }
];

export default questions;