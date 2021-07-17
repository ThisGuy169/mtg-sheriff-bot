// empty file for right now

const Role = require('../src/role.js');
const Player = require('../src/player.js');
let role = new Role();
let player = new Player();
console.log(Role.colors);

let players = ['1', '2', '3', '4', '5'];

let assigned = player.assignPlayers(players, role.loadRoles())

console.log(assigned)

let test = 1;
