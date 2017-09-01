const mazeListController = require('./controllers/maze_list');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect(307, 'maze/');
});

router.get('/maze/', mazeListController);

router.use('/maze/:maze/edit', express.static(__dirname + '/editor'));
router.use('/maze/:maze/run', express.static(__dirname + '/runner'));
router.use('/maze/', express.static(__dirname + '/public'));

module.exports = router;
