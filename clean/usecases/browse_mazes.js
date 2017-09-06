module.exports = function (mazeRepository, email) {

    // FIXME - This conversion from email to userId is not Clean kosher
    return mazeRepository.browse(`id:${email}`);
};
