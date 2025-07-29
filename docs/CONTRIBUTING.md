# Contributing to token-baker

First off, thank you for considering contributing! We love our community and are grateful for every contribution, from fixing typos to adding major features.

This document provides a set of guidelines to help you contribute effectively.

## Code of Conduct

This project and everyone participating in it is governed by a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## Our Branching Model (GitFlow)

This project uses the [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/) branching model. Understanding it is key to contributing effectively. The main branches are:

- **`main`**: This branch contains production-ready, stable code. It is tagged for each official release. **Direct contributions to `main` are not allowed.**
- **`develop`**: This is the main development branch. It contains the latest delivered development changes for the next release. **All work should start from this branch.**

**All Pull Requests from contributors must be targeted to merge into the `develop` branch.**

## Pull Request Process

To ensure a smooth process, please follow these steps for submitting code changes. While most development work involves local Git commands, certain actions like **forking the repository** and **opening Pull Requests** are best managed directly through the GitHub web interface. For very minor changes (e.g., typos), you might even use GitHub's web editor directly.

1.  **Fork the Repository (via GitHub UI):** Create your own copy of the project on your GitHub account by clicking the "Fork" button on the main repository page.

2.  **Clone Your Fork:** Clone your forked repository to your local machine.

    ```sh
    git clone https://github.com/YOUR_USERNAME/token-baker.git
    cd token-baker
    ```

3.  **Configure Upstream Remote:** Add the original repository as an "upstream" remote. This makes it easier to sync changes.

    ```sh
    git remote add upstream https://github.com/JorgeRojo/token-baker.git
    ```

4.  **Create Your Branch from `develop` (with an associated GitHub Issue):** Before starting any work, ensure your local `develop` branch is up to date with the main project. Then, create your new branch from it.

    **Important:** Every `feature/`, `bugfix/`, or `docs/` branch **must have an associated GitHub Issue**. This helps us track progress and context. Please include the issue number in your branch name for clarity.

    *   **How to associate an Issue:**
        1.  Go to the project's [Issues page](https://github.com/JorgeRojo/token-baker/issues) on GitHub.
        2.  Create a new issue (using one of our [issue templates](.github/ISSUE_TEMPLATE/)).
        3.  Note the issue number (e.g., `#123`).

    *   **Branch Naming Convention:** Use a descriptive prefix like `feature/`, `bugfix/`, or `docs/`, followed by the issue number and a short, descriptive name.
        *   Example for a feature: `feature/123-add-new-component`
        *   Example for a bugfix: `bugfix/456-fix-login-error`
        *   Example for documentation: `docs/789-update-readme`

    ```sh
    # Fetch the latest changes from the upstream repository
    git fetch upstream

    # Switch to your local develop branch
    git checkout develop

    # Sync it with the upstream develop branch
    git merge upstream/develop

    # Create your new branch for the feature or fix (e.g., git checkout -b feature/123-add-new-component)
    git checkout -b feature/your-issue-number-descriptive-name
    ```

5.  **Make Your Changes:** Write the code for your feature or bug fix.

6.  **Run Quality Checks:** Before committing, please run all local quality checks to ensure your code is clean and passes all tests.

    ```sh
    # Format your code
    npm run format

    # Lint your code for issues
    npm run lint

    # Run all tests
    npm test
    ```

    All checks must pass successfully before submitting your Pull Request.

7.  **Commit Your Changes:** Use clear and descriptive commit messages.

    ```sh
    git add .
    git commit -m "feat: Add some AmazingFeature"
    ```

8.  **Push to Your Fork:** Push your changes up to your forked repository.

    ```sh
    git push origin feature/your-amazing-feature
    ```

9.  **Open a Pull Request (via GitHub UI):** Go to your forked repository on GitHub and click the "Compare & pull request" button that appears after pushing your branch. **Ensure the base branch is set to `develop`**, not `main`. Provide a clear description of the problem and solution, including a link to any relevant issues.

Thank you for your contribution!
