const mazeController = require('./controllers/maze');
const express = require('express');

const router = express.Router();

// Populate all requests with local user information
router.use((req, res, next) => {

    if (req.user) {

        /* eslint-disable no-param-reassign */
        req.locals = {
            user: {
                display: req.user, // FIXME - This is a terrible hack.
                email: req.user
            }
        };
        /* eslint-enable no-param-reassign */

    }

    next();
});

router.get('/', (req, res) => {
    res.redirect(307, 'maze/');
});

router.get('/maze/', mazeController.list);
router.get('/maze/:maze/', mazeController.read);
router.get('/maze/:maze/edit/', mazeController.edit);
router.get('/maze/:maze/run/', mazeController.run);

router.use('/maze/', express.static(__dirname + '/public'));

module.exports = router;
