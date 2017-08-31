// User interactions go here.

module.exports = {

    browse(userId, userRepository) {

        return userRepository.browse(userId);
    }
};
