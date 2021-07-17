const fs = require('fs');

module.exports =  class Role{
    static colors = {"gold": 0xf1c40f, "lightGreen": 0x00ff00, "blue": 0x3498db, "red": 0xe74c3c, "darkGray":0x607d8b }

    constructor(roleID, title, description, image, color) {
		this.RoleID = roleID;
		this.Title = title;
        this.Description = description;
		this.Image = image;
        this.Color = color;
	}

    loadRoles(){
        let dataFile = fs.readFileSync('./data/roles.json', 'utf8');
        let roleData = JSON.parse(dataFile);
        let roleList = [];

        roleData.forEach(element => {
            roleList.push(new Role(element.roleID, element.title, element.description, element.image, element.color));
        });

        return roleList;
    }
}