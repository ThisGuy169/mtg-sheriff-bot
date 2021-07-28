const Game = require("../src/game.js");

module.exports = {
  name: "reveal-roles",
  description: "Reveals the roles from the previous game",
  execute(client, message, args) {
    if (message === "") {
      return message.channel.send("No Sheriff Game name given.");
    }

    let revealGame = Game.selectGameByName(message);
    Game.revealRoles(revealGame);
  },
};
