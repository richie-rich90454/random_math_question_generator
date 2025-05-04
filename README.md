# Random Math Question Generator
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
A free online math question generator that allows students to practice algebra, calculus, trigonometry, and more with instant answer verification.
## Features
* Generate unlimited questions across 20+ math topics:
  * Addition, Subtraction, Multiplication, Division
  * Roots
  * Differentiation, Integration
  * Matrix and Vector operations
  * Trigonometric functions (sin, cos, tan, etc.)
  * Logarithms, Exponentials
  * Factorials, Permutations, Combinations
* Instant answer checking
* Responsive design for desktop and mobile
* Random quote of the day
## Technology
* **Frontend**: HTML5, CSS3 (custom properties), JavaScript (ES6), [MathJax](https://www.mathjax.org/) for rendering math notation, jQuery
* **Backend**: Node.js with [Fastify](https://www.fastify.io/) for serving static files and handling errors
* **License**: Apache License 2.0
* **License**: Noto Sans (SIL Open Font License, see [OFL-Noto_Sans.txt](OFL-Noto_Sans.txt))
## Prerequisites
* [Node.js](https://nodejs.org/) v14+ installed
* npm (comes with Node.js)
## Installation
```bash
git clone https://github.com/richie-rich90454/random_math_question_generator.git
cd random_math_question_generator
npm install
```
## Usage
```bash
node server.js
```
Start the server and open [http://localhost:1331](http://localhost:1331) in your browser. Select a question type, click "Generate Question", enter your answer, and click "Check Answer" (or press `Shift+Enter`) to verify.
## Project Structure
```
.
├── index.html          # Main HTML file for the frontend
├── script.js           # Frontend logic for generating questions and checking answers
├── jquery-3.7.1.js     # jQuery library for DOM manipulation
├── favicon.png         # Site favicon and preview image
├── server.js            # Fastify server setup and configuration
├── package.json        # Project metadata and npm scripts
├── LICENSE             # Apache License 2.0
└── node_modules/       # npm dependencies
```
## License
This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.