(function () {
  'use strict';

  const el = {
    mazeList: document.getElementById('maze-list')
  };

  function clearList() {
    while (el.mazeList.children.length > 0) {
      el.mazeList.removeChild(el.mazeList.children.item(1));
    }
  }

  function editMaze(name) {
    console.log('Editing maze', name);
  }

  function copyMaze(name) {
    console.log('Copying maze', name);
  }

  function viewMaze(name) {
    console.log('Viewing maze', name);
  }

  function MazeListView(props, actions) {

    const node = el.mazeList;
    clearList();

    const mazes = props.mazes;

    const listItems = mazes.map((maze) => {

      return app.MazeListItemView({
        name: maze.name
      }, {
        edit(props) { editMaze(props.name) },
        copy(props) { copyMaze(props.name) },
        view(props) { viewMaze(props.name) }
      });
    });

    listItems.forEach((li) => {
      node.appendChild(li);
    });

    return node;
  }

  app.MazeListView = MazeListView;
})();
