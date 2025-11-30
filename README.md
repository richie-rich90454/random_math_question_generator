# Random Math Question Generator available at [math.richardsblogs.com](https://math.richardsblogs.com)
# Random Math Question Generator 🧮

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/richie-rich90454/random_math_question_generator?style=social)](https://github.com/richie-rich90454/random_math_question_generator)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://math.richardsblogs.com/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

A comprehensive, free online math question generator that helps students practice algebra, calculus, trigonometry, and more with instant answer verification. Perfect for students, educators, and anyone looking to improve their math skills!

## ✨ Key Features

- **📚 25+ Math Topics**: Comprehensive coverage from basic arithmetic to advanced calculus
- **⚡ Instant Feedback**: Real-time answer checking with detailed explanations
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎯 Progressive Difficulty**: Questions adapt to different skill levels
- **🔢 Math Notation Support**: Beautiful mathematical rendering with MathJax
- **🎲 Unlimited Questions**: Generate endless practice problems
- **💡 Educational Focus**: Designed specifically for learning and practice

### Supported Math Topics

| Category | Topics |
|----------|--------|
| **Arithmetic** | Addition, Subtraction, Multiplication, Division |
| **Algebra** | Roots, Logarithms, Exponentials, Factorials, Series |
| **Calculus** | Differentiation, Integration, Limits, Related Rates |
| **Linear Algebra** | Matrix Operations, Vector Operations |
| **Trigonometry** | Sine, Cosine, Tangent, Cosecant, Secant, Cotangent |
| **Discrete Math** | Permutations, Combinations, Probability |

## 🚀 Quick Start

### Live Demo
Try it now: **[https://math.richardsblogs.com/](https://math.richardsblogs.com/)**

### Local Installation

```bash
# Clone the repository
git clone https://github.com/richie-rich90454/random_math_question_generator.git
cd random_math_question_generator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:1331](http://localhost:1331) in your browser.

## 🎯 How to Use

1. **Select a Topic**: Choose from 25+ math categories in the dropdown
2. **Generate Question**: Click "Generate Question" to get a new problem
3. **Enter Answer**: Type your solution in the answer box
4. **Check Answer**: Click "Check Answer" or press `Shift+Enter` for instant feedback
5. **Learn**: Review the correct answer and explanation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Properties), JavaScript (ES6 Modules)
- **Math Rendering**: [MathJax](https://www.mathjax.org/) for beautiful mathematical notation
- **Backend**: Node.js with [Fastify](https://www.fastify.io/) for high-performance serving
- **Math Engine**: [Math.js](https://mathjs.org/) for complex calculations
- **Build Tools**: Terser for minification, CSSNano for CSS optimization
- **Desktop App**: Electron for cross-platform desktop application

## 📁 Project Structure

```
random_math_question_generator/
├── index.html              # Main web application interface
├── main.js                 # Electron desktop application entry point
├── script.js              # Core application logic (ES6 modules)
├── script.min.js          # Minified version of script.js
├── style.css              # Responsive styling
├── style.min.css          # Minified version of style.css
├── server.js              # Fastify server configuration
├── package.json           # Project configuration and dependencies
├── modules/               # Modular math question generators
│   ├── math.js            # Main math module loader
│   ├── algebra.js         # Algebraic operations
│   ├── algebra.full.js    # Full algebra module
│   ├── arithmetic.js      # Basic arithmetic
│   ├── arithmetic.full.js # Full arithmetic module
│   ├── calculus.js        # Calculus problems
│   ├── calculus.full.js   # Full calculus module
│   ├── linearAlgebra.js   # Matrix and vector operations
│   ├── linearAlgebra.full.js # Full linear algebra module
│   ├── trigonometry.js    # Trigonometric functions
│   ├── trigonometry.full.js # Full trigonometry module
│   └── discreteMathematics.js # Combinatorics and probability
├── favicon.png            # Application icon
├── favicon.ico            # Desktop application icon
├── apple-touch-icon.png   # iOS app icon
├── NotoSans-VariableFont_wdth_wght.ttf # Custom font
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
├── LICENSE                # Apache 2.0 License
├── CODE_OF_CONDUCT.md     # Community guidelines
├── OFL-Noto_Sans.txt      # Font license
└── README.md              # This file
```

## 🎨 Features in Detail

### Smart Answer Checking
- Supports multiple correct answer formats
- Handles mathematical equivalences
- Provides detailed feedback
- Supports keyboard shortcuts

### Educational Design
- Progressive difficulty levels
- Clear mathematical notation
- Instant feedback for learning
- Mobile-friendly interface

### Performance Optimized
- Fast server response times
- Optimized bundle sizes
- Efficient math calculations
- Responsive design

## 🚀 Deployment

### Web Deployment
The application is ready for deployment on any Node.js hosting platform:
- Vercel, Netlify, Heroku
- AWS, Google Cloud, Azure
- Any static hosting service

### Desktop Application
Build cross-platform desktop apps:
```bash
npm run build
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Open an issue with detailed descriptions
2. **Suggest Features**: Share your ideas for new math topics or features
3. **Improve Documentation**: Help make the project more accessible
4. **Submit Code**: Fork the repo and create pull requests

### Development Setup
```bash
git clone https://github.com/richie-rich90454/random_math_question_generator.git
cd random_math_question_generator
npm install
npm run dev
```

## 📊 Project Stats

- **25+** Math topics supported
- **1000+** Lines of educational code
- **5** Major math categories
- **Unlimited** Question combinations
- **Instant** Answer verification

## 🌟 Why Star This Project?

- **🎓 Educational Value**: Helps students learn math effectively
- **🚀 Performance**: Fast, responsive, and reliable
- **📱 Accessibility**: Works on all devices
- **🔧 Well-Maintained**: Regular updates and improvements
- **🎯 Practical**: Real-world educational tool
- **📚 Comprehensive**: Covers high school to college-level math

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://math.richardsblogs.com/](https://math.richardsblogs.com/)
- **GitHub Repository**: [https://github.com/richie-rich90454/random_math_question_generator](https://github.com/richie-rich90454/random_math_question_generator)
- **Main Website**: [https://www.richardsblogs.com](https://www.richardsblogs.com)

---

⭐ **If you find this project helpful, please consider giving it a star!** ⭐

Your support helps more people discover this valuable learning tool and encourages further development.
