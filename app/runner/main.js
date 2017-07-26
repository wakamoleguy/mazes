var scene, camera, renderer;

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let rotate = 0;
let forward = 0;
let last = null;

init();
animate(0);

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      forward = 1;
      break;
    case 's':
      forward = -1;
      break;
    case 'a':
      rotate = 1;
      break;
    case 'd':
      rotate = -1;
      break;
    default:
  }
}, false)

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
    case 's':
      forward = 0;
      break;
    case 'a':
    case 'd':
      rotate = 0;
      break;
    default:
  }
}, false);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75, // fov
    600 / 400, // aspect ratio
    1, // near clip
    10000); // far clip
  camera.position.z = 150;

  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 1) {
        geometry = new THREE.BoxGeometry(10, 50, 10);
        material = new THREE.MeshBasicMaterial({
          color: 0xff0000 + (i * 5120) + (j * 20),
          wireframe: false
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = j * 10;
        mesh.position.z = i * 10;
        mesh.position.y = 20;
        scene.add(mesh);
      }
    }
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1200, 800);

  document.getElementById('runner').appendChild(renderer.domElement);
}

function animate(step) {

  if (last === null) last = step;
  const d = step - last;
  last = step;

  requestAnimationFrame(animate);

  camera.rotation.y += rotate * (Math.PI / 1000 * d);

  const movement = forward * (5 / 1000 * d);

  const newZ = Math.cos(camera.rotation.y) * forward
  const newX = Math.sin(camera.rotation.y) * forward
  camera.position.z -= newZ;
  camera.position.x -= newX;

  renderer.render(scene, camera);
}
