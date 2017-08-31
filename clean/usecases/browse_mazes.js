module.exports = function (authService, mazeRepository, userId) {

    if (!authService.isAuthenticated()) {
        return false;
    }

    const mazes = mazeRepository.browse(userId);

    return mazes;
};
