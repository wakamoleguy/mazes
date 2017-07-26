(function () {
  'use strict';

  function TileComponent(type, prevNode) {

    const newType = type === 0 ? 'floor' : 'wall';

    if (prevNode && prevNode.dataset.type === newType) {

      return prevNode;
    } else {

      const tileButton = document.createElement('div');
      tileButton.type = 'button';
      tileButton.className = 'tile';

      tileButton.dataset.type = type === 0 ? 'floor' : 'wall';

      return tileButton;
    }
  };

  app.TileComponent = TileComponent;
})();
