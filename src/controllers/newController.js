import New from '../models/new';

const controller = {
  async index(req, res){
    try{
      const newTitle = req.query.title || '';

      if(newTitle){
        const selectedNew = await New.findOne({
          slug: newTitle
      });

        if(!selectedNew) return res.status(404).send({ error: "New does not exist." })
        return res.send(selectedNew)
      }

      const page = req.query.page;
  
      if(page > -1){

        const news = await New.paginate({}, {
          page: Number(page), limit: 10
        })

        return res.send(news)
      }

    const news = await New.paginate({}, {
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

      const newArticle = await New.create({
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
      
      const newModel = await New.findById(id);

      if(!newModel) return res.status(404).send({ error: "Invalid new." })

      const updatedNew = await New.findByIdAndUpdate(id, {
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

      if(!await New.findById(id)) return res.status(404).send({ error: "New is invalid." })

      await New.findByIdAndDelete(id)

      return res.status(201).send();
    }catch(err){
      return res.status(401).send();
    }
  },
}

export default controller;
