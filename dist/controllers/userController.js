"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv').config();

var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const controller = {
  async create(req, res){
    try{

      const { name, email, password, phone } = req.body;
  
      let newUser = await _user2.default.findOne({ email })
  
      if(newUser){ 
        return res.status(404).send({ error: "User already exists." })
      }

      if(!req.headers.authorization) 
        return res.status(401).send({ error: "You don't have permission to access this resource." });

      if(req.headers.authorization === process.env.USER_TOKEN){
        newUser = await _user2.default.create({
          name,
          email, 
          password,
          phone,
        })
    
        newUser.password = undefined;
  
        const token = _jsonwebtoken2.default.sign({id: newUser.id}, process.env.AUTH, {
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

    const user = await _user2.default.findOne({email}).select('+password');

    if(!user) return res.status(404).send({ error: "User not found." });

    if(!await _bcryptjs2.default.compare(password, user.password)){
      return res.status(404).send({ error: "Invalid password." })
    }

    user.password = undefined;

    const token = _jsonwebtoken2.default.sign({id: user.id}, authConfig, {
      expiresIn: 86400
    });

    return res.send({ user, token })
  },
};

exports. default = controller;