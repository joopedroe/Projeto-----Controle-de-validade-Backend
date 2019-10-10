const axios = require('axios');
const Produto = require('../models/Produto');

module.exports =
{
    async store(req, res){
        const { codigoEntrada, quantidade, valor, data_validadeEntrada, status} = req.body;

        const produtoExists = await Produto.findOne({codigo: codigoEntrada, data_validade:data_validadeEntrada});
        
        if(produtoExists){
            return res.json(produtoExists);
        }
        var config = {
            headers: {'X-Cosmos-Token': '8C4kNbESYhlxbs4J61L53w'}
          };
        const response =  await axios.get(`https://api.cosmos.bluesoft.com.br/gtins/${codigoEntrada}`,config).catch(error =>{
            console.log('ok');
            return res.status(404).send({error: 'erro ao buscar produto'});
        } );

        
        const {description:name}= response.data;
        console.log(codigoEntrada+' - '+name+'-'+ quantidade);
        
        const produto = await Produto.create({
            codigo: codigoEntrada,
            name,
            quantidade,
            data_validade: data_validadeEntrada,
            valor, 
            status

        })
        return res.json(produto);
    },
    
    async index(req, res){
        const listaProduto = await Produto.find({status:true});
        return res.json(listaProduto);

    },
    async delete(req, res){
        const id = req.params.proId;
        await Produto.deleteOne({_id:id});
        return res.json({ok:true});
    }
};