const Produto = require('../models/Produto');

module.exports ={
    async indexFilter(req,res){
        const data=req.headers.data_validadeentrada
        const filterProduto = await Produto.find({status:true,data_validade:{$lte:data}}).sort({data_validade: 'asc'});
        console.log(data)
        return res.json(filterProduto);
    }
}