(function () {
  'use strict';


  function TileComponent(type, prevType) {

    const tileButton = document.createElement('div');
    tileButton.type = 'button';
    tileButton.className = 'tile';

    tileButton.dataset.type = type === 0 ? 'floor' : 'wall';

    return tileButton;
  };

  app.TileComponent = TileComponent;
})();
