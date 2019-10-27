const axios = require('axios');
const Produto = require('../models/Produto');

module.exports =
{
    async store(req, res){
        const { codigoEntrada, name, quantidade, valor, data_validadeEntrada, status} = req.body;

        const produtoExists = await Produto.findOne({codigo: codigoEntrada, data_validade:data_validadeEntrada});
        
        if(produtoExists){
            return res.json(produtoExists);
        }
        

        
       
        
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
        const listaProduto = await Produto.find({status:true}).sort({data_validade: 'asc'});
        return res.json(listaProduto);

    },
    async delete(req, res){
        const id = req.params.proId;
        await Produto.deleteOne({_id:id});
        return res.json({ok:true});
    },

    async alter(req, res){
        const id = req.boby._id;
        await Produto.findById(id,function(err, doc) {  
            if (err) {  
              console.error('error, no entry found');  
            }  
            doc.status = false;  
            doc.save();  
          }) 
        return res.json({ok:true});
    }
};