class Player{
	constructor(person, role) {
		this.Person = person;
		this.Role = role;
	}

	assignPlayers(mentions, roles){
		let list = [];
		let person = null;
        let role = null;

		mentions.forEach(function(mention){
            person = mention;
            role = roles[Math.random(roles.length)];
            list.append(new Player(person, role));
            roles.remove(role);
		});
		// return list of assign Players
		return list;
	}

}