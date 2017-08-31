export default function MazeList(state, prevNode, store) {

    // TODO - Avoid rerendering if nothing changed?
    const listNode = document.createElement('ul');

    const mazes = state && state.mazes || [];

    const children = mazes.map((maze) => {
        const node = document.createElement('li');

        const name = document.createElement('h2');
        name.className = 'name';
        name.appendChild(document.createTextNode(maze.name));
        node.appendChild(name);

        const editLink = document.createElement('a');
        editLink.innerHTML = 'Edit';
        editLink.className = 'edit';
        editLink.href = maze._id + '/edit/';
        node.appendChild(editLink);

        const runLink = document.createElement('a');
        runLink.innerHTML = 'Run';
        runLink.className = 'run';
        runLink.href = maze._id + '/run/';
        node.appendChild(runLink);

        return node;

    }).forEach((node) => listNode.appendChild(node));

    return listNode;
}
