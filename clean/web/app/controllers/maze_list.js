module.exports = (req, res) => {

    res.render('maze/index', {
        user: req.user,
        mazes: [] // TODO - Load list of mazes 'here'
    });
};
