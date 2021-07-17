module.exports = class Player{
	constructor(user, role) {
		this.User = user;
		this.Role = role;
	}

	send(message){
		this.User.send(message);
	}
}