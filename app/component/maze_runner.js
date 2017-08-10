import './three.min.js';
import { scene, camera } from './objects.js';

document.addEventListener('keydown', (e) => {
  console.log('document', e.key);
}, false)

class MazeRunner extends HTMLElement {

    static get observedAttributes() {
        return [
            'data-name'
        ];
    }

    constructor() {
        super();

        console.log('map', JSON.parse(this.getAttribute('data-map')));
        console.log('dir', this.getAttribute('data-starting-z'));
        console.log('dir', this.getAttribute('data-starting-x'));
        console.log('dir', this.getAttribute('data-starting-direction'));

        const shadow = this.attachShadow({ mode: 'open' });

        const shadowStyles = document.createElement('style');
        shadowStyles.innerText = `
        .my-canvas {
            opacity: 0.5;
            cursor: pointer;
        }

        .my-canvas:focus {
            opacity: 1;
        }
        `;
        shadow.appendChild(shadowStyles);

        const title = document.createElement('h1');
        title.innerText = this.getAttribute('data-name');
        shadow.appendChild(title);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(600, 400);
        shadow.appendChild(renderer.domElement);

        renderer.render(scene(), camera());

        renderer.domElement.tabIndex = 0;
        renderer.domElement.className = 'my-canvas';
        renderer.domElement.addEventListener('keydown', (e) => {
            console.log('canvas', e.key);
        }, false);

        // img.addEventListener('click', () => {
        //     window.location = this.getAttribute('data-url');
        // });
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        console.log(attr, oldValue, newValue);
        if (attr === 'data-name') {
            this.shadowRoot.querySelector('h1').innerText = newValue;
        }
    }
}

customElements.define('maze-runner', MazeRunner);
