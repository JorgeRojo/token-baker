# Project Specification: token-baker

**Version:** 1.0
**Date:** July 26, 2025
**Author:** Jorge Rojo

## 1. Project Summary

**token-baker** is an AI-powered, cross-platform desktop application (built with Electron). It serves as an intelligent **token file editor and manager**, designed to accelerate and standardize the creation of design tokens by leveraging a powerful, remote AI model via the Hugging Face Inference API.

The application allows users to load existing `tokens.json` files, visualize their structure, and use an AI assistant to scaffold new token names based on natural language descriptions. Users can then conversationally refine these suggestions before merging them into their token set and saving the file.

## 2. Context and Motivation

This application aims to solve key pain points in design system workflows by:

- **Automating Scaffolding:** Automatically generating a checklist of token names needed for a new component.
- **Enforcing Consistency:** Ensuring all generated names adhere to a robust, predefined naming convention.
- **Streamlining Editing:** Providing a user-friendly interface to load, modify, and save token files, eliminating manual JSON editing.
- **Leveraging Powerful AI:** Using a state-of-the-art remote model for higher quality suggestions without consuming local machine resources.

## 3. Reference System

The application's AI logic will be instructed to follow the naming conventions of the **GitHub Primer Design System**.

> **Reference Guide:** [https://primer.style/product/primitives/token-names/](https://primer.style/product/primitives/token-names/)

## 4. Architecture & Tech Stack

- **Framework:** [Electron](https://www.electronjs.org/)
- **UI Framework:** [React](https://react.dev/)
- **UI Component Library:** [fratch-ui](https://github.com/JR-NodePI/fratch-ui)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Engine:** **Hugging Face Inference API**
- **Recommended Model:** `gpt2` (as a placeholder for a free, widely available model for testing API connectivity).
- **Testing:** [Vitest](https://vitest.dev/)
- **Development Tooling:** ESLint, Prettier, Husky

## 5. Functional Specifications

### F.1: User Authentication

- The application UI will include an input field for the user to enter their Hugging Face API Token. (Note: Currently, the token is set directly in `src/main/index.ts` for simplicity).
- This token is required to make requests to the inference API. It will be stored in memory for the duration of the session.

### F.2: Token File Management (Import/Export)

- **File Loading (Import):** A "Load JSON" button will open a native file dialog to select a `.json` file. The app will parse and display its contents in a "Token Tree View".
- **File Saving (Export):** "Save" and "Save As..." buttons will allow the user to write the current token state from memory to a `tokens.json` file.

### F.3: The AI Assistant Workflow

#### Step 1: Initial Prompt

- The user writes a natural language prompt describing a UI component.
- The user clicks the "Generate Suggestions" button.

#### Step 2: Suggestion Review & Refinement Loop

- **Display Suggestions:** The application sends the request to the Hugging Face API and displays the returned list of token name suggestions in a "staging area".
- **Conversational Refinement:** The user can provide follow-up instructions (e.g., "Add tokens for a disabled state") to iterate on the suggestions until the list of tokens is perfect.

#### Step 3: Final Confirmation

- **Accept Changes:** The user clicks an "Accept & Add" button.
- **Merge State:** The confirmed token names are merged into the main token tree, ready to be saved.

## 6. Non-Functional Requirements

- **Internet Connection:** The application **requires an active internet connection** to communicate with the Hugging Face API.
- **Performance:** The UI must remain responsive. A clear loading indicator must be visible during API calls.
- **Privacy:** Users should be informed that their prompts are sent to the Hugging Face API for processing. The API key is handled client-side and only sent in requests.

## 7. Licensing and Contribution

- **License:** This project is licensed under the **Mozilla Public License 2.0**.
- **Contribution Model:** The project follows the **GitFlow** branching model. See `CONTRIBUTING.md` for details.