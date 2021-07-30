const Game = require("../src/game.js");

module.exports = {
  name: "reveal-roles",
  description: "Reveals the roles from the previous game",
  execute(client, message, args) {
    if (message === "" || args.length === 0) {
      return message.channel.send("No Sheriff Game name given.");
    }
    try {
      let revealGame = Game.selectGameByName(args[0]);
      let embedMessage = Game.revealRoles(revealGame);
      Game.removeGameByName(revealGame);
      message.reply(embedMessage);
    } catch (e) {
      message.channel.send(e.message);
    }
  },
};
