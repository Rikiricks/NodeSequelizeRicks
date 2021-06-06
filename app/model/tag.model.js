
module.exports = (sequalize, Sequelize) =>{
    const tag = sequalize.define("tag",{
        title : Sequelize.STRING
    });

    return tag;
}