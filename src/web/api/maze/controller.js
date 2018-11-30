const view = require('./view')

const mazeRepository = require('../../../adapters/db/mongodb/maze_repository')
const mazeUsecases = require('../../../usecases/maze')

module.exports = {
  read(req, res) {
    const mazeId = req.params.id

    mazeUsecases.read(mazeId, mazeRepository).then((maze) => {
      res.set('Content-Type', 'application/json')
      res.send(view.render(maze))
    })
  },

  edit(req, res) {
    const mazeId = req.params.id

    const newMap = req.body.map

    console.log('Editing', mazeId, req.body)

    if (newMap === undefined) {
      res.sendStatus(200)
      return
    }

    mazeUsecases.updateMap(mazeId, newMap, mazeRepository).then(() => {
      res.sendStatus(200)
    })
  }
}
