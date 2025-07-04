const adminController = require('./controllers/admin')
const mazeController = require('./controllers/maze')
const userController = require('./controllers/user')
const challengeController = require('./controllers/challenge')
const express = require('express')

const userRepo = require('../../adapters/db/mongodb/user_repository')
const readUser = require('../../usecases/user').readUser

const router = express.Router()

// Populate all requests with local user information
router.use((req, res, next) => {
  if (req.user) {
    readUser(req.user, userRepo).then((result) => {
      /* eslint-disable no-param-reassign */
      req.locals = {
        user: result.user
      }
      /* eslint-enable no-param-reassign */

      next()
    })
  } else {
    next()
  }
})

router.get('/', (req, res) => {
  res.redirect(307, 'maze/')
})

router.get('/maze/', mazeController.list)
router.post('/maze/', mazeController.add)
router.get('/maze/create/', mazeController.create)
router.get('/maze/:maze/', mazeController.read)
router.get('/maze/:maze/edit/', mazeController.edit)
router.get('/maze/:maze/run/', mazeController.run)

router.use('/maze/', express.static(__dirname + '/public'))

router.get('/user/', userController.browse)

router.get('/challenge/', challengeController.browse)
router.post('/challenge/', challengeController.add)
router.get('/challenge/create/', challengeController.create)

router.post('/challenge/:challengeId/', challengeController.accept)
router.get('/challenge/:challengeId/accept/', challengeController.acceptForm)
router.get('/challenge/:challengeId/run/', challengeController.run)
router.post('/challenge/:challengeId/run/', challengeController.postTime)

router.use('/admin/', adminController.dashboard)

module.exports = router
