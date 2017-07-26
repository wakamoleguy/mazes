(function () {
  'use strict';

  function Editor(name) {

    const store = new app.Store();

    /* Create your component tree */
    const root = document.getElementById('editor');

    const mazeComponent = new app.MazeComponent(store);

    const update = (state, prevState) => {

      const newChild = mazeComponent.render(state, this.child);

      if (this.child && newChild !== this.child) {
        root.removeChild(this.child);
      }
      if (newChild) {
        root.appendChild(newChild);
        this.child = newChild;
      }
    };

    store.subscribe(update);
    update(store.state);
  }

  const editor = new Editor('editor-app');

  app.editor = editor;

})();
