const express = require('express')
const router = express.Router()
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

router.get('/', function(req, res, next) {
  res.json({})
})

const users = {
  1: { email: 'test@test.com' }
}
router.get('/users/:id', function(req, res, next) {
  if(Object.keys(users).indexOf(req.params.id) > -1) {
    res.json(users[req.params.id])
  } else {
    res.status(404).json({})
  }
})
module.exports = router
