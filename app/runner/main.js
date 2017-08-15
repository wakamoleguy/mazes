var scene, camera, renderer;

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const startingPosition = { z: 9, x: 9 };
const startingDirection = 'west';
const destination = { z: 11, x: 1 };

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

  // Position the camera based on the starting position
  camera.position.x = startingPosition.x * 10 + 5;
  camera.position.z = startingPosition.z * 10 + 5;
  switch (startingDirection) {
    case 'west':
    camera.rotation.y -= Math.PI / 2;
    case 'south':
    camera.rotation.y -= Math.PI / 2;
    case 'east':
    camera.rotation.y -= Math.PI / 2;
    case 'north':
    default:
    break;
  }


  // SKYDOME
  var vertexShader = document.getElementById( 'vertexShader' ).textContent;
  var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
  var uniforms = {
    topColor:    { value: new THREE.Color( 0x0077ff ) },
    bottomColor: { value: new THREE.Color( 0xffffff ) },
    offset:      { value: 33 },
    exponent:    { value: 0.6 }
  };
  uniforms.topColor.value.copy( hemiLight.color );
  scene.fog.color.copy( uniforms.bottomColor.value );
  var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );
  var sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );



  // My stuff



  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1200, 800);

  document.getElementById('runner').appendChild(renderer.domElement);
}

function wallTypeAtCoordinates(z, x) {
  const row = Math.floor(z / 10);
  const col = Math.floor(x / 10);

  if (maze[row] === undefined || maze[row][col] === undefined) {

    if (destination.z === row && destination.x === col) {
      return -1;
    } else {
      return 0;
    }
  } else {
    return maze[row][col];
  }
}

function animate(step) {

  if (last === null) last = step;
  const d = step - last;
  last = step;

  if (wallTypeAtCoordinates(camera.position.z, camera.position.x) === -1) {
    alert('YOU WIN!');
    return;
  }

  requestAnimationFrame(animate);

  camera.rotation.y += rotate * (Math.PI / 1000 * d);

  const speed = (25 / 1000 * d);

  const forwardZComponent = -Math.cos(camera.rotation.y) * forward;
  const forwardXComponent = -Math.sin(camera.rotation.y) * forward;

  const deltaZ = forwardZComponent * speed;
  const deltaX = forwardXComponent * speed;

  const newZ = camera.position.z + deltaZ;
  const newX = camera.position.x + deltaX;

  const tileZStep = wallTypeAtCoordinates(
    camera.position.z + (forwardZComponent / Math.abs(forwardZComponent)),
    camera.position.x);
  const tileXStep = wallTypeAtCoordinates(
    camera.position.z,
    camera.position.x + (forwardXComponent / Math.abs(forwardXComponent)));
  const tileForwardOne = wallTypeAtCoordinates(
    camera.position.z + forwardZComponent,
    camera.position.x + forwardXComponent);
  const tileForwardStep = wallTypeAtCoordinates(newZ, newX);

  if (tileForwardOne === 1 || tileForwardStep === 1) {
    if (tileZStep !== 1 && tileXStep === 1) {
      camera.position.z = newZ;
    } else if (tileXStep !== 1 && tileZStep === 1) {
      camera.position.x = newX;
    }
  } else if (tileForwardOne !== 1 && tileForwardStep !== 1) {
    if (tileZStep !== 1) {
      camera.position.z = newZ;
    }
    if (tileForwardStep !== 1 && tileXStep !== 1) {
      camera.position.x = newX;
    }
  }

  renderer.render(scene, camera);
}