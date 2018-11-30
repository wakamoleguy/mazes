const controller = require('./user')
const userUseCases = require('../../../usecases/user')

describe('User controller', () => {
  let req, res

  const ned = {
    display: 'Ned Stark',
    email: 'ned@stark.example.com',
    id: 'id:001'
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
      spyOn(userUseCases, 'browse').and.returnValue(
        Promise.resolve([ned, ned, ned])
      )
    })

    it('should render the user', (done) => {
      controller.browse(req, res, () => {
        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            user: ned
          })
        )

        done()
      })
    })

    it('should fetch users', (done) => {
      userUseCases.browse.and.returnValue(Promise.resolve([1, 2, 3]))

      controller.browse(req, res, () => {
        expect(userUseCases.browse).toHaveBeenCalledWith(jasmine.any(Object))

        expect(res.render).toHaveBeenCalledWith(
          jasmine.any(String),
          jasmine.objectContaining({
            users: [1, 2, 3]
          })
        )

        done()
      })
    })
  })
})
