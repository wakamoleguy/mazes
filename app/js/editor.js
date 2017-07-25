(function () {
  'use strict';

  function Editor(name, models, views) {

    const root = document.getElementById('maze');

    for (let i = 0; i < root.dataset.size * root.dataset.size; i++) {
      let tileButton = document.createElement('div');
      tileButton.type = 'button';
      tileButton.className = 'tile';
      tileButton.dataset.type = 'floor';

      tileButton.addEventListener('click', function () {
        this.dataset.type = this.dataset.type === 'floor'?
          'wall':
          'floor';
      }, false);

      root.appendChild(tileButton);
    }
  }

  const editor = new Editor('editor-app');

  app.editor = editor;

})();
