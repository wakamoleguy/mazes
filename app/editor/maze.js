(function () {
  'use strict';

  function MazeComponent(state, prevNode, store) {

    const node = prevNode?
      prevNode:
      createNode();

    const dimension = state.size;

    if (dimension !== node.dataset.size) {
      node.dataset.size = dimension;
    }

    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {

        let prevTile = node.children[i * dimension + j];

        let tile = app.TileComponent(
          state.map[i][j],
          prevTile
        );

        if (tile !== prevTile) {

          ((row, column) => {
            tile.addEventListener('click', () => {
              store.dispatch({ action: 'TOGGLE_TILE', row, column });
            });
          })(i, j);

          prevTile?
            node.replaceChild(tile, prevTile):
            node.appendChild(tile);
        }
      }
    }

    return node;
  }

  function createNode() {

    const node = document.createElement('article');
    node.id = 'maze';
    return node;
  }

  app.MazeComponent = MazeComponent;
})();
