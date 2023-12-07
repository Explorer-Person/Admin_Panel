const { QueryTypes } = require("sequelize");
const sequelize = require("../../myDB");
const SuperUser = require("../../../models/userModels/superUser");

class SuperUserQueries {

  constructor(users, userIds, cols) {
    this.users = users;
    this.userIds = userIds;
    this.cols = cols;
  }
   createTable = async () => {
    if(!this.users) {
       return false;
    }
    const result = await sequelize.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name= :tableName);",
    {
      replacements: { tableName: 'super_users' },
      type: QueryTypes.SELECT,
    }
    );
    const isTableExists = result[0].exists;
    if(!isTableExists){
        await SuperUser.sync({force: false, alter: true});
        const newUser = await SuperUser.bulkCreate(this.users);
        return newUser;
    }
    else{
        const newUser = await SuperUser.bulkCreate(this.users);
        return newUser;
    }
    
  };

   updateUser = async () => {
    if(!this.users){
      return false;
    }
    const existsUsers = await SuperUser.findAll();

    const existsUserId = existsUsers.map(user=>{
      return user.user_id;
    });
    
    const matchedElements = await existsUserId.filter(element=> this.userIds.includes(element));

    const elementsWillUpdated = await this.users.filter(user=> matchedElements.some(id=> id === user.user_id));
    const elementsWillAdded = await this.users.filter(user=> !matchedElements.includes(user.user_id));
    const elementsWillDeleted = await existsUsers.filter(user=> !matchedElements.includes(user.user_id));
    const elementsWillDeletedIds = await elementsWillDeleted.map(element=> element.user_id);

    const updateUser = await SuperUser.bulkCreate(elementsWillUpdated, {
      updateOnDuplicate: this.cols
    });
    const addUser = await SuperUser.bulkCreate(elementsWillAdded);
    const deleteUser = await SuperUser.destroy({where: {user_id: elementsWillDeletedIds}});

    return {updateUser:updateUser,addUser: addUser,deleteUser: deleteUser};
  }

  static getAllUser = async () => {
    const [result] = await sequelize.query("SHOW TABLES LIKE 'super_users';");
    if(result.length===0){
        return false;
    }else{
      const results = await SuperUser.findAll();
      return results;
    }
    
  };
  
  static getUser = async (username) => {
    if (username) {
      const results = await SuperUser.findOne({where: {username: username}});
      return results;
    }
    return false;
  };
  
}

module.exports = SuperUserQueries;
