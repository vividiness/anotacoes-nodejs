//express pra usar server
const express = require("express") //server
const app = express()
const handlebars = require("express-handlebars") //html
const bodyParser = require('body-parser') //receber dados de forms dentro do express.
const Sequelize = require("sequelize") //mysql
const Post = require("./models/Post");
//--------------------------------------------------------------------------------------//

//config
    //template engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//conexão banco de dados MysSQL
const sequelize = new Sequelize('test', 'root', '861488', {
    host: "localhost",
    dialect: "mysql"
});

//bodyParse
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//rotas
app.get('/', function(req,res){
    //e ainda põe em ordem decrescente, ou seja, do mais recente ao antigo.
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){ //retorna todos os dados da tabela Postagens
        res.render('home', {posts: posts})
    })  
});

app.get('/cad', function(req, res){
    res.render('formulario') //exibindo meu formulário pras postagens.
});

app.post('/add', function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
       // res.send("Post criado com sucesso!") -> mensagem confirmando que foi criado a postagem e enviado pro DB
       //redirecionar para outra página:
       res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro" + erro)
    })
   // req.body.titulo --> requisita do body do html o titulo
   //res.send("Texto: "+req.body.titulo+ "Conteudo: "+req.body.conteudo) pra mostrar o conteúdo na página.
});

//excluindo dados 
app.get('/deletar/:id', function(req,res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){  //excluindo o dado onde o 'id' é o que foi passado na URL pelo botão
        res.send("Postagem deletada com sucesso!")
    }).catch(function(erro){
        res.send('Esta postagem não existe!')
    })  
})

app.listen(8081, function () {
    console.log("Servidor rodando na URL http://localhost:8081");
})
