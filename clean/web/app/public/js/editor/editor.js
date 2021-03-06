(function () {
    'use strict';

    function Editor(name) {

        const store = new app.Store();

        /* Create your component tree */
        const root = document.getElementById('editor');

        const update = (state, prevState) => {

            const newChild = app.MazeComponent(state, this.child, store);

            if (this.child && newChild !== this.child) {
                root.removeChild(this.child);
            }
            if (newChild) {
                root.appendChild(newChild);
                this.child = newChild;
            }
        };

        store.subscribe(update);
    }

    const editor = new Editor('editor-app');

    app.editor = editor;

})();
