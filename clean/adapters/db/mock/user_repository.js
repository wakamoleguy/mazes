const INITIAL_DATA = require('./data');

function createRepo(data) {

    return {

        readByEmail(email) {

            return new Promise((resolve) => {

                const users = Object.values(data.users);

                const match = users.find((user) => user.email === email);

                resolve(match || null);
            });
        },

        add(newUser) {

            return new Promise((resolve, reject) => {

                const users = Object.values(data.users);

                if (users.some((user) => user.id === newUser.id)) {
                    reject('Cannot add new user, duplicate ID');
                } else if (users.some((user) => user.email === newUser.email)) {
                    reject('Cannot add new user, duplicate email');
                } else {

                    const newUsers = { ...data.users };
                    newUsers[newUser.id] = newUser;

                    const newData = {
                        users: newUsers,
                        mazes: data.mazes
                    };

                    resolve(createRepo(newData));
                }
            });
        }
    };
}

module.exports = createRepo(INITIAL_DATA);
