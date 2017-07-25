(function () {
  'use strict';

  function MazeComponent(root, store) {

    this.root = root;
    this.store = store;
  }

  MazeComponent.prototype = {

    render(state, prevState) {

      this.root.innerHTML = '';

      const dimension = state.dimension;

      for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {

          let tile = app.TileComponent(
            state.maze[i][j],
            prevState && prevState.maze[i][j]
          );

          ((row, column) => {
            tile.addEventListener('click', () => {
              this.store.dispatch({ action: 'TOGGLE_TILE', row, column });
            });
          })(i, j);

          this.root.appendChild(tile);
        }
      }
    }
  };

  app.MazeComponent = MazeComponent;
})();
