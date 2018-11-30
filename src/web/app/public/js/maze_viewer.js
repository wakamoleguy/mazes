function MazeViewerStyle() {
    const el = document.createElement('style');
    el.innerText = `

    .map {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        height: 200px;
        width: 200px;
        position: relative;
    }

    .map > * {
        height: 9.1%;
        width: 9.090909090%;
    }

    div[data-tile-type] {
        border: 1px solid black;
        box-sizing: border-box;
    }

    div[data-tile-type="0"] {
       background: white;
    }

    div[data-tile-type="1"] {
       background: black;
    }

    div[data-tile-type="-1"] {
        background: gray;

    }
    div[data-tile-type="-2"] {
        background: green;
    }
    div[data-tile-type="-3"] {
        background: blue;
    }

    `;

    return el;
}

// FIXME - This list should probably be global-ish
const TILE = {
    WALL: 1,
    FLOOR: 0,
    OUTER_WALL: -1,
    START: -2,
    DESTINATION: -3,
}

class MazeViewer extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.appendChild(MazeViewerStyle());

        const title = document.createElement('h6');
        title.innerText = this.getAttribute('data-name');
        shadow.appendChild(title);

        const map = JSON.parse(this.getAttribute('data-map'));
        const start = {
            x: parseInt(this.getAttribute('data-starting-x'), 10),
            z: parseInt(this.getAttribute('data-starting-z'), 10),
            direction: this.getAttribute('data-starting-direction')
        };
        const destination = {
            x: parseInt(this.getAttribute('data-destination-x'), 10),
            z: parseInt(this.getAttribute('data-destination-z'), 10)
        };

        // Create a wider map that includes outer walls and destination
        const widerMap = Array(map.length + 2).fill().map(
            () => Array(map.length + 2).fill(TILE.OUTER_WALL));

        for (let x = 0; x < widerMap.length; x++) {
            for (let z = 0; z < widerMap.length; z++) {

                if (x - 1 === destination.x && z - 1 === destination.z) {

                    widerMap[x][z] = TILE.DESTINATION;

                } else if (x - 1 === start.x && z - 1 === start.z) {

                    widerMap[x][z] = TILE.START;

                } else if (
                    x !== 0 && z !== 0 &&
                    x !== widerMap.length - 1 && z !== widerMap.length - 1
                ) {

                    widerMap[x][z] = parseInt(map[x-1][z-1], 10);
                }
            }
        }

        const mapElement = document.createElement('div');
        mapElement.className = 'map';

        widerMap.forEach((row) => row.forEach((tile) => {

            const tileElement = document.createElement('div');
            tileElement.dataset.tileType = tile;
            mapElement.appendChild(tileElement);
        }));

        shadow.appendChild(mapElement);
    }
}

customElements.define('maze-viewer', MazeViewer);
