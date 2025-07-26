# Project Specification: design-tokens-builder

**Version:** 1.0
**Date:** July 26, 2025
**Author:** Jorge Rojo

## 1. Project Summary

**design-tokens-builder** is an AI-powered, cross-platform desktop application (built with Electron). It serves as an intelligent **token file editor and manager**, designed to accelerate and standardize the creation of design tokens.

The application allows users to load existing `tokens.json` files, visualize their structure, and use an AI assistant to scaffold new token names based on natural language descriptions of UI components. Users can then conversationally refine these suggestions before merging them into their token set and saving the file.

## 2. Context and Motivation

In modern design systems, token management can be a bottleneck. This application aims to solve key pain points by:

- **Automating Scaffolding:** Automatically generating a checklist of token names needed for a new component.
- **Enforcing Consistency:** Ensuring all generated names adhere to a robust, predefined naming convention.
- **Streamlining Editing:** Providing a user-friendly interface to load, modify, and save token files, eliminating manual JSON editing.
- **Working Offline:** Offering a privacy-focused, offline-first tool by running the AI model locally on the user's machine.

## 3. Reference System

The application's AI logic for generating token names will be trained and instructed to follow the naming conventions and structure of the **GitHub Primer Design System**. This serves as the "north star" for the output's quality and structure.

> **Reference Guide:** [https://primer.style/product/primitives/token-names/](https://primer.style/product/primitives/token-names/)

## 4. Architecture & Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/)
- **UI Framework:** [React](https://react.dev/)
- **UI Component Library:** [fratch-ui](https://github.com/JR-NodePI/fratch-ui)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Engine:** [Transformers.js](https://huggingface.co/docs/transformers.js) running a local model (e.g., Phi-3-mini).
- **Testing:** [Vitest](https://vitest.dev/)
- **Development Tooling:**
  - **Linter:** [ESLint](https://eslint.org/)
  - **Formatter:** [Prettier](https://prettier.io/)
  - **Git Hooks:** [Husky](https://typicode.github.io/husky/)

## 5. Functional Specifications

### F.1: Token File Management (Import/Export)

- **File Loading (Import):** A "Load JSON" button will open a native file dialog to select a `.json` file. The app will parse and display its contents in a "Token Tree View".
- **File Saving (Export):** "Save" and "Save As..." buttons will allow the user to write the current token state from memory to a `tokens.json` file.

### F.2: The AI Assistant Workflow

#### Step 1: Initial Prompt

- The user writes a natural language prompt describing a UI component (e.g., "A primary call-to-action button").
- The user can optionally select a node in the Token Tree View to provide context.
- The user clicks the "Generate Suggestions" button.

#### Step 2: Suggestion Review & Refinement Loop

- **Display Suggestions:** The application sends the request to the local LLM and displays the returned list of token name suggestions in a dedicated "staging area".
- **Refinement Options:** The user can act on this staged list by:
  1.  **Manual Editing:** Directly deleting, adding, or renaming items in the list.
  2.  **Conversational Refinement:** Using a new input field to provide follow-up instructions (e.g., "Add tokens for a disabled state," "Change 'primary' to 'destructive'").
- **Iteration:** If a refinement prompt is submitted, the application sends the original context plus the new instruction back to the LLM to get a revised list. This loop can continue until the user is satisfied.

#### Step 3: Final Confirmation

- **Accept Changes:** Once the list is perfect, the user clicks an "Accept & Add" button.
- **Merge State:** The confirmed token names are then merged into the main token tree in the application's memory, ready to be saved.

## 6. Core Logic: The LLM System Prompt

The "brain" of the application is a carefully crafted system prompt that instructs the local LLM.

> **Your Role:** You are an expert design system assistant. Your specialty is helping developers apply design tokens consistently.
>
> **Your Task:** The user will describe a UI component. Your goal is to generate a list of the design token names required to build that component.
>
> .
> **Strict Rules:**
>
> 1.  **Naming System:** You must exclusively use the GitHub Primer naming convention.
> 2.  **Output Format:** Your response MUST be only a JSON array of strings (e.g., `["token1", "token2", ...]`). Do not include any other text.
> 3.  **Inference:** Infer all necessary tokens. If a user mentions a "primary button", you must include tokens for its background, foreground, border, and interaction states.
> 4.  **Completeness:** Think holistically about the component: colors, fonts, spacing, radii, shadows, etc.

## 7. Non-Functional Requirements

- **Performance:** The application should be responsive. LLM inference may take a few seconds, during which a clear loading indicator must be visible.
- **Security & Privacy:** As the model runs locally, no user data or prompts are sent to any external cloud service.
- **Platform:** The application must be buildable for major desktop platforms (macOS, Windows).

## 8. Licensing and Contribution

- **License:** This project is licensed under the **Mozilla Public License 2.0**.
- **Contribution Model:** The project follows the **GitFlow** branching model. All contributions should be made via Pull Requests targeted to the `develop` branch. See `CONTRIBUTING.md` for details.
