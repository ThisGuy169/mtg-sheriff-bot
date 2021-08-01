// empty file for right now

const Role = require('./role.js');
const Player = require('./player.js');
const Game = require('./game.js');
let role = new Role();
let player = new Player();

// let game = new Game((Name = null), "me", Date.now(), null);
try {
  let game = Game.selectGameByName('month-since');
  console.log('🚀 ~ file: playground.js ~ line 12 ~ game', game);
} catch (error) {
  console.log(error);
}
// console.log(game);

// game.saveGame(game);

// let players = ['1', '2', '3', '4', '5'];
// let creator = `me`;
// 		// 07/16/2021 7:51:47 PM
// 		let date = new Date(Date.now()).toLocaleDateString("en-US");
// 		let time = new Date(Date.now()).toLocaleTimeString("en-US");
// 		let createdOn = `${date} ${time}`;

// let newGame = new Game(creator, createdOn, players);

// let sheriff = newGame.Players.find(player => {
//     return player.Role.RoleID === 1
// });

// let test = 1;
