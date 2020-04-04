const minionsRouter = require('express').Router();
const morgan = require('morgan')


module.exports = minionsRouter;

const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db')

minionsRouter.use(morgan('dev'))
minionsRouter.use('/',(req,res,next) => {
    console.log("---------------------------------")
    console.log("\n")
    console.log(`${req.method} Request to /minions Received`);
    next();
})

minionsRouter.param('minionId',(req,res,next,id) => {
    const minion = getFromDatabaseById('minions',id)
    if(minion){
        req.minion = minion;
        next()
    }else{
        res.status(404).send()
        console.log(`Minion with ID: ${id} -> NOT FOUND!\n` )
    }
})

minionsRouter.get('/',(req,res,next) => {
    res.send(getAllFromDatabase('minions'));
})

minionsRouter.post('/',(req,res,next) => {
    const newMinion = addToDatabase('minions',req.body)
    res.status(201).send(newMinion)
})

minionsRouter.get('/:minionId',(req,res,nex) => {
    res.send(req.minion)
})

minionsRouter.put('/:minionId',(req,res,nex) => {
let updatedMinionInstance = updateInstanceInDatabase('minions',req.body)
res.send(updatedMinionInstance)
})

minionsRouter.delete('/:minionId',(req,res,next) => {
    const deleted = deleteFromDatabasebyId('minions',req.params.minionId)
    if(deleted){
        res.status(204)
    }else{
        res.status(500)
    }
    res.send();
})

// FOR WORK

minionsRouter.get('/:minionId/work',(req,res,next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    console.log(work)
    res.send(work);
})

minionsRouter.post('/:minionId/work',(req,res,next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createWork = addToDatabase('work',workToAdd)
    res.status(201).send(createWork)
})

minionsRouter.param('workId',(req,res,next,id) => {
    const work = getFromDatabaseById('work',id)
    if(work){
        req.work = work;
        next()
    }else{
        res.status(404).send()
    }
})

minionsRouter.put('/:minionId/work/:workId',(req,res,next) => {
    if(req.params.minionId !== req.body.minionId){
        res.status(404).send()
    }else{
        let updateWork = updateInstanceInDatabase('work',req.body)
        res.send(updateWork)
    }
});

minionsRouter.delete('/:minionId/work/:workId',(req,res,next) => {
    const deleted = deleteFromDatabasebyId('work',req.params.workId)
    if(deleted){
         res.status(204).send()
     }else{
         res.status(500).send()
     }
    }
)