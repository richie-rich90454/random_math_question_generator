# Random Math Question Generator 🧮

**Available at [math.richardsblogs.com](https://math.richardsblogs.com)**

[![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=for-the-badge&logo=apache&logoColor=white)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/richie-rich90454/random_math_question_generator?style=for-the-badge&logo=github&logoColor=white)](https://github.com/richie-rich90454/random_math_question_generator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/richie-rich90454/random_math_question_generator?style=for-the-badge&logo=github&logoColor=white)](https://github.com/richie-rich90454/random_math_question_generator/network/members)
[![GitHub issues](https://img.shields.io/github/issues/richie-rich90454/random_math_question_generator?style=for-the-badge&logo=github&logoColor=white)](https://github.com/richie-rich90454/random_math_question_generator/issues)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/richie-rich90454/random_math_question_generator?style=for-the-badge&logo=github&logoColor=white)](https://github.com/richie-rich90454/random_math_question_generator/releases)
[![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge&logo=vercel&logoColor=white)](https://math.richardsblogs.com/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-6.0.2-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-8.0.3-%23646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MathJax](https://img.shields.io/badge/MathJax-4.1.1-007ACC?style=for-the-badge&logo=mathjax&logoColor=white)](https://www.mathjax.org/)
[![Math.js](https://img.shields.io/badge/math.js-15.1.1-007ACC?style=for-the-badge&logo=math.js&logoColor=white)](https://mathjs.org/)
[![Offline First](https://img.shields.io/badge/offline-first-success?style=for-the-badge&logo=offline&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_service_workers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge&logo=github&logoColor=white)](CONTRIBUTING.md)

A comprehensive, free online math question generator built with TypeScript that helps students practice algebra, calculus, trigonometry, and more with instant answer verification. Perfect for students, educators, and anyone looking to improve their math skills!

## ✨ Key Features

- **📚 125+ Math Topics**: Comprehensive coverage from basic arithmetic to advanced calculus, discrete math, linear algebra, and geometry
- **⚡ Instant Feedback**: Real-time answer checking with detailed explanations and LaTeX rendering
- **💾 Persistent Storage**: Stores scores and progress locally in your browser (IndexedDB / localStorage)
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎯 Progressive Difficulty**: Questions adapt to different skill levels (easy, medium, hard)
- **🔢 Math Notation Support**: Beautiful mathematical rendering with MathJax and KaTeX
- **🎲 Unlimited Questions**: Generate endless practice problems
- **💡 Educational Focus**: Designed specifically for learning and practice
- **🔒 Type Safety**: Fully migrated to TypeScript for robust, maintainable code
- **🧩 Modular Architecture**: Organized into focused modules, each with many topic‑specific generator files
- **✅ Smart Answer Checking**: Uses math.js to handle equivalent expressions, fractions, and LaTeX input

### ❓ Why Not Just Use AI Generated Questions/Answers?

- No distractions or potentially hallucinated answers
- Unlimited structured practice
- Instant correctness verification
- Works offline as a web app
- Fully open-source & transparent

## 📦 Try It Online

No installation required! Visit **[https://math.richardsblogs.com/](https://math.richardsblogs.com/)** and start practicing immediately.

## 🚀 Local Development (Web Version)

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

1. **Select a Topic**: Choose from 125+ math categories organized by subject
2. **Generate Question**: Click "Generate Question" to get a new problem
3. **Enter Answer**: Type your solution in the answer box
4. **Check Answer**: Click "Check Answer" or press `Shift+Enter` for instant feedback
5. **Learn**: Review the correct answer rendered with KaTeX and a plain‑text alternate

## 📚 Supported Math Topics (125+ Topics)

| Category | Topics |
|----------|--------|
| **Arithmetic** | Addition, Subtraction, Multiplication, Division |
| **Algebra (Basics)** | Fractions, Percentages, Ratios & Proportions, Unit Conversion, Expression Evaluation, Number Sets, Algebraic Properties, Order of Operations, Linear Word Problems, Radical Simplification, Radical Equations, Rational Exponents, Exponent Rules, Scientific Notation, Complex Numbers, Direct/Inverse Variation, Real Number Operations, Cartesian Plane, Special Linear Equations, Rational Equations, Roots, Logarithms, Exponentials, Factorials, Series, Function Properties, Basic Functions, Function Operations, Inverse Functions, Transformations, Power Function Modeling, Polynomial Inequalities, Polynomial End Behavior, Synthetic Division, Complex Zeros, Rational Graph Analysis, Circle Equations, Logistic Functions, Exponential Modeling, Logarithmic Modeling, Finance |
| **Algebra (Advanced)** | Linear Equations, Quadratic Equations, Linear Inequalities, Quadratic Inequalities, Rational Inequalities, 2×2 Systems, Polynomial Operations, Polynomial Division, Factoring, Function Concepts, Linear Graphs, Non‑Linear Graphs |
| **Calculus** | Limits, Derivatives (polynomial, trigonometric, exponential, logarithmic, product, quotient, chain, implicit, higher order, motion), Integrals (polynomial, trigonometric, exponential, logarithmic, substitution, definite, initial value, area, motion), Related Rates (ladder, cone), Limits & Continuity, Applications of Differentiation, Advanced Integration, Graphical Calculus, Parametric/Polar/Vector Calculus, Sequences & Series |
| **Linear Algebra** | Matrix Operations (add, subtract, multiply, inverse, transpose, scalar multiplication, power, row echelon), 3×3 Systems, Row Echelon Form, Partial Fractions, Linear Programming, 3D Vectors (magnitude, unit, dot, angle, projection), 3D Lines (parametric, point at given t), 3D Planes (distance, equation) |
| **Trigonometry** | Sine, Cosine, Tangent, Cosecant, Secant, Cotangent, Inverse Trig, Trig Equations, Trig Graphs, Degrees/Radians Conversion, Arc Length, Angular/Linear Speed, Right Triangle Definitions, Special Triangles, Elevation/Depression, Reference Angle, ASTC Signs, Sum/Difference Formulas, Double‑Angle Formulas, Half‑Angle Formulas, Polar/Rectangular Conversion, Polar Distance, Polar Graph Equations, Parametric → Cartesian, Parametric Motion, Complex Polar Form, Complex Multiply/Divide, De Moivre's Theorem, Complex Roots |
| **Discrete Mathematics** | Permutations (basic, equation, word, circular, identical, with replacement), Combinations (basic, equation, word, complement, paths, multiset), Probability (basic, conditional, independent, mutually exclusive, Bayes, binomial, expected value, complement, permutation/combination, geometric), Statistics (mean, median, mode, range, stem‑and‑leaf, box plot, standard deviation) |
| **Geometry** | Area (circle, rectangle, triangle, sector), Volume (sphere, cylinder, cone, pyramid, cube), Surface Area (cube), Triangles (Pythagorean theorem, similar triangles, classification), Perimeter, Arc Length, Distance Formula, Angle Relations, Conic Sections (parabola, ellipse, hyperbola, polar conics), 3D Geometry (distance/midpoint, sphere equations, lines/planes in 3D) |

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Custom Properties), TypeScript (ES2020)
- **Math Rendering**: [MathJax](https://www.mathjax.org/) 4.1.1 and [KaTeX](https://katex.org/) 0.16.11 for beautiful mathematical notation
- **Build Tool**: [Vite](https://vitejs.dev/) 8.0.3 with TypeScript support for fast development and optimized builds
- **Math Engine**: [Math.js](https://mathjs.org/) 15.1.1 for complex calculations and equivalence checking
- **Storage**: Browser’s built‑in IndexedDB / localStorage for progress tracking
- **Type Safety**: TypeScript 6.0.2 with strict configuration and comprehensive type definitions
- **Package Manager**: npm with Node.js 18+

## 📁 Project Structure

```
random_math_question_generator/
├── src/                          # Source code directory
│   ├── index.html               # Main web application interface
│   ├── script.ts                # Core application logic (TypeScript)
│   ├── style.css                # Responsive styling
│   ├── types/                   # TypeScript type definitions
│   ├── modules/                 # Modular math question generators
│   │   ├── Algebra/             # 40+ topic‑specific generator files
│   │   ├── Arithmetic/          # Basic arithmetic generators
│   │   ├── Calculus/            # Derivative, integral, limit generators
│   │   ├── LinearAlgebra/       # Matrix & vector generators
│   │   ├── Trigonometry/        # Trig function generators
│   │   ├── DiscreteMathematics/ # Combinatorics & probability
│   │   └── Geometry/            # Area, volume, triangle generators
│   ├── components/              # UI components
│   ├── utils/                   # Utility functions (answer checking, formatting)
│   └── assets/                  # Static assets
├── public/                      # Public assets (fonts, MathJax)
├── dist/                        # Build output
├── vite.config.ts               # Vite build configuration
├── tsconfig.json                # TypeScript configuration
├── CONTRIBUTING.md              # Contribution guidelines
├── SECURITY.md                  # Security policy
└── README.md                    # This file
```

## 🎨 Features in Detail

### Smart Answer Checking
- Supports multiple correct answer formats (LaTeX, plain text, fractions, decimals)
- Handles mathematical equivalences using Math.js (e.g., `2x` ↔ `2*x`, `(x+1)^2` ↔ `x^2+2x+1`)
- Provides detailed feedback with TypeScript‑safe structures
- Includes a `display` field for rendering answers in KaTeX, separate from the `alternate` plain‑text representation
- Vector notation support (angle brackets) and fallback numeric evaluation

### Educational Design
- Progressive difficulty levels (easy, medium, hard)
- Clear mathematical notation with MathJax/KaTeX
- Instant feedback for learning
- Mobile‑friendly interface with keyboard shortcuts

### Performance Optimized
- Fast static hosting with Vite
- Optimized bundle sizes
- Efficient math calculations using math.js
- Responsive design with CSS custom properties

### TypeScript Benefits
- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete, refactoring, and documentation
- **Improved Maintainability**: Clear type definitions make code easier to understand
- **Modern Development**: Leverages latest ECMAScript features with type checking

### Modular Architecture
- **Organized by Subject**: Each math category has its own module directory
- **Focused Files**: Large modules split into many small, topic‑specific generator files (e.g., `generateFraction.ts`, `generateLogarithm.ts`)
- **Reusable Utilities**: Common functions extracted into utility files (e.g., `algebraUtils.ts`, `trigUtils.ts`)
- **Clear Exports**: Each module has an `index.ts` that exports all public functions

## 🚀 Deployment

The application is ready for deployment on any static hosting platform:
- Vercel, Netlify, GitHub Pages
- AWS S3, Google Cloud Storage, Azure Static Websites

### Build for Production

```bash
# Install dependencies
npm install

# Type check
npm run build:typescript

# Build web assets
npm run build:web

# Output is in the `dist/` folder
```

### TypeScript Development

```bash
# Type checking (via tsc --noEmit)
npm run build:typescript

# Development with hot reload
npm run dev

# Production build
npm run build
```

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Here's how you can help:
- **Report Bugs**: Open an issue with detailed descriptions
- **Suggest Features**: Share your ideas for new math topics or features
- **Improve Documentation**: Help make the project more accessible
- **Submit Code**: Fork the repo and create pull requests

### Development Setup
```bash
git clone https://github.com/richie-rich90454/random_math_question_generator.git
cd random_math_question_generator
npm install

# For web development
npm run dev

# For TypeScript type checking
npm run build:typescript
```

## 🔒 Security

We take security seriously. Please see our [SECURITY.md](SECURITY.md) for reporting vulnerabilities.

## 📊 Project Stats

- **125+** Math topics supported
- **10,000+** Lines of educational TypeScript code
- **7** Major math categories
- **100+** Module files organized by subject
- **Unlimited** Question combinations
- **Instant** Answer verification
- **TypeScript** for robust development

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=richie-rich90454/random_math_question_generator&type=Date)](https://star-history.com/#richie-rich90454/random_math_question_generator&Date)

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://math.richardsblogs.com/](https://math.richardsblogs.com/)
- **GitHub Repository**: [https://github.com/richie-rich90454/random_math_question_generator](https://github.com/richie-rich90454/random_math_question_generator)
- **Main Website**: [https://www.richardsblogs.com](https://www.richardsblogs.com)
- **Vite Build Tool**: [https://vitejs.dev/](https://vitejs.dev/)
- **TypeScript**: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

---

⭐ **If you find this project helpful, please consider giving it a star!** ⭐

Your support helps more people discover this valuable learning tool and encourages further development.