const uuidv4 = require('uuid/v4');

class User {

    constructor(email, display) {

        if (typeof email !== 'string' || email === '') {
            throw new Error('User must have Email');
        }

        if (typeof display !== 'string' || display === '') {
            throw new Error('User must have Display');
        }

        this.id = 'id:' + email;
        this.email = email;
        this.display = display;
    }
};

User.from = (props) => {

    const { id, email, display } = props;

    if (typeof id !== 'string' || id.indexOf('id:') !== 0 || id === email) {

        throw new Error('Invalid id');
    }

    const user = new User(email, display);
    user.id = id;

    return user;
};

module.exports = User;
