const User = require("../../../models/userModels/user");
const sequelize = require("../../myDB");

class UserQueries {
  constructor(users, userIds, cols) {
    this.users = users;
    this.userIds = userIds;
    this.cols = cols;
  }
   createTable = async () => {
    if(!this.users) {
       return false;
    }
    const [result] = await sequelize.query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name= 'users')");
    const isTableExists = result[0].exists;
    if(!isTableExists){
        await User.sync({force: false, alter: true});
        const newUser = await User.bulkCreate(this.users);
        return newUser;
    }
    else{
        const newUser = await User.bulkCreate(this.users);
        return newUser;
    }
    
  };

   updateUser = async () => {
    if(!this.users){
      return false;
    }
    const existsUsers = await User.findAll();

    const existsUserId = existsUsers.map(user=>{
      return user.user_id;
    });
    
    const matchedElements = await existsUserId.filter(element=> this.userIds.includes(element));

    const elementsWillUpdated = await this.users.filter(user=> matchedElements.some(id=> id === user.user_id));
    const elementsWillAdded = await this.users.filter(user=> !matchedElements.includes(user.user_id));
    const elementsWillDeleted = await existsUsers.filter(user=> !matchedElements.includes(user.user_id));
    const elementsWillDeletedIds = await elementsWillDeleted.map(element=> element.user_id);

    const updateUser = await User.bulkCreate(elementsWillUpdated, {
      updateOnDuplicate: this.cols
    });
    const addUser = await User.bulkCreate(elementsWillAdded);
    const deleteUser = await User.destroy({where: {user_id: elementsWillDeletedIds}});

    return {updateUser:updateUser,addUser: addUser,deleteUser: deleteUser};
  }

  static getAllUser = async () => {
    const [result] = await sequelize.query("SHOW TABLES LIKE 'users';");
    if(result.length===0){
        return false;
    }else{
      const results = await User.findAll();
      return results;
    }
    
  };
  static getUser = async (username) =>{
    if(!username) {
      return false;
    } 
    const user = await User.findOne({where: {username: username}});

    return user;
  }
}

module.exports = UserQueries;
