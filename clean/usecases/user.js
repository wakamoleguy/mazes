const User = require('../entities/user');
const Maze = require('../entities/maze');

const DEFAULT_SIZE = 9;

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

    },

    add(email, display, userRepository, mazeRepository) {

        return userRepository.browse(email).then((existingUsers) => {

            if (existingUsers.length !== 0) {
                return false;
            }

            const newUser = new User(email, display);
            const mazes = ['Maze 0', 'Maze 1', 'Maze 2'].
                map((name) => new Maze(DEFAULT_SIZE, newUser, name));

            const userSaved = userRepository.add(
                newUser.id,
                newUser.email,
                newUser.display);

            const mazesSaved = mazes
                .map((maze) => mazeRepository.add(
                    maze.id,
                    maze.size,
                    maze.creator.id,
                    maze.name,
                    maze.revisions));

            return Promise.all([userSaved, ...mazesSaved]).then(() => true);
        });
    },

    browse(email, userRepository) {

        return userRepository.browse(email);
    }
};
