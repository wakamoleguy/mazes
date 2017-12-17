module.exports = {

    populateUser(verifiedEmail, userRepo) {

        if (verifiedEmail.substr(0, 3) === 'id:') {
            throw new Error(`Expected email but found ID: ${verifiedEmail}`);
        }

        return userRepo.readByEmail(verifiedEmail).then((maybeFoundUser) => {

            if (maybeFoundUser) {

                return {
                    user: maybeFoundUser,
                    userRepo
                };
            } else {

                const newUser = { // XCXC - Abstract entity literals
                    id: 'id:' + verifiedEmail,
                    email: verifiedEmail,
                    display: verifiedEmail
                };

                return userRepo.add(newUser).then((newRepo) => ({
                    user: newUser,
                    userRepo: newRepo
                }));
            }
        });
    },

    readUser(userId, userRepo) {

        if (userId.substr(0, 3) !== 'id:') {
            throw new Error(`Expected ID but no prefix found: ${userId}`);
        }

        return userRepo.read(userId).then((maybeFoundUser) => {

            if (maybeFoundUser) {
                return {
                    user: maybeFoundUser,
                    userRepo
                };
            } else {
                return {
                    user: null,
                    userRepo
                };
            }
        });
    },

    browse(userRepo) {

        return userRepo.browse();
    }
};
