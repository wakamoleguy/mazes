import Store from './store.js'

import UserInfo from './user-info.js'
import MazeList from './maze-list.js'

function App() {

    const store = new Store();

    const userInfoRoot = document.getElementById('user-info');
    const mazeListRoot = document.getElementById('maze-list');

    const update = (state, prevState) => {

        // Mount or update the userInfoNode
        const newUserInfo = new UserInfo(state, this.userInfo, store);

        if (this.userInfo && newUserInfo !== this.userInfo) {
            userInfoRoot.removeChild(this.userInfo);
        }
        if (newUserInfo) {
            userInfoRoot.appendChild(newUserInfo);
            this.userInfo = newUserInfo;
        }

        // Mount or update the mazeListNode
        const newMazeList = new MazeList(state, this.mazeList, store);
        if (this.mazeList && newMazeList !== this.mazeList) {
            mazeListRoot.removeChild(this.mazeList);
        }
        if (newMazeList) {
            mazeListRoot.appendChild(newMazeList);
            this.mazeList = newMazeList;
        }
    };

    store.subscribe(update);

    // Fetch initial data
    // TODO - Move this out of the constructor?
    const userPromise = this.fetchUser().then((user) => {

        if (user) {

            return user;
        } else {

            return fetch('/api/user/', {
                credentials: 'include',
                method: 'POST'
            }).then((response) => {

                const mazes = [0, 1, 2].map((n) => {

                    const request = new Request('/api/maze', {
                        credentials: 'include',
                        method: 'POST',
                        body: JSON.stringify({
                            name: `Maze ${n}`,
                            size: 11,
                            start: { z: 9, x: 9, direction: 'west' },
                            destination: { z: 11, x: 1 },
                            map: [
                                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                            ]
                        })
                    });

                    return fetch(request);
                });

                return Promise.all(mazes);
            }).then(() => this.fetchUser());
        }
    }).then((user) => {

        store.dispatch({
            type: 'USER',
            user
        });
    });

    const mazePromise = userPromise.
    then(() => this.fetchMazes()).
    then((mazes) => {

        store.dispatch({
            type: 'MAZES',
            mazes
        });
    });

    mazePromise.then(() => {}, (err) => {
        console.error('error fetching user or mazes');
    });
}

App.prototype = {

    fetchUser() {
        return fetch('/api/user/', {
            credentials: 'include'
        }).
        then((response) => response.json()).
        then((users) => users[0]);
    },

    fetchMazes() {
        return fetch('/api/maze/', {
            credentials: 'include'
        }).
        then((response) => response.json()).
        then((mazes) => mazes); // No further processing right now.
    }
};

const app = new App();

// TODO - export this instead?
window.app = app;
