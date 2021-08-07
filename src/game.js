const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const Player = require('../src/player.js');
const Role = require('../src/role.js');
const randomWords = require('random-words');

module.exports = class Game {
  constructor(name, creator, createdOn, users) {
    this.Name = name ?? this.createName();
    this.Creator = creator;
    this.CreatedOn = createdOn;
    this.Players = users;
  }
  /**
   * Generated unique name. If name exists in gameList then a new one will generated until no duplicate is found
   */

  createName() {
    let gameList = Game.loadGames();
    let gameName = randomWords({
      exactly: 1,
      wordsPerString: 2,
      separator: '-',
      maxLength: 6,
    })[0];
    while (gameList.some((g) => g.Name === gameName)) {
      gameName = randomWords({
        exactly: 1,
        wordsPerString: 2,
        separator: '-',
        maxLength: 6,
      })[0];
    }

    return gameName;
  }
  /**
   * Returns [] of Games loaded rom currentGames.json
   */
  static loadGames() {
    let gameList = [];
    let dataFile = fs.readFileSync('./data/currentGames.json', 'utf8');
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

    return gameList;
  }
  /**
   * Returns [] of Roles loaded from roles.json file
   */
  static loadRoles() {
    let roleList = [];
    let dataFile = fs.readFileSync('./data/roles.json', 'utf8');
    if (dataFile === '') return roleList;

    let roleData = JSON.parse(dataFile);

    roleData.forEach((element) => {
      roleList.push(
        new Role(
          element.roleID,
          element.title,
          element.description,
          element.image,
          element.color,
          element.emote
        )
      );
    });

    return roleList;
  }
  /**
   * Saved Game object to currentGames.json
   * @param  {Game} game
   */
  static saveGame(game) {
    let gameList = Game.loadGames();
    gameList.push(game);
    let gameJSON = JSON.stringify(gameList);

    fs.writeFileSync('./data/currentGames.json', gameJSON);
  }
  /**
   * @param  {Player[]} users
   */
  assignPlayerRoles(users) {
    let list = [];
    let role = null;
    let index = null;
    let roles = Game.loadRoles();

    users.forEach(function (user) {
      role = roles[Math.floor(Math.random() * roles.length)];
      list.push(new Player(user, role));
      index = roles.indexOf(role);
      if (index !== -1) {
        roles.splice(index, 1);
      }
    });
    // set assigned Players to Game object
    this.Players = list;
  }
  /**
   * Constructs an embed message to send to each User in the Player[] for the current game object
   */
  messagePlayers() {
    try {
      this.Players.forEach((player) => {
        let embed = new MessageEmbed();
        embed.setColor(Role.colors[player.Role.Color]);
        embed.setDescription(player.Role.Description);
        embed.setTitle(player.Role.Title);
        embed.setThumbnail('attachment://role.png');
        let message = {
          embed,
          files: [
            {
              attachment: player.Role.Image,
              name: 'role.png',
            },
          ],
        };
        player.User.send(message);
      });
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Returns game to matches the name and creator values
   * @param  {string} name
   * @param  {string} creator
   */
  static selectGameByName(name, creator) {
    let gameList = Game.loadGames();
    let result = gameList.filter((g) => {
      return g.Name === name && g.Creator === creator;
    });

    if (result === [] || !result.length) throw new Error('Game not found');

    return result[0];
  }
  /**
   * Returns most recent game created by the creator value
   * @param  {string} creator
   */
  static selectLatestGameByCreator(creator) {
    let gameList = Game.loadGames();
    let creatorGames = gameList.filter((g) => {
      return g.Creator === creator;
    });

    let orderedGames = creatorGames.sort((a, b) => {
      return a.CreatedOn < b.CreatedOn ? 1 : -1;
    });

    if (orderedGames === [] || !orderedGames.length)
      throw new Error('No Game found for this user');

    return orderedGames[0];
  }
  /**
   * Returns embed message that lists all the Players and their roles
   * @param  {Game} game
   */
  static revealRoles(game) {
    let revealEmbed = new MessageEmbed();
    let playerOrder = game.Players.sort((a, b) =>
      a.Role.RoleID > b.Role.RoleID ? 1 : -1
    );

    revealEmbed.addField(`Game`, `${game.Name}`);

    playerOrder.forEach((player) => {
      revealEmbed.addField(
        `${player.User.tag}`,
        `${player.Role.Title} ${player.Role.Emote}`
      );
    });
    return revealEmbed;
  }
  /**
   * Removed game entry from currentGames.json
   * @param  {string} gameName
   */
  static removeGameByName(gameName) {
    let gameList = Game.loadGames();
    gameList = gameList.filter((g) => {
      return g.Name !== gameName;
    });

    let gameJSON = JSON.stringify(gameList);

    fs.writeFileSync('./data/currentGames.json', gameJSON);
  }
  /**
   * Removes Game objects older than 6 hours
   */
  static cleanUpOldGames() {
    let expiredTime = new Date(Date.now());
    expiredTime.setHours(expiredTime.getHours() - 6);
    let date = expiredTime.toLocaleDateString('en-US');
    let time = expiredTime.toLocaleTimeString('en-US');
    let fullExpiredTime = new Date(`${date} ${time}`);
    let gameList = Game.loadGames();

    gameList = gameList.filter((g) => {
      // only return Games that have a CreatedOn greater than the expiredTime meaning they were made after that time
      return new Date(g.CreatedOn) > fullExpiredTime;
    });

    let gameJSON = JSON.stringify(gameList);

    fs.writeFileSync('./data/currentGames.json', gameJSON);
  }
};
