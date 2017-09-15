const mazeController = require('./controllers/maze');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect(307, 'maze/');
});

router.get('/maze/', mazeController.list);

router.use('/maze/:maze/edit', express.static(__dirname + '/editor'));
router.use('/maze/:maze/run', mazeController.run);
router.use('/maze/', express.static(__dirname + '/public'));

module.exports = router;
