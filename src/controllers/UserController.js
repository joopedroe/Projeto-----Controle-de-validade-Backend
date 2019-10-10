const bcrypt = require('bcrypt');
const User = require('../models/Users.js');
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let userController ={};

userController.allUsers = (req, res)=>{
    modelUser.find()
        .then(results => res.json(results))
        .catch(err => res.send(err));
}

module.exports= userController;

userController.newUser=(req,res)=>{
    if(req.body.username && req.body.password){
        if(req.body.password2 && req.body.password == req.body.password2){

            modelUser.findOne({'username':req.body.username})
                .then(user=>{
                    if(user){
                        res.json({sucess:false,message:'Username inválido'});
                    }else{
                        bcrypt.hash(req.body.password,10)
                            .then(hash =>{
                                let encryptedPassword = hash;

                                let newUser = new modelUser({
                                    name:req.body.name,
                                    cargo:req.body.cargo,
                                    username:req.body.username,
                                    password:encryptedPassword,
                                    isAdmin:req.body.isAdmin
                                });

                                newUser.save()
                                    .then(()=>res.json({success:true,massage:'Usuário criado com sucesso',statusCode:201}))
                                    .catch(err=> res.json({sucess:false, message:err,statusCode:500}));
                            })

                            .catch(err=> res.json({sucess:false, message:err,statusCode:500}));
                    }
                })
        }else{
            res.json({sucess:false, message:'Senha Inválida',statusCode:400});
        }
    }else{
        res.json({sucess:false, message:'Usuário e senha Inválidos',statusCode:400});
    }
}