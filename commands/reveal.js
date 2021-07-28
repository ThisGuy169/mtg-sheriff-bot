const Game = require("../src/game.js");

module.exports = {
  name: "reveal-roles",
  description: "Reveals the roles from the previous game",
  execute(client, message, args) {
    if (message === "") {
      return message.channel.send("No Sheriff Game name given.");
    }
    if (args[0] === "") {
      return message.channel.send("No Sheriff Game name given.");
    }

    let revealGame = Game.selectGameByName(args[0]);
    let embedMessage = Game.revealRoles(revealGame);
    message.reply(embedMessage);
  },
};
