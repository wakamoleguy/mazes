import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as router from './router'

// import * as userRepo from '../../adapters/db/mongodb/user_repository'
// import { populateUser } from '../../usecases/user'

// FIXME - This should go elsewhere?
global.process.on('unhandledRejection', (error) => {
  throw error
})

module.exports = () => {
  const app = express()

  // Body parsing and rendering
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.locals.basedir = __dirname + '/views'
  app.set('views', app.locals.basedir)
  app.set('view engine', 'pug')

  // Some things are public
  app.use('/css/', express.static(__dirname + '/public/css'))
  app.use('/js/', express.static(__dirname + '/public/js'))

  // Authentication flow
  app.get('/login/', (req, res) => {
//    if (req.user) {
      res.redirect(app.mountpath + '/')
//    } else {
//      res.sendFile(__dirname + '/login/index.html')
//    }
  })

  app.get('/login/pending/', (req, res) => {
    res.sendFile(__dirname + '/login/pending/index.html')
  })

  // app.post(
  //   '/login/request/',
  //   authDriver.requestToken(
  //     // Turn the email address into a user ID
  //     (email, delivery, callback) => {
  //       populateUser(email, userRepo).then((result) => {
  //         callback(null, result.user.id)
  //       })
  //     },
  //     {
  //       originField: 'origin'
  //     }
  //   ),
  //   (req, res) => {
  //     res.redirect(302, req.baseUrl + '/login/pending/')
  //   }
  // )
  //
  // app.get('/login/request/', (req, res) => res.sendStatus(403))
  //
  // app.get(
  //   '/login/accept/',
  //   authDriver.acceptToken({
  //     enableOriginRedirect: true,
  //     successRedirect: '/'
  //   }),
  //   (req, res) => {
  //     // We land here if the validation failed
  //     if (req.user) {
  //       // You're already logged in, so just go somewhere.
  //       res.redirect(req.baseUrl + '/')
  //     } else {
  //       res.sendStatus(401)
  //     }
  //   }
  // )

  // Routes (protected by authentication flow)
  app.use(router)
  // app.use(
  //   authDriver.restricted({
  //     failureRedirect: '/login/',
  //     originField: 'origin'
  //   }),
  //   router
  // )

  return app
}
