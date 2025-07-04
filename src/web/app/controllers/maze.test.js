const controller = require('./maze')
const mazeUseCases = require('../../../usecases/maze')

describe('Maze controller', () => {
  let req, res

  const ned = {
    display: 'Ned Stark',
    email: 'ned@stark.example.com',
    id: '001'
  }

  beforeEach(() => {
    req = {}
    res = jasmine.createSpyObj('res', ['render', 'sendStatus'])

    req.locals = {
      user: ned
    }
  })

  describe('browse', () => {
    beforeEach(() => {
      spyOn(mazeUseCases, 'browseByCreator').and.returnValue(
        Promise.resolve([])
      )
    })

    it('should render the maze list index page', (done) => {
      controller.list(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          'pages/maze',
          jasmine.any(Object)
        )

        done()
      })
    })

    it('should render the user', (done) => {
      controller.list(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            user: ned
          })
        )

        done()
      })
    })

    it('should fetch mazes for the user by creator id', (done) => {
      mazeUseCases.browseByCreator.and.returnValue(Promise.resolve([1, 2, 3]))

      controller.list(req, res, () => {
        expect(mazeUseCases.browseByCreator).toHaveBeenCalledWith(
          ned.id,
          jasmine.any(Object)
        )

        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            mazes: [1, 2, 3]
          })
        )

        done()
      })
    })
  })

  describe('read', () => {
    beforeEach(() => {
      req.params = {
        maze: '123ABC'
      }

      spyOn(mazeUseCases, 'read').and.returnValue(Promise.resolve('A'))
    })

    it('should render the maze details page', (done) => {
      controller.read(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          'pages/maze_view',
          jasmine.any(Object)
        )

        done()
      })
    })

    it('should render the user', (done) => {
      controller.read(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            user: ned
          })
        )
        done()
      })
    })

    it('should fetch the maze from the repository', (done) => {
      controller.read(req, res, () => {
        expect(mazeUseCases.read).toHaveBeenCalledWith(
          '123ABC',
          jasmine.any(Object)
        )

        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            maze: 'A'
          })
        )
        done()
      })
    })

    it('should abort if the maze id looks like "create"', (done) => {
      req.params = {
        maze: 'create'
      }

      controller.read(req, res, () => {
        expect(mazeUseCases.read).not.toHaveBeenCalled()
        expect(res.render).not.toHaveBeenCalled()

        done()
      })
    })
  })

  describe('edit', () => {
    beforeEach(() => {
      req.params = {
        maze: '123ABC'
      }

      spyOn(mazeUseCases, 'read').and.returnValue(Promise.resolve('A'))
    })

    it('should render the maze edit page', (done) => {
      controller.edit(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          'pages/maze_edit',
          jasmine.any(Object)
        )

        done()
      })
    })

    it('should render the user', (done) => {
      controller.edit(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            user: ned
          })
        )
        done()
      })
    })

    it('should fetch the maze from the repository', (done) => {
      controller.edit(req, res, () => {
        expect(mazeUseCases.read).toHaveBeenCalledWith(
          '123ABC',
          jasmine.any(Object)
        )

        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            maze: 'A'
          })
        )
        done()
      })
    })
  })

  describe('create', () => {
    it('should render a new maze creation form', (done) => {
      controller.create(req, res, () => {
        expect(res.render).toHaveBeenCalledWith('pages/maze_create')

        done()
      })
    })
  })

  describe('add', () => {
    const name = 'The Wall'

    beforeEach(() => {
      req.body = {
        name
      }

      spyOn(mazeUseCases, 'create').and.returnValue(Promise.resolve('A'))
      spyOn(mazeUseCases, 'browseByCreator').and.returnValue(
        Promise.resolve([1, 2, 3])
      )
    })

    it('should create a maze', (done) => {
      controller.add(req, res, () => {
        expect(mazeUseCases.create).toHaveBeenCalledWith(
          name,
          9,
          ned.id,
          jasmine.any(Object)
        )

        done()
      })
    })

    it('should render the maze list page', (done) => {
      controller.add(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          'pages/maze',
          jasmine.any(Object)
        )

        done()
      })
    })

    it('should send an error if there was no name found', (done) => {
      req.body = {}

      controller.add(req, res, () => {
        expect(res.sendStatus).toHaveBeenCalledWith(400)
        done()
      })
    })

    it('should render the user', (done) => {
      controller.add(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            user: ned
          })
        )
        done()
      })
    })

    it('should fetch mazes for the user by creator id', (done) => {
      controller.add(req, res, () => {
        expect(mazeUseCases.browseByCreator).toHaveBeenCalledWith(
          ned.id,
          jasmine.any(Object)
        )

        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            mazes: [1, 2, 3]
          })
        )

        done()
      })
    })
  })

  describe('delete', () => {})

  describe('run', () => {
    beforeEach(() => {
      req.params = {
        maze: '123ABC'
      }

      spyOn(mazeUseCases, 'read').and.returnValue(Promise.resolve('A'))
    })

    it('should render the maze runner page', (done) => {
      controller.run(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          'pages/maze_run',
          jasmine.any(Object)
        )

        done()
      })
    })

    it('should render the user', (done) => {
      controller.run(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            user: ned
          })
        )
        done()
      })
    })

    it('should fetch the maze from the repository', (done) => {
      controller.run(req, res, () => {
        expect(mazeUseCases.read).toHaveBeenCalledWith(
          '123ABC',
          jasmine.any(Object)
        )

        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            maze: 'A'
          })
        )
        done()
      })
    })
  })
})
