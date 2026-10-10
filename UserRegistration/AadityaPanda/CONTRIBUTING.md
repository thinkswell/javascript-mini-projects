# Contributing to **User Registration** Project

We welcome contributions to the **User Registration** project! By contributing to this project, you help improve it and make it more useful for everyone. Please take a moment to read the guidelines below before submitting any issues or pull requests.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Submitting Code Changes](#submitting-code-changes)
  - [Commit Message Guidelines](#commit-message-guidelines)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Style Guidelines](#style-guidelines)
- [License](#license)

---

## Code of Conduct
Please note that this project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project, you are expected to uphold the standards outlined in that document.

---

## How to Contribute

We encourage everyone to contribute in any way, whether it be reporting bugs, suggesting features, or submitting pull requests (PRs). Here's how you can get involved:

### Reporting Bugs
If you find a bug or encounter unexpected behavior, please help us fix it! To report a bug:
1. Check the [open issues](https://github.com/AadityaPanda/User-Registration/issues) to see if it's already reported.
2. If not, open a new issue and provide the following details:
   - A clear description of the bug.
   - Steps to reproduce it.
   - The expected and actual behavior.
   - Any relevant screenshots or logs.

### Suggesting Enhancements
We are always looking for ways to improve the **User Registration** project. If you have an idea for a new feature or enhancement:
1. Check the [open issues](https://github.com/AadityaPanda/User-Registration/issues) to ensure it's not already suggested.
2. Open a new issue and provide the following information:
   - A clear description of the feature or enhancement.
   - The reason why you think it would be beneficial.
   - Any implementation ideas or inspiration.

### Submitting Code Changes
We love pull requests! Here’s how you can submit a code contribution:
1. **Fork** the repository to your GitHub account.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/User-Registration.git
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```
4. **Make your changes**. Ensure that your code follows the [style guidelines](#style-guidelines).
5. **Test your changes** (see the [testing section](#testing)).
6. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Describe your changes"
   ```
7. **Push your changes** to your fork:
   ```bash
   git push origin my-feature-branch
   ```
8. **Open a pull request (PR)** to the `main` branch of the original repository.
   - Describe your changes and why they are needed.
   - Include any relevant issue numbers by referencing them like this: `#123`.

---

## Commit Message Guidelines
We use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification to maintain a consistent and readable commit history.

- **Use present tense** ("Add feature" instead of "Added feature").
- **Start with a short description** (50 characters or less).
- **Capitalize the first letter**.
- **Reference related issues** using `#<issue-number>`.

Example:
```
feat: add user authentication API

Added the authentication API with login and registration endpoints.
```

---

## Development Setup
To get started with development on the **User Registration** project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AadityaPanda/User-Registration.git
   ```
2. **Install dependencies**. Assuming you’re using `npm`:
   ```bash
   cd User-Registration
   npm install
   ```

---

## Testing
Before submitting your changes, make sure they work by running the tests:

1. **Run tests locally**:
   If you're using Jest for testing, you can run:
   ```bash
   npm test
   ```

2. **Ensure all tests pass** before submitting a pull request.

---

## Style Guidelines
We follow specific style conventions to maintain consistent code formatting. Please follow these guidelines:

- **Code formatting**: Use [Prettier](https://prettier.io/) to auto-format your code.
- **JavaScript**: Follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript).
- **CSS/SCSS**: Follow [BEM](http://getbem.com/) for CSS class naming.
- **Commenting**: Write clear and concise comments where necessary. Ensure that your code is self-explanatory, and comments are used to explain complex logic or decisions.

---

## License
By contributing, you agree that your contributions will be licensed under the same license as the project. For more information, please refer to the [LICENSE](./LICENSE) file.
