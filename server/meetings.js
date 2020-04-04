const meetingsRouter = require('express').Router();
const morgan = require('morgan')

module.exports = meetingsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    deleteAllFromDatabase,
    createMeeting
  } = require('./db');

meetingsRouter.use(morgan('dev'))
meetingsRouter.use('/',(req,res,next) => {
    console.log("---------------------------------")
    console.log("\n")
    console.log(`${req.method} Request to /meetings Received`);
    next();
})

meetingsRouter.get('/',(req,res,next) => {
    res.send(getAllFromDatabase('meetings'))
})

meetingsRouter.post('/',(req,res,next) => {
    const meeting = addToDatabase('meetings',createMeeting())
    res.status(201).send(meeting)
})

meetingsRouter.delete('/',(req,res,next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send()
})