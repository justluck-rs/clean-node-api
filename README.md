# Initial TypeScript + Node.js Project

This is an initial project configured with TypeScript and Node.js, following best development practices, including commit standards, Jest testing, and commit and push standardization with Husky and lint-staged. The package manager used is Yarn.

## Project Configurations

### 1. TypeScript

The project utilizes TypeScript to provide static typing to JavaScript code. TypeScript files are located in the `src` directory, and the transpiled files are generated in the `dist` directory.

### 2. Commit Standards

The project adheres to the commit standards established by Conventional Commits (https://www.conventionalcommits.org/). This helps in automatically generating changelogs and maintaining a consistent commit history.

### Installation

To install project dependencies, run:

```bash
yarn install
```

### 3. Husky and lint-staged

Husky is configured to ensure that commit standards and tests are checked before any push. lint-staged is used to run linting checks only on modified files.

After installation, run the following command to set up Husky:

```bash
yarn husky:prepare
```

### 4. Jest Testing

Unit tests are configured using Jest. Test files are located in the `__tests__` directory. Run tests using the command:

```bash
yarn test
```

This prepares Husky for the necessary checks.

### Running the Project

To start the project, use the command:

```bash
yarn start
```

This initial project is ready to be used as a foundation for TypeScript + Node.js application development, following the mentioned best practices.

### Contributing

Feel free to contribute! Make sure to follow commit standards when submitting your changes.

## License

This project is licensed under the [MIT License](LICENSE).
