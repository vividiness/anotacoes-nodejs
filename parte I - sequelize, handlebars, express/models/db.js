const Sequelize = require('sequelize');

//conexao BD
const sequelize = new Sequelize('postapp', 'root', '861488', {
    host: "localhost",
    dialect: "mysql",
    query: {raw: true} //sem isso aqui não apareceria o contéudo do banco de dados nas páginas 
}); 

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};