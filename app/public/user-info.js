export default function UserInfo(state, prevNode, store) {

    // TODO - Avoid rerendering if user didn't change?
    const node = document.createElement('p');

    const displayName = state && state.user && state.user.display;

    if (displayName) {
        node.appendChild(document.createTextNode('Hello, '));
        node.appendChild(document.createTextNode(displayName));
        node.appendChild(document.createTextNode('!'));
    }

    return node;
}
