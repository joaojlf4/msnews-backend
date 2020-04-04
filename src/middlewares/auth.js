require('dotenv').config();

import jwt from 'jsonwebtoken';

const authConfig = process.env.AUTH;

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: "No token provided." });

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).send({ error: "Invalid token." });

  const [scheme, token] = parts;

  if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Invalid token." });

  jwt.verify(token, authConfig, (err, decoded) => {
    if(err) return res.status(401).send({ error: "Invalid token." });

    req.userId = decoded.id;

    return next();
  })
}