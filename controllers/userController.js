const User = require('../models/User');


exports.getAllUsers = async(req, res, next) =>{

    try{
        const user = await User.getAll();
        res.json(user);
    }catch (err){
        next(err);
    }
};

exports.getById = async(req,res,next) =>{
    try{

        const user = await User.getById(req.params.id);
        if(!user){
            return res.status(404).json({message: "el usuario no esta regitrado"})
        }
        res.json(user)
    }catch(err){
        next(err)
    }

};


exports.createUser = async(req,res,next) =>{
  
    try{
        if(!req.body.name){
            return res.status(400).json({message: "el nombre es necesario"})
        }

        if(!req.body.email){
            return res.status(400).json({message: "el email es necesario"})
        }

        const nuevoUser = await User.create(req.body);
        res.status(201).json(nuevoUser);
    }catch(err){
        next(err)
    }
};

exports.updateUsers = async(req,res,next)=>{

    try{
        const usersActualizado = await User.update(req.params.id, req.body);
        if(!usersActualizado){
            return res.status(404).json({message: "Usuario no encontrado"});
        } 

        res.json(usersActualizado);
    }catch(err){
        next(err)
    }

};

exports.deleteUser = async (req,res,next) =>{
    try{
        await User.delete(req.params.id);
        res.json({message: "usuario eliminado correctamente"})
    }catch(err){
        next(err)
    }
};



