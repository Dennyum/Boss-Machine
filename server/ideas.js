const ideasRouter = require('express').Router();
const morgan = require('morgan')
const checkMillionDollarIdea = require('./checkMillionDollarIdea');


module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

ideasRouter.use(morgan('dev'))
ideasRouter.use('/',(req,res,next) => {
    console.log("---------------------------------")
    console.log("\n")
    console.log(`${req.method} Request to /ideas Received`);
    next();
})

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
      req.idea = idea;
      next();
    } else {
      res.status(404).send();
    }
  });

ideasRouter.get('/',(req,res,next) => {
    res.send(getAllFromDatabase('ideas'));
})

ideasRouter.post('/',checkMillionDollarIdea,(req,res,next) => {
    let newIdea = addToDatabase('ideas',req.body)
    res.status(201).send(newIdea)
})

ideasRouter.get('/:ideaId',(req,res,next) => {
    res.send(req.idea)
})

ideasRouter.put('/:ideaId',checkMillionDollarIdea,(req,res,next) => {
    let updateIdea = updateInstanceInDatabase('ideas',req.body)
    res.send(updateIdea)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
      res.status(204).send("Eliminated");
    } else {
      res.status(500).send();
    }
  });
  
