# Token Baker 🎨🤖

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/CONTRIBUTING.md)

> ✨ Accelerate your design system workflow. An AI-powered editor that helps you build, manage, and refine your design tokens from a simple prompt.

**token-baker** is a desktop utility that serves as an intelligent editor and manager for your design tokens. It helps designers and developers create consistent, structured token files by connecting to the powerful Google Gemini API. You can load an existing `tokens.json` file, describe a new UI component, and use a conversational AI loop to generate, refine, and add the exact token names you need.

## Key Features

- **AI-Powered Scaffolding:** Uses the Google Gemini API to understand natural language prompts and suggest required token names.
- **Conversational Refinement Loop:** Iterate on AI suggestions with follow-up prompts until the list of tokens is perfect.
- **Full Token File Management:** Load, visualize, and edit existing `tokens.json` files in a clear tree structure. Save your changes back to the file.
- **Convention-Based:** Enforces a structured and scalable naming convention inspired by industry-leading design systems.

## Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/)
- **UI Framework:** [React](https://react.dev/)
- **UI Component Library:** [fratch-ui](https://github.com/JR-NodePI/fratch-ui)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Engine:** [Google Gemini API](https://ai.google.dev/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Development Tooling:** ESLint, Prettier, Husky

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A **Google Gemini API Key**.

### Installation

1. **Get your API Key:**
   - Follow the simple steps in our guide: **[How to Get a Google Gemini API Key](docs/GET_GEMINI_API_KEY.md)**.

2. **Clone the repository:**

   ```sh
   git clone [https://github.com/JorgeRojo/token-baker.git](https://github.com/JorgeRojo/token-baker.git)
   cd token-baker
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Run the application:**

```sh
 npm start
```

When the app launches, paste your Google API Key into the designated input field.

## How to Contribute

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Please check out the [CONTRIBUTING.md](docs/CONTRIBUTING.md) file for details.

## License

This project is licensed under the **Mozilla Public License 2.0**. See the [LICENSE](LICENSE) file for full details.
