module.exports = {

    populateUser(verifiedEmail, userRepo) {

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

    }
};
