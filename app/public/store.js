export default function Store() {

    this.state = {
        user: null,
        mazes: null
    };

    this.subscribers = [];
};

Store.prototype = {

    reduce(prevState, action) {
        const newState = {
            user: action.user || prevState.user,
            mazes: action.mazes || prevState.mazes
        };

        return newState;
    },

    subscribe(fn) {
        this.subscribers.push(fn);
    },

    dispatch(action) {

        const prevState = this.state;
        this.state = this.reduce(prevState, action);
        this.subscribers.forEach((fn) => fn(this.state, prevState));
    }
};
