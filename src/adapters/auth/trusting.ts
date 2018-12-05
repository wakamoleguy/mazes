import session from 'express-session'

const foo = (x: number) => x * 2
console.log(foo('hello'))

export default {
  support() {
    return [
      session({
        secret: 'fixme secret',
        cookie: { maxAge: 60 * 60 * 1000 },
        resave: false, // TODO - Check this option when using prod store
        saveUninitialized: false
      })
    ]
  },

  requestToken: () => (_req, _res, next) => next(),
  acceptToken: () => (_req, _res, next) => next(),
  restricted: () => (req, _res, next) => {
    /* eslint-disable no-param-reassign */
    req.user = 'wakamoleguy@gmail.com'
    /* eslint-enable no-param-reassign */
    next()
  }
}
