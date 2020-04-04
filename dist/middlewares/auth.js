"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv').config();

var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const authConfig = process.env.AUTH;

exports. default = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: "No token provided." });

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).send({ error: "Invalid token." });

  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Invalid token." });

  _jsonwebtoken2.default.verify(token, authConfig, (err, decoded) => {
    if(err) return res.status(401).send({ error: "Invalid token." });

    req.userId = decoded.id;

    return next();
  })
}