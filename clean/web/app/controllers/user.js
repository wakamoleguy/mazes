const userRepository = require('../../../adapters/db/mongodb/user_repository')
const userUseCases = require('../../../usecases/user')

module.exports = {
  browse(req, res, next) {
    const user = req.locals.user

    userUseCases.browse(userRepository).then(
      (users) => {
        res.render('pages/user', {
          user,
          users
        })

        next()
      },
      (err) => {
        console.error(err)
        res.sendStatus(500)
        next()
      }
    )
  }
}
