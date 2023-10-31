const Sequelize = require("sequelize");

//Config conexao do banco de dados
// Testar a conexao com o banco de dados
const sequelize = new Sequelize('postagens', 'postgres', 'segreds', {
    host: "localhost",
    dialect: 'postgres'
});
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!");
}).catch(function(erro){
    console.log("Falha na conexao!: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}