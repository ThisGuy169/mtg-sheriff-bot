const fs = require('fs');
class Role{
    constructor(roleID, title, description, image, color) {
		this.RoleID = roleID;
		this.Title = title;
        this.Description = description;
		this.Image = image;
        this.Color = color;
	}

    loadRoles(){
        let dataFile = fs.readFile('./data/roles.json', 'utf8');
        let roleData = JSON.parse(dataFile);
        let roleList = [];

        roleData.forEach(element => {
            roleList.pop(new Role(element.RoleID, element.Title, element.Description, element.Image, element.Color));
        });

        return roleList;
    }
}