module.exports = class User {

    constructor(id, email, display) {

        if (id === null || id === undefined) {
            throw new Error('User must have Id');
        }

        if (email === null || email === undefined || email === '') {
            throw new Error('User must have Email');
        }

        if (display === null || display === undefined || display === '') {
            throw new Error('User must have Display');
        }

        if (email === id) {
            throw new Error('User email cannot be used as ID');
        }

        this.id = id;
        this.email = email;
        this.display = display;
    }
};
