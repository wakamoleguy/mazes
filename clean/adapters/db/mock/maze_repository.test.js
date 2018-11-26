const repo = require('./maze_repository')

describe('Mock Maze Repository', () => {
  describe('browseByCreator', () => {
    it('should resolve to a list of mazes if user exists', (done) => {
      repo
        .browseByCreator('id:001')
        .then((mazes) => {
          expect(mazes).toBeDefined()
          expect(mazes.length).toBe(1)

          done()
        })
        .catch(done.fail)
    })

    it('should include revisions with the mazes resolved', (done) => {
      repo.browseByCreator('id:001').then((mazes) => {
        const maze = mazes[0]

        expect(maze.revisions).toBeDefined()
        expect(maze.revisions.length).toBe(3)
        expect(maze.revisions[2]).toEqual({
          id: 'm1r2',
          maze: 'm1',
          version: 2,
          start: {
            x: 0,
            z: 0,
            direction: 'east'
          },
          destination: {
            x: 8,
            z: 8
          },
          map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
          ]
        })

        done()
      })
    })

    it('should resolve to an empty list if user has no mazes', (done) => {
      repo
        .browseByCreator('id:004')
        .then((mazes) => {
          expect(mazes).toEqual([])
          done()
        })
        .catch(done.fail)
    })

    it('should resolve to an empty list if the userId is bad', (done) => {
      repo
        .browseByCreator('InvalidUserId')
        .then((mazes) => {
          expect(mazes).toEqual([])
          done()
        })
        .catch(done.fail)
    })
  })

  describe('read', () => {
    it('should resolve to a maze if it exists', (done) => {
      repo.read('m1').then((maybeMaze) => {
        expect(maybeMaze).not.toBeNull()
        expect(maybeMaze.id).toBe('m1')
        expect(maybeMaze.revisions.length).toBe(3)

        done()
      })
    })

    it('should resolve to different mazes with different ids', (done) => {
      repo.read('m6').then((maybeMaze) => {
        expect(maybeMaze).not.toBeNull()
        expect(maybeMaze.id).toBe('m6')
        expect(maybeMaze.revisions.length).toBe(1)

        done()
      })
    })

    it('should resolve to null if no maze found', (done) => {
      repo.read('foobar').then((maybeMaze) => {
        expect(maybeMaze).toBeNull()

        done()
      })
    })
  })

  describe('updateMap', () => {
    const newMap = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    it('should resolve to a new repo', (done) => {
      repo
        .updateMap('m1', newMap)
        .then((newRepo) => {
          expect(newRepo).not.toBe(repo)

          // Make sure it looks like a repo
          expect(newRepo.updateMap).toBeDefined()
          expect(newRepo.browseByCreator).toBeDefined()

          done()
        })
        .catch(done.fail)
    })

    it('should contain the updated maze in the new repo', (done) => {
      repo
        .updateMap('m1', newMap)
        .then((newRepo) => newRepo.read('m1'))
        .then((maze) => {
          expect(maze.revisions).toBeDefined()
          expect(maze.revisions[maze.revisions.length - 1]).toEqual(newMap)

          done()
        })
        .catch(done.fail)
    })

    it('should not update the maze in the old repo', (done) => {
      repo
        .updateMap('m1', newMap)
        .then(() => repo.read('m1'))
        .then((maze) => {
          expect(maze.revisions).toBeDefined()
          expect(maze.revisions[maze.revisions.length - 1]).not.toEqual(newMap)

          done()
        })
        .catch(done.fail)
    })

    it('should throw if the size is bad', (done) => {
      repo.updateMap('m1', [[0, 0], [0, 0]]).then(done.fail, done)
    })

    it('should throw if the maze does not exist', (done) => {
      repo.updateMap('foobar', newMap).then(done.fail, done)
    })
  })

  describe('add', () => {
    const thewall = {
      id: 'm101',
      name: 'The Wall',
      creator: 'id:001',
      size: 9,
      revisions: [
        {
          id: 'm101r0',
          maze: 'm101',
          version: 0,
          start: {
            x: 0,
            z: 0,
            direction: 'east'
          },
          destination: {
            x: 8,
            z: 8
          },
          map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
          ]
        }
      ]
    }

    it('should resolve to a new repo', (done) => {
      repo
        .add(thewall)
        .then((newRepo) => {
          expect(newRepo).not.toBe(repo)
          expect(newRepo.read).toBeDefined()
          expect(newRepo.browseByCreator).toBeDefined()

          done()
        })
        .catch(done.fail)
    })

    it('should contain the maze in the new repo', (done) => {
      repo
        .add(thewall)
        .then((newRepo) => newRepo.read(thewall.id))
        .then((maybeFoundMaze) => {
          expect(maybeFoundMaze).toEqual(thewall)

          done()
        })
        .catch(done.fail)
    })

    it('should not add the maze to the old repo', (done) => {
      repo
        .add(thewall)
        .then(() => repo.read(thewall.id))
        .then((maybeFoundMaze) => {
          expect(maybeFoundMaze).toBeNull()

          done()
        })
        .catch(done.fail)
    })

    it('should should throw if the id conflicts', (done) => {
      const badwinterfell = { ...thewall, id: 'm1' }

      repo.add(badwinterfell).then(done.fail, done)
    })

    // Other tests for data constraints?
  })
})
