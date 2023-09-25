# Robot Challenge

## Table of Contents

- [Overview](#overview)
- [Tools and Configuration](#tools-and-configuration)
- [Build and Run](#build-and-run)
  - [Build, Test, and Run Locally](#build-test-and-run-locally)
  - [Build and Run with Docker](#build-and-run-with-docker)

## Overview

The `robot-challenge` project implements a Node JS
application, which simulates a toy robot moving on a table top.

The application's domain model has two classes: `DirectionState` and `RobotState`.
`DirectionState` represents the robot's direction and provides
methods for direction related operations - e.g. turning left or right and computing
the travel distance when moved. `RobotState` represents the robot's state on the board.
It has `direction` (of type `DirectionState`), board dimensions, and position.
It offers methods for each user provided operation - e.g. place, move, and turn.

The `CommandParser` class parses user commands and "passes" them to the appropriate `RobotState` methods.
For extensibility, we've implemented an interface `IOManager`, which abstracts away input and output.
The `CommandParser` class uses an instance of `IOManager` to receive commands and output the result.

The entry point of the application `index.ts` brings it all together and starts it.

## Tools and configuration

- We use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to ensure consistent Node JS version:
  - The NVM version is configured in `.nvmrc`
  - Run `nvm install` the first time, and then `nvm use` to ensure you have the correct version.
- For unit tests, we use [Jest](https://jestjs.io/):
  - It's configured in `jest.config.js`, which defines minumum coverage, excluded files, etc.
- We use [husky](https://www.npmjs.com/package/husky) to implement [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).
  - Its configuration is in the `.huskyrc` file
  - If you ever need to bypass the hook: `git push --no-verify`.
- [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formatting and linting:
  - ESlint uses the `.eslintrc.js` and `.eslingignore` config files;
  - Prettier uses `.prettierrc`;
  - Script to automatically fix some lint errors: `npm run lint-fix`;
  - VS Code plugins for [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) & [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode);

## Build and Run

You can either build, test, and run the application locally, by installing
the required runtime and tools on your computer, or use
[Docker](https://www.docker.com/) to build and run without any
additional configuration.

### Build, Test, and Run Locally

On a Unix computer, please install [Node Version Manager NVM](https://github.com/nvm-sh/nvm).
For Windows, you can install
[NVM-Windows](https://github.com/coreybutler/nvm-windows) instead.
Alternatively, you can manually install the latest Node JS LTS version `v18.18.0`.

Then the following commands will build, test, and run the app:

```BASH
# The first time, run "nvm install" instead of "nvm use"
nvm use && yarn install

# Run tests
yarn run test

# Runs the app
yarn run start:local
```

### Build and Run with Docker

To run the application in a Docker container, you will need `docker`
installed. [Docker Desktop](https://www.docker.com/products/docker-desktop/) (requires license) or [Rancher Desktop](https://rancherdesktop.io/) (free to use) are two popular options for Windows and Mac OS.

Then the following commands will build and run the app:

```bash
# Builds the docker image "robot-challenge"
docker build . -t robot-challenge

# Run the app in a new docker container
docker run -it robot-challenge node /home/node/app/dist/index.js
```
