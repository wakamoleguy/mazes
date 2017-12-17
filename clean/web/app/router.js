const adminController = require('./controllers/admin');
const mazeController = require('./controllers/maze');
const express = require('express');

const userRepo = require('../../adapters/db/mongodb/user_repository');
const readUser = require('../../usecases/user').readUser;

const router = express.Router();

// Populate all requests with local user information
router.use((req, res, next) => {

    if (req.user) {

        readUser(req.user, userRepo).then((result) => {

            /* eslint-disable no-param-reassign */
            req.locals = {
                user: result.user
            };
            /* eslint-enable no-param-reassign */

            next();
        });
    } else {

        next();
    }
});

router.get('/', (req, res) => {
    res.redirect(307, 'maze/');
});

router.param('maze', (req, res, next) => next());

router.get('/maze/', mazeController.list);
router.post('/maze/', mazeController.add);
router.get('/maze/create/', mazeController.create);
router.get('/maze/:maze/', mazeController.read);
router.get('/maze/:maze/edit/', mazeController.edit);
router.get('/maze/:maze/run/', mazeController.run);

router.use('/maze/', express.static(__dirname + '/public'));

router.use('/admin/', adminController.dashboard);

module.exports = router;
