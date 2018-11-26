const uuidv4 = require('uuid/v4')

module.exports = {
  browseByCreator(userId, mazeRepo) {
    return mazeRepo.browseByCreator(userId).then((mazes) => {
      if (mazes.some((maze) => !maze.revisions)) {
        throw new Error('Bad Data: Expected mazes to have revisions')
      }

      return mazes
    })
  },

  read(mazeId, mazeRepo) {
    return mazeRepo.read(mazeId)
  },

  updateMap(mazeId, newMap, mazeRepo) {
    return mazeRepo
      .updateMap(mazeId, newMap)
      .then(() => true)
      .catch(() => false)
  },

  create(name, size, creatorId, mazeRepo) {
    const id = uuidv4()

    // Mazes are created with a blank revision (for now)
    const revision = {
      id: id + 'r0',
      maze: id,
      version: 0,
      start: { x: 0, z: 0, direction: 'east' },
      destination: { x: -1, z: 0 },
      map: Array(size)
        .fill()
        .map(() => Array(size).fill(0))
    }

    const maze = {
      id,
      size,
      name,
      creator: creatorId,
      revisions: [revision]
    }

    return mazeRepo.add(maze).then((newRepo) => ({
      maze,
      mazeRepo: newRepo
    }))
  }
}
