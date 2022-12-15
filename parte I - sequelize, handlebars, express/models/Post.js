const db = require('./db');

//tabelas
const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
});

//Post.sync({force: true}) -> se gerou e criou, apaga. 

module.exports = Post; //para acessar o module Post (a tabela Postagens) em outros arquivos.