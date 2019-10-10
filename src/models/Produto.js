const {Schema, model} = require('mongoose');

const ProdutoSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    codigo:{
        type: Number,
        required:true,
    },
    quantidade:{
        type: Number,
        required:false,
    },
    data_validade:{
        type: Date,
        required:true,
    },
    valor:{
        type:Number,
        required: true,
    },
    status:{
        type:Boolean,
        required: true,
    },
},{
    timestamps:true
});

module.exports = model('Produto', ProdutoSchema);

