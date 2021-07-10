const fs = require('fs');
class Game{
    constructor(creator, createdOn, players){
        this.Creator = creator;
        this.CreatedOn = createdOn;
        this.Players = players;
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
}