"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _new = require('../models/new'); var _new2 = _interopRequireDefault(_new);

const controller = {
  async index(req, res){
    try{
      const newTitle = req.query.title || '';

      if(newTitle){
        const selectedNew = await _new2.default.findOne({
          slug: newTitle
      });

        if(!selectedNew) return res.status(404).send({ error: "New does not exist." })
        return res.send(selectedNew)
      }

      const page = req.query.page;
  
      if(page > -1){

        const news = await _new2.default.paginate({}, {
          page: Number(page), limit: 10
        })

        return res.send(news)
      }

    const news = await _new2.default.paginate({}, {
      page: 1, limit: 10
    })
    return res.send(news)
    }catch(err){
      return res.status(404).send({ error: err.message })
    }
  },
  async store(req, res){

    try{
      const { title, eye, pictureUrl, markdown } = req.body;

      const newArticle = await _new2.default.create({
        title,
        eye,
        pictureUrl,
        markdown
      })
      return res.send(newArticle)

    }catch(err){
      return res.status(404).send({ error: err.message})
    }
  },
  async update(req, res){
    try{
      const id = req.params.id;
      const { title, author, bodyData, eye, pictureUrl } = req.body;

      if(!id || !req.body) return res.status(404).send({ error: "You need didn't provided data enough." });
      
      const newModel = await _new2.default.findById(id);

      if(!newModel) return res.status(404).send({ error: "Invalid new." })

      const updatedNew = await _new2.default.findByIdAndUpdate(id, {
        title,
        author,
        bodyData,
        eye,
        pictureUrl
      }, {new: true})

      return res.status(201).send();
    }catch(err){
      if(err.message === 'Cast to ObjectId failed for value "52" at path "_id" for model "New"'){
        return res.status(404).send({ error: "Invalid id." })
      }
      return res.status(404).send({ error: err.message })
    }

  },
  async delete(req, res){
    try{
      const id = req.params.id;

      if(!id) return res.status(404).send({ error: "You need to provide an id." });

      if(!await _new2.default.findById(id)) return res.status(404).send({ error: "New is invalid." })

      await _new2.default.findByIdAndDelete(id)

      return res.status(201).send();
    }catch(err){
      return res.status(401).send();
    }
  },
}

exports. default = controller;
