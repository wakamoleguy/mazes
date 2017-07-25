(function () {
  'use strict';

  function MazeComponent(root) {

    this.root = root;
  }

  MazeComponent.prototype = {

    render(state, prevState) {

      const numTiles = state.dimension * state.dimension;

      for (let i = 0; i < numTiles; i++) {

        let tileButton = document.createElement('div');
        tileButton.type = 'button';
        tileButton.className = 'tile';
        tileButton.dataset.type = 'floor';

        // TODO: tileButton.addEventListener('click', function () {

        this.root.appendChild(tileButton);
      }
    }
  };

  app.MazeComponent = MazeComponent;
})();
