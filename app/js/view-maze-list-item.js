(function () {
  'use strict';

  const templateCache = {};

  function Template(id, tag, params) {
    const template = templateCache[id] ||
      (templateCache[id] = document.getElementById(id));

    const node = document.createElement(tag);
    node.innerHTML = template.innerHTML;

    for (let key in params) {
      node.dataset[key] = params[key];
      let keyNode = node.querySelector('.' + key);
      if (keyNode) {
        keyNode.innerHTML = params[key];
      }
    }

    return node;
  }

  function MazeListItemView(props, actions) {

    const node = new Template('maze-list-item-template', 'li', {
      name: props.name
    });

    node.querySelector('button.edit').addEventListener('click', () => {
      actions.edit(props);
    }, false);
    node.querySelector('button.copy').addEventListener('click', () => {
      actions.copy(props);
    }, false);
    node.querySelector('button.view').addEventListener('click', () => {
      actions.view(props);
    }, false);

    return node;
  }

  app.MazeListItemView = MazeListItemView;

})();
