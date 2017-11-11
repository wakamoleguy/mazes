const User = require('../entities/user');

module.exports = {

    populateUser(verifiedEmail, userRepo) {

        return userRepo.readByEmail(verifiedEmail).then((maybeFoundUser) => {

            if (maybeFoundUser) {

                return {
                    user: maybeFoundUser,
                    userRepo
                };
            } else {

                const newUser = new User(verifiedEmail, verifiedEmail).raw();

                return userRepo.add(newUser).then((newRepo) => ({
                    user: newUser,
                    userRepo: newRepo
                }));
            }
        });

    }
};
