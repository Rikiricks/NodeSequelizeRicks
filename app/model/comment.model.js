
module.exports = (sequelize, dataTypes) =>{
 const comments = sequelize.define("comment",{
     name : dataTypes.STRING,
     text: dataTypes.STRING     
 });

 return comments;

}
