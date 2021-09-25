const Game = require('../src/game.js');

let loadedGame = Game.selectGameByName('month-since', 'ThisGuy169#9969');

let miniTest = Game.minimizeGameObject(loadedGame);

console.log(miniTest);
let test = 1;
