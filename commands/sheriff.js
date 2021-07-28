const Game = require("../src/game.js");

module.exports = {
  name: "sheriff",
  description: "Create new sheriff game",
  execute(client, message, args) {
    let numberOfPlayers = message.mentions.users.size;
    // if(numberOfPlayers < 5){
    //     return message.channel.send('Five players are needed for a game of sheriff');
    // }
    // if(numberOfPlayers > 5){
    //     return message.channel.send('Too many players for a game of sheriff');
    // }


    let creator = `${message.author.tag}`;
    let date = new Date(Date.now()).toLocaleDateString("en-US");
    let time = new Date(Date.now()).toLocaleTimeString("en-US");
    let createdOn = `${date} ${time}`;
    let users = message.mentions.users;
    let newGame = new Game(null, creator, createdOn, null);
    newGame.assignPlayerRoles(users);
    newGame.messagePlayers();
    Game.saveGame(newGame);

    let sheriff = newGame.Players.find((player) => {
      return player.Role.RoleID === 1;
    });
    message.reply(
      `Good luck Sheriff ${sheriff.User.tag}! Game name ${newGame.Name}`
    );
  },
};
