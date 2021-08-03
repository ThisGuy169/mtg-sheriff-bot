const Game = require('../src/game.js');

module.exports = {
  name: 'reveal',
  description: 'Reveals the roles from the previous game',
  execute(client, message, args) {
    if (message === '') {
      return message.channel.send('No Sheriff Game name given.');
    }

    try {
      let revealGame =
        args.length !== 0
          ? Game.selectGameByName(args[0], `${message.author.tag}`)
          : Game.selectLatestGameByCreator(`${message.author.tag}`);
      let embedMessage = Game.revealRoles(revealGame);
      Game.removeGameByName(revealGame.Name);
      message.reply(embedMessage);
    } catch (e) {
      message.channel.send(e.message);
    }
  },
};
