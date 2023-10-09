# Tetris

[![Build Status](https://travis-ci.org/cyan33/tetris-redux.svg?branch=master)](https://travis-ci.org/cyan33/tetris-redux)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

This is an implementation of the famous Tetris game in browser side. Also, it's a good choice to get your hands dirty with React and Redux and their related ecosystem.

## Features

- Bootstrapped with `create-react-app`
- Design the view layer with React.js
- Manage the game state with Redux, and Redux-thunk
- Offline support with localStorage
- Mobile support (todo)

## Installation

Play it online at https://cyan.github.io/tetris/

Or get the local version with full source code:

clone the repo and install the dependencies:

```
> git clone git@github.com:cyan33/tetris.git && cd ./tetris
> npm install
```

run:
```
> npm start
```
which will automatically direct you to *http://localhost:3000*

Press the "Start" button and enjoy yourself.

To run the test,

```
> npm test
```

## Demo

![Tetris_demo](https://i.loli.net/2017/07/20/5970bb6047f79.gif)

## More About This Project

### How the Code Is Organized

```
|-- src
  |-- __test__: unit test files
  |-- actions: redux actions
  |-- reducers: redux reducer
  |-- components: react components
      |-- styles: css files
  |-- constants: game configuration
  |-- utils: helper utilities about complex tetrimino-related processings
  |-- index.js: entry file
|-- package.json
|-- yarn.lock
|-- README
```

### How the Logic Is Decoupled

React + Redux kind of completes the `MVC` part in front-end.

First, Redux is responsible for the M and C part in MVC. You could think of its global store/state as the `Model`, which has all the data related to the game. And reducer is part of the controller, which is responsible for changing the state according to the user event.

Finally, React is the View layer. It enables you to have a clear component tree. 

### What I've Noticed Along the Way

1. **Mutating data/state** is EVIL! It can cause hard-to-find bug and makes the state difficult to track. And that's also the design philosophy of Redux. The reducer should be pure. So everything related to reducer has to be pure as well, like what you may see in the utils file.

2. Be smart when debugging. Less `console.log`, take advantage of the advanced tools, like redux-devtool and Chrome devtool and always keep in mind what you are tracking, what is confusing you. Don't let problems get you lost. Always be aware what you are writing.

3. Think more, and then write. If you find yourself constantly modifying the exisiting code, you may stop for a while to think thoughrouly what the best strucure, or the best way is. The time you spent on thinking should be much more than writing.

4. Rome is not built in one day. Split the whole project into smaller parts and implement them each. And try to decouple as much as possible.
