const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const Player = require("../src/player.js");
const Role = require("../src/role.js");
const randomWords = require("random-words");
module.exports = class Game {
  constructor(name, creator, createdOn, users) {
    this.Name = name ?? this.createName();
    this.Creator = creator;
    this.CreatedOn = createdOn;
    this.Players = users;
  }

  createName() {
    let gameList = Game.loadGames();
    let gameName = randomWords({
      exactly: 1,
      wordsPerString: 2,
      separator: "-",
      maxLength: 6,
    })[0];
    while (gameList.some((g) => g.Name === gameName)) {
      gameName = randomWords({
        exactly: 1,
        wordsPerString: 2,
        separator: "-",
        maxLength: 6,
      })[0];
    }

    return gameName;
  }

  static loadGames() {
    let gameList = [];
    let dataFile = fs.readFileSync("./data/currentGames.json", "utf8");
    if (dataFile === "") return gameList;

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

  static loadRoles() {
    let roleList = [];
    let dataFile = fs.readFileSync("./data/roles.json", "utf8");
    if (dataFile === "") return roleList;

    let roleData = JSON.parse(dataFile);

    roleData.forEach((element) => {
      roleList.push(
        new Role(
          element.roleID,
          element.title,
          element.description,
          element.image,
          element.color
        )
      );
    });

    return roleList;
  }

  static saveGame(game) {
    let gameList = Game.loadGames();
    gameList.push(game);
    let gameJSON = JSON.stringify(game);

    fs.writeFileSync("./data/currentGames.json", gameJSON);
  }

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

  messagePlayers() {
    try {
      this.Players.forEach((player) => {
        let embed = new MessageEmbed();
        embed.setColor(Role.colors[player.Role.Color]);
        embed.setDescription(player.Role.Description);
        embed.setTitle(player.Role.Title);
        embed.setThumbnail("attachment://role.png");
        let message = {
          embed,
          files: [
            {
              attachment: player.Role.Image,
              name: "role.png",
            },
          ],
        };
        player.User.send(message);
      });
    } catch (error) {
      console.error(error);
    }
  }

  static selectGameByName(name) {
    let gameList = Game.loadGames();
    let result = gameList.filter((g) => {
      return g.Name === name;
    });

    if (result === [] || !result) return Error("Game not found");

    return result[0];
  }

  static revealRoles(gameList) {
    let revealEmbed = new MessageEmbed();
    let playerOrder = gameList.Players.sort((a, b) =>
      a.Role.RoleID > b.Role.RoleID ? 1 : -1
    );
    let emotes = Role.emotes;
    playerOrder.forEach((player) => {
      revealEmbed.addField(
        `${player.User.tag}`,
        `${player.Role.Title} ${emotes[player.Role.Color]}`
      );
    });
    return revealEmbed;
  }
};
