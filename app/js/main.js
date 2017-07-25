(function () {
  'use strict';

  function MazesApp(name, models, views) {
    return new views.mazeList({
      mazes: models.mazes
    });
  }

  const mazesApp = new MazesApp('mazes-app', {
    mazes: [
      { name: 'First' },
      { name: 'Second' },
      { name: 'Third' }
    ]
  }, {
    mazeList: app.MazeListView,
    mazeListItem: app.MazeListItemView
  });

  app.mazesApp = mazesApp;
  
})();
