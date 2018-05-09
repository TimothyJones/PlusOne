# PlusOne

A game inspired by cell merging mobile games.

[![Build Status](https://travis-ci.org/TimothyJones/PlusOne.svg?branch=master)](https://travis-ci.org/TimothyJones/PlusOne)

You can play it [here](https://timothyjones.github.io/PlusOne/).

## Instructions

The cell with the highest number is white. This is your score, and bigger is better.

You can merge cells that share the same number as long as they're touching. Merged cells increase their number by one.

Bonus: Each time you merge white cells, the lowest numbered cells also fall off the board.

## Technology

Written in [React](https://reactjs.org/), as a practice project. It includes / uses:

* Unit tests for the game functions with [Jest](https://facebook.github.io/jest/)
* Browser local storage provided with [store.js](https://github.com/marcuswestin/store.js/)
* CSS transitions / animations provided with [react-transition-group](https://reactcommunity.org/react-transition-group/css-transition)
* Type checking with [flow-types](https://flow.org/)
* Code structure following [this guide](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) from [@alexmngn](https://twitter.com/alexmngn)
