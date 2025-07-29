# Code Style Guidelines

This document outlines the code style guidelines for the `token-baker` project. Adhering to these guidelines ensures consistency, readability, and maintainability across the codebase.

## 1. General Principles

*   **Consistency:** Always prioritize consistency with existing code.
*   **Readability:** Write code that is easy to understand for other developers.
*   **Maintainability:** Ensure code is easy to modify and extend.

## 2. Formatting (Prettier)

The project uses [Prettier](https://prettier.io/) for automatic code formatting. It is highly recommended to configure your IDE to format on save.

Key Prettier configurations:

*   **Single Quotes:** Use single quotes for strings (`'string'`).
*   **Semicolons:** Always use semicolons at the end of statements.
*   **Print Width:** Lines will wrap at 100 characters.
*   **Trailing Commas:** No trailing commas for multi-line arrays, objects, or function parameters.

## 3. Linting (ESLint)

[ESLint](https://eslint.org/) is used to enforce code quality and identify potential issues. The configuration is based on `@electron-toolkit/eslint-config-ts` and includes rules for React and React Hooks.

Key ESLint configurations and plugins:

*   **TypeScript:** Strict TypeScript rules are enforced.
*   **React:** Standard React best practices and JSX rules.
*   **React Hooks:** Rules specifically for ensuring correct usage of React Hooks.
*   **No Unused Variables/Imports:** Avoids dead code.
*   **Type Safety:** ESLint works in conjunction with TypeScript for type checking.

## 4. Naming Conventions

*   **Variables & Functions:** `camelCase` (e.g., `myVariable`, `calculateTotal`).
*   **Components (React):** `PascalCase` (e.g., `MyComponent`, `UserProfile`).
*   **Files:** `kebab-case` for component directories and `PascalCase` for component files (e.g., `src/components/my-component/MyComponent.tsx`).
*   **Constants:** `SCREAMING_SNAKE_CASE` (e.g., `API_KEY_STORE_KEY`).

## 5. TypeScript Usage

*   **Explicit Types:** Use explicit types for variables, function parameters, and return values where clarity is improved.
*   **Interfaces/Types:** Prefer interfaces for object shapes and types for unions/intersections.
*   **Strict Mode:** The project is configured with strict TypeScript settings to catch potential errors early.

## 6. Imports

*   **Absolute Imports:** Prefer absolute imports from the `src` directory where configured.
*   **Ordering:** Generally, imports should be grouped:
    1.  Node.js built-in modules
    2.  Third-party libraries
    3.  Project-specific modules (absolute paths)
    4.  Relative imports

## 7. Comments

*   **Use Sparingly & Purposefully:** Prioritize self-descriptive function, variable, and component names over comments. Comments should be used sparingly, only to explain *why* a piece of code exists or *what* a complex algorithm does, rather than *how* it works (which should be clear from the code itself).
*   **Language:** All comments should be in English.

## 8. Git Commit Messages

*   **Conventional Commits:** Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add new feature`, `fix: resolve bug`, `docs: update documentation`).
*   **Concise Subject:** Keep the subject line concise (50-72 characters).
*   **Body (Optional):** Provide a more detailed explanation in the commit body if necessary.
