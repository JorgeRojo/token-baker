# Token Baker 🎨🤖

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> ✨ Accelerate your design system workflow. An AI-powered editor that helps you build, manage, and refine your design tokens from a simple prompt.

**Token Baker** is a desktop utility that serves as an intelligent editor and manager for your design tokens. It helps designers and developers create consistent, structured token files by combining a file editor with an AI assistant. You can load an existing `tokens.json` file, describe a new UI component, and use a conversational AI loop to generate, refine, and add the exact token names you need.

## Key Features

- **AI-Powered Scaffolding:** Uses a local, on-device large language model (LLM) to understand your natural language prompts and suggest required token names for your components.
- **Conversational Refinement Loop:** Don't just accept suggestions. Iterate on them with follow-up prompts until the list of tokens is perfect.
- **Full Token File Management:** Load, visualize, and edit existing `tokens.json` files in a clear tree structure. Save your changes back to the file.
- **Convention-Based:** Enforces a structured and scalable naming convention inspired by industry-leading design systems.
- **Offline First & Private:** Works entirely on your machine. No user prompts or data are ever sent to the cloud.

## Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/)
- **UI Framework:** [React](https://react.dev/)
- **UI Component Library:** [fratch-ui](https://github.com/JR-NodePI/fratch-ui)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Engine:** [Transformers.js](https://huggingface.co/docs/transformers.js) running a local model (e.g., Phi-3-mini).
- **Testing:** [Vitest](https://vitest.dev/)
- **Development Tooling:** ESLint, Prettier, Husky

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- [Node.js](v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```sh
    git clone [https://github.com/JorgeRojo/Token Baker.git](https://github.com/JorgeRojo/Token Baker.git)
    cd Token Baker
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

## Project Structure

```schema
.
├── assets/
├── src/
│   ├── index.css
│   ├── main.ts
│   ├── preload.ts
│   ├── renderer.ts
│   └── renderer/
│       └── App.tsx
├── CONTRIBUTING.md
├── index.html
├── LICENSE
├── README.md
└── SPECS.md
```

## Available Scripts

In the project directory, you can run the following commands:

#### `npm start`

Runs the app in development mode with hot-reloading.

#### `npm test`

Launches the test runner in watch mode using Vitest.

#### `npm run lint`

Lints the entire project for code quality and style issues using ESLint.

#### `npm run format`

Formats all project files according to the Prettier configuration.

## How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

## License

This project is licensed under the **Mozilla Public License 2.0**. See the [LICENSE.md](LICENSE.md) file for full details.
