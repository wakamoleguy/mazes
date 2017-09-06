const User = require('../entities/user');
const Maze = require('../entities/maze');

const DEFAULT_SIZE = 9;

module.exports = {

    addSync(email, display, userRepository, mazeRepository) {

        const existingUser = userRepository.browse(email);

        if (existingUser) {
            return false;
        }

        const newUser = new User(email, display);

        const mazes = ['Maze 0', 'Maze 1', 'Maze 2'].
        map((name) => new Maze(DEFAULT_SIZE, newUser, name));

        userRepository.add(newUser.id, newUser.email, newUser.display);
        mazes.forEach((maze) => {
            mazeRepository.add(maze.id, maze.size, maze.name, maze.revisions);
        });

        return true;
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
