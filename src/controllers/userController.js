require('dotenv').config();

import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const controller = {
  async create(req, res){
    try{

      const { name, email, password, phone } = req.body;
  
      let newUser = await User.findOne({ email })
  
      if(newUser){ 
        return res.status(404).send({ error: "User already exists." })
      }

      if(!req.headers.authorization) 
        return res.status(401).send({ error: "You don't have permission to access this resource." });

      if(req.headers.authorization === process.env.USER_TOKEN){
        newUser = await User.create({
          name,
          email, 
          password,
          phone,
        })
    
        newUser.password = undefined;
  
        const token = jwt.sign({id: newUser.id}, process.env.AUTH, {
          expiresIn: 86400
        });
    
        return res.send({newUser, token})
      }else{
        return res.status(401).send({ error: "You don't have permission to access this resource." });
      }
    }catch(err){
      return res.send({ error: "There was an error." })
    }
  },
  async authenticate(req, res){
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user) return res.status(404).send({ error: "User not found." });

    if(!await bcrypt.compare(password, user.password)){
      return res.status(404).send({ error: "Invalid password." })
    }

    user.password = undefined;

    const token = jwt.sign({id: user.id}, process.env.AUTH, {
      expiresIn: 86400
    });

    return res.send({ user, token })
  },
};

export default controller;