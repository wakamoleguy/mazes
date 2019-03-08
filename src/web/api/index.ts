import * as maze from './maze/controller'
import * as user from './user/controller'

import * as express from 'express'
import * as bodyParser from 'body-parser'

module.exports = () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // Nothing in the API is public
  //app.use(authDriver.support())
  // app.use(authDriver.restricted({}))

  app.get('/user/', user.browse)
  // app.post('/user/', user.add);
  // app.delete('/user/:id', user.delete);

  // app.get('/maze/', maze.browse);
  app.get('/maze/:id', maze.read)
  app.put('/maze/:id', maze.edit)
  // app.post('/maze/', maze.add);
  // app.delete('/maze/:id', maze.delete);

  // app.get('/maze/:maze/revision/:id', revision.read);
  // app.put('/maze/:maze/revision/:id', revision.add);

  return app
}
