module.exports = class Player {
  constructor(user, role) {
    this.User = user;
    this.Role = role;
  }
  /**
   * Sends embed message string to the User
   * @param  {string} message
   */
  send(message) {
    this.User.send(message);
  }
};
