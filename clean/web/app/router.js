const mazeController = require('./controllers/maze');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect(307, 'maze/');
});

router.get('/maze/', mazeController.list);
router.get('/maze/:maze/edit', mazeController.edit);
router.get('/maze/:maze/run', mazeController.run);

router.use('/maze/', express.static(__dirname + '/public'));

module.exports = router;
