const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

// Config
// Template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
    //Home
    app.get('/', function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            console.log(posts);
            res.render('home', { posts: posts })
        });
    });

    //Cadastro Postagem
    app.get('/cadastro', function(req, res){
        res.render('formulario')
    });

    app.post('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(function(){
            console.log("Post criado com sucesso!")
            res.redirect("/")
        }).catch(function(erro){
            res.send("Ocorreu um erro ao criar o Post: " + erro)
        });
    });

    app.get('/deletar/:id', function(req, res){
        Post.destroy({
            where: {
                'id': req.params.id
            }
        }).then(function(){
            console.log("Post deletado com Sucesso!")
            res.redirect("/") 
        }).catch(function(erro){
            res.send("Ocorreu um erro ao criar o Post: " + erro)
        });
    });

app.listen(8081, function(){
    console.log("Servidor rodando na url: https://localhost:8081")
});