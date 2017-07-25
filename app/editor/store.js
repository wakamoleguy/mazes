(function () {
  'use strict';

  function Store() {

    /* Calling with no action returns the initial state
     * {
     *   name: 'Untitled Maze',
     *   id: uuid,
     *   dimension: 9,
     *   maze: [[0, 0, 0, ...], ...],
     */
    this.state = this.reduce({}, null);

    this.subscribers = [];
  };

  Store.prototype = {

    reduce(prevState, action) {

        return {
          name: updateName(prevState, action),
          id: updateId(prevState, action),
          dimension: updateDimension(prevState, action),
          maze: updateMaze(prevState, action)
        };
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

  function updateId(prevState, action) {
    return prevState.id || 0;
  }

  function updateDimension(prevState, action) {
    return prevState.dimension || 9;
  }

  function updateMaze(prevState, action) {
    const niner = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    return prevState.maze || niner;
  }

  app.Store = Store;

})();
