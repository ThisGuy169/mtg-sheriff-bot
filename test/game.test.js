const Game = require('../src/game.js');
const fs = require('fs');

describe('Sheriff Game', function () {
  let testGameTemplate;
  let game;

  beforeAll(function () {
    let gameList = [];
    let dataFile = fs.readFileSync('./data/testGame.json', 'utf8');
    if (dataFile === '') return gameList;

    let gameData = JSON.parse(dataFile);
    if (!Array.isArray(gameData)) {
      gameData = [gameData];
    }
    gameData.forEach((element) => {
      gameList.push(
        new Game(
          element.Name,
          element.Creator,
          element.CreatedOn,
          element.Players
        )
      );
    });
    testGameTemplate = gameList[0];
  });

  it('Creates new Game', function () {
    game = new Game(
      testGameTemplate.Name,
      testGameTemplate.Creator,
      testGameTemplate.CreatedOn,
      testGameTemplate.Players
    );

    expect(game).toEqual(testGameTemplate);
  });

  it('Saves game and loads game', function () {
    Game.saveGame(game);
    let loadedGame = Game.selectGameByName(
      testGameTemplate.Name,
      testGameTemplate.Creator
    );
    expect(loadedGame).toEqual(testGameTemplate);
  });

  it('Deletes the game', function () {
    Game.removeGameByName(game.Name);
    let dataFile = fs.readFileSync('./data/currentGames.json', 'utf8');
    let gameData = JSON.parse(dataFile);
    expect(gameData).toEqual([]);
  });
});
