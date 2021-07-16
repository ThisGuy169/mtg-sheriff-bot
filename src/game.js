const fs = require('fs');
const Role = require('../src/role.js');
module.exports = class Game{
    constructor(creator, createdOn, players){
        this.Creator = creator;
        this.CreatedOn = createdOn;
        this.Players = players;
        this.roles = this.loadRoles();
    }

    loadGames(){
        let gameList = [];
        let dataFile = fs.readFile('./data/currentGames.json', 'utf8');
        let gameData = JSON.parse(dataFile);

        gameData.forEach(element => {
            gameList.pop(new Game(element.Creator, element.CreatedOn, element.Players));
        });

        return gameList;
    }

    loadRoles(){
        let dataFile = fs.readFileSync('./data/roles.json', 'utf8');
        let roleData = JSON.parse(dataFile);
        let roleList = [];

        roleData.forEach(element => {
            roleList.push(new Role(element.roleID, element.title, element.description, element.image, element.color));
        });

        return roleList;
    }

}