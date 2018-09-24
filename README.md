# PlusOne

A game inspired by cell merging mobile games.

[![Build Status](https://travis-ci.org/TimothyJones/PlusOne.svg?branch=master)](https://travis-ci.org/TimothyJones/PlusOne)
[![Pact Status](https://test.pact.dius.com.au/pacts/provider/The%20Plus%20One%20Game%20ScoreBoard%20Service/consumer/The%20Plus%20One%20Game%20Client/latest/badge.svg)](https://test.pact.dius.com.au/pacts/provider/The%20Plus%20One%20Game%20ScoreBoard%20Service/consumer/The%20Plus%20One%20Game%20Client/latest)

You can play it [here](https://timothyjones.github.io/PlusOne/).

## Instructions

The cell with the highest number is white. This is your score, and bigger is better.

You can merge cells that share the same number as long as they're touching. Merged cells increase their number by one.

Bonus: Each time you merge white cells, the lowest numbered cells also fall off the board.

## Technology

Written in [React](https://reactjs.org/), as a practice project. It includes / uses:

* Browser local storage provided with [store.js](https://github.com/marcuswestin/store.js/)
* CSS transitions / animations with a misuse of [react-transition-group](https://reactcommunity.org/react-transition-group/css-transition)
* Unit tests with [Jest](https://facebook.github.io/jest/) and [Enzyme](http://airbnb.io/enzyme/)
* Contract tests with a score board server with [Pact](https://docs.pact.io/)
* Type checking with [flow-types](https://flow.org/)
* Linting with [eslint](https://eslint.org/), and considerable configuration to get it to play nice with react and prettier
* Overridden webpack config with [react-app-rewired](https://github.com/timarney/react-app-rewired)
* Code structure following [this guide](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) from [@alexmngn](https://twitter.com/alexmngn)
