const Produto = require('../models/Produto');

module.exports ={
    async indexFilter(req,res){
        const data=req.headers.data_validadeentrada
        const secao=req.headers.secao
        var hora=" 08:00:00"
        if (secao !== "Todos"){
            const filterProduto = await Produto.find({status:true,data_validade:{$lte:data+hora},valor:secao}).sort({data_validade: 'asc'});
            return res.json(filterProduto);
        }
        else{
            const filterProduto = await Produto.find({status:true,data_validade:{$lte:data+hora}}).sort({data_validade: 'asc'});
            return res.json(filterProduto);
        }
    }
}