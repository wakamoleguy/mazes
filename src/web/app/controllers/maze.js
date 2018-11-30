const mazeRepository = require('../../../adapters/db/mongodb/maze_repository')
const mazeUseCases = require('../../../usecases/maze')

module.exports = {
  list(req, res, next) {
    const user = req.locals.user

    mazeUseCases.browseByCreator(user.id, mazeRepository).then(
      (mazes) => {
        res.render('pages/maze', {
          user,
          mazes
        })

        next()
      },
      (err) => {
        console.error(err)
        res.sendStatus(500)
        next()
      }
    )
  },

  read(req, res, next) {
    const mazeId = req.params.maze

    if (mazeId === 'create') {
      // This was a request for the maze creation form. Abort.
      next()
      return
    }

    mazeUseCases.read(mazeId, mazeRepository).then((maze) => {
      if (maze === null) {
        // No maze found by that id.
        res.sendStatus(404)
      } else {
        res.render('pages/maze_view', {
          maze,
          user: req.locals.user
        })
      }

      next()
    })
  },

  edit(req, res, next) {
    const mazeId = req.params.maze

    mazeUseCases.read(mazeId, mazeRepository).then((maze) => {
      if (maze === null) {
        // No maze found by that id.
        res.sendStatus(404)
      } else {
        res.render('pages/maze_edit', {
          maze,
          user: req.locals.user
        })
      }

      next()
    })
  },

  create(req, res, next) {
    res.render('pages/maze_create')
    next()
  },

  add(req, res, next) {
    const name = req.body.name

    if (!name) {
      res.sendStatus(400)
      next()
      return
    }

    const user = req.locals.user

    mazeUseCases.create(name, 9, user.id, mazeRepository).then(() => {
      mazeUseCases.browseByCreator(user.id, mazeRepository).then(
        (mazes) => {
          res.render('pages/maze', {
            user,
            mazes
          })

          next()
        },
        (err) => {
          console.error(err)
          res.sendStatus(500)
          next()
        }
      )
    })
  },

  run(req, res, next) {
    const mazeId = req.params.maze

    mazeUseCases.read(mazeId, mazeRepository).then((maze) => {
      if (maze === null) {
        // No maze found by that id.
        res.sendStatus(404)
      } else {
        res.render('pages/maze_run', {
          maze,
          user: req.locals.user
        })
      }

      next()
    })
  }
}
