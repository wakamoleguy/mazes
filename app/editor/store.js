(function () {
  'use strict';

  const mazeId = location.pathname.match(/maze\/([^\/]*)\/?/)[1];

  function Store() {
    /* Calling with no action returns the initial state
     * {
     *   name: 'Untitled Maze',
     *   id: uuid,
     *   dimension: 9,
     *   maze: [[0, 0, 0, ...], ...],
     */

    // Fetch the initial data

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {

     // TODO - handle errors
     const maze = JSON.parse(xhr.responseText);

     this.state = maze;
     this.dispatch('LOADED');
    });

    xhr.open("GET", `http://localhost:3000/api/maze/${mazeId}/`);
    xhr.send();

    this.subscribers = [];
  };

  Store.prototype = {

    reduce(prevState, action) {

        const newState = {
          name: updateName(prevState, action),
          size: updateDimension(prevState, action),
          start: updateStart(prevState, action),
          destination: updateDestination(prevState, action),
          map: updateMaze(prevState, action)
        };

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/api/maze/${mazeId}/`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(newState));

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

  function updateName(prevState, action) {
    return prevState.name || 'Untitled Maze';
  }

  function updateDimension(prevState, action) {
    return prevState.size || 11;
  }

  function updateStart(prevState, action) {
    return prevState.start;
  }

  function updateDestination(prevState, action) {
    return prevState.destination;
  }

  function updateMaze(prevState, action) {

    if (!action || action.action !== 'TOGGLE_TILE') {
      return prevState.map;
    }

    return prevState.map.map((row, y) => row.map((tile, x) => {

      if (action.row === y && action.column === x) {
        return 1 - tile;
      } else {
        return tile;
      }
    }));
  }

  app.Store = Store;

})();
