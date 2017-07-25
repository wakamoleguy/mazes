(function () {
  'use strict';

  function Editor(name) {

    // FIXME: This shouldn't need to be public.
    const store = this.store = new app.Store();

    /* Create your component tree */
    const root = document.getElementById('maze');
    const mazeComponent = new app.MazeComponent(root);

    store.subscribe((state, prevState) => {
      return mazeComponent.render(state, prevState);
    });

    mazeComponent.render(store.state);
  }

  const editor = new Editor('editor-app');

  app.editor = editor;

})();
