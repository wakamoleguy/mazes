import './three.min.js';
import { scene, camera } from './objects.js';

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

        this.camera = camera();
        this.scene = scene();

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

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(600, 400);
        shadow.appendChild(this.renderer.domElement);

        this.renderer.domElement.tabIndex = 0;
        this.renderer.domElement.className = 'my-canvas';
        this.renderer.domElement.addEventListener('keydown', (e) => {
            switch (e.key) {
              case 'w':
                this.forward = 1;
                break;
              case 's':
                this.forward = -1;
                break;
              case 'a':
                this.rotate = 1;
                break;
              case 'd':
                this.rotate = -1;
                break;
              default:
            }
          }, false)

        this.renderer.domElement.addEventListener('keyup', (e) => {
            switch (e.key) {
              case 'w':
              case 's':
                this.forward = 0;
                break;
              case 'a':
              case 'd':
                this.rotate = 0;
                break;
              default:
            }
          }, false);

    }

    connectedCallback() {
        console.log('connected');
        // Put the camera in the starting position.
        // Position the camera based on the starting position
        this.camera.position.x = parseInt(this.getAttribute('data-starting-x'), 10) * 10 + 5;
        this.camera.position.z = parseInt(this.getAttribute('data-starting-z'), 10) * 10 + 5;

        switch (this.getAttribute('data-starting-direction')) {
          case 'west':
          this.camera.rotation.y -= Math.PI / 2;
          case 'south':
          this.camera.rotation.y -= Math.PI / 2;
          case 'east':
          this.camera.rotation.y -= Math.PI / 2;
          case 'north':
          default:
          break;
        }

        // Render the maze
        const wallGeo = new THREE.BoxGeometry(10, 50, 10);

        const maze = JSON.parse(this.getAttribute('data-map'));

        for (let i = 0; i < maze.length; i++) {
            for (let j = 0; j < maze[i].length; j++) {
                if (maze[i][j] === 1) {
                    let material = new THREE.MeshPhongMaterial({
                        color: 0xff0000 + (i * 5120) + (j * 20)
                    });
                    let mesh = new THREE.Mesh(wallGeo, material);
                    mesh.position.x = j * 10 + 5;
                    mesh.position.z = i * 10 + 5;
                    mesh.position.y = 20;
                    this.scene.add(mesh);
                }
            }
        }

        // Start the timer and animation
        this.continue = true;
        this.rotate = 0;
        this.forward = 0;
        this.animate(0);
    }

    disconnectedCallback() {
        // Stop the timer and animation
        this.continue = false;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        console.log(attr, oldValue, newValue);
        if (attr === 'data-name') {
            this.shadowRoot.querySelector('h1').innerText = newValue;
        }
    }

    wallTypeAtCoordinates(z, x) {
      const row = Math.floor(z / 10);
      const col = Math.floor(x / 10);

      const maze = JSON.parse(this.getAttribute('data-map'));

      if (maze[row] === undefined || maze[row][col] === undefined) {

        if (parseInt(this.getAttribute('data-destination-z'), 10) === row
            && parseInt(this.getAttribute('data-destination-x'), 10) === col) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return maze[row][col];
      }
    }

    animate(step) {

        if (this.continue === false) {
            return;
        } else if (this.continue === true) {
            this.continue = step;
        }

        const d = step - this.continue;
        this.continue = step;

        if (this.wallTypeAtCoordinates(this.camera.position.z, this.camera.position.x) === -1) {
            alert('YOU WIN!');
            return;
        }

        requestAnimationFrame(this.animate.bind(this));

        this.camera.rotation.y += this.rotate * (Math.PI / 1000 * d);

        const speed = (25 / 1000 * d);

        const forwardZComponent = -Math.cos(this.camera.rotation.y) * this.forward;
        const forwardXComponent = -Math.sin(this.camera.rotation.y) * this.forward;

        const deltaZ = forwardZComponent * speed;
        const deltaX = forwardXComponent * speed;

        const newZ = this.camera.position.z + deltaZ;
        const newX = this.camera.position.x + deltaX;

        const tileZStep = this.wallTypeAtCoordinates(
            this.camera.position.z + (forwardZComponent / Math.abs(forwardZComponent)),
            this.camera.position.x);
        const tileXStep = this.wallTypeAtCoordinates(
            this.camera.position.z,
            this.camera.position.x + (forwardXComponent / Math.abs(forwardXComponent)));
        const tileForwardOne = this.wallTypeAtCoordinates(
            this.camera.position.z + forwardZComponent,
            this.camera.position.x + forwardXComponent);
        const tileForwardStep = this.wallTypeAtCoordinates(newZ, newX);

        if (tileForwardOne === 1 || tileForwardStep === 1) {
            if (tileZStep !== 1 && tileXStep === 1) {
                this.camera.position.z = newZ;
            } else if (tileXStep !== 1 && tileZStep === 1) {
                this.camera.position.x = newX;
            }
        } else if (tileForwardOne !== 1 && tileForwardStep !== 1) {
            if (tileZStep !== 1) {
                this.camera.position.z = newZ;
            }
            if (tileForwardStep !== 1 && tileXStep !== 1) {
                this.camera.position.x = newX;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}

customElements.define('maze-runner', MazeRunner);
