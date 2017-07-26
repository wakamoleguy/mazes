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
  scene.fog = new THREE.Fog(0xffffff, 1, 5000);

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 500, 0 );
	scene.add( hemiLight );

	dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 50 );
	scene.add( dirLight );
	dirLight.castShadow = false;

  camera = new THREE.PerspectiveCamera(
    75, // fov
    600 / 400, // aspect ratio
    1, // near clip
    10000); // far clip
  camera.position.z = 150;


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

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  scene.add(new THREE.Mesh(geometry, material));

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 1) {
        geometry = new THREE.BoxGeometry(10, 50, 10);
        material = new THREE.MeshPhongMaterial({
          color: 0xff0000 + (i * 5120) + (j * 20)
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = j * 10 + 5;
        mesh.position.z = i * 10 + 5;
        mesh.position.y = 20;
        scene.add(mesh);
      }
    }
  }

  const groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
  const groundMat = new THREE.MeshPhongMaterial({
    color: 0xffffff
  });
  groundMat.color.setHSL(0.095, 1, 0.75);
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -33;
  scene.add(ground);

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

  const newZ = camera.position.z - Math.cos(camera.rotation.y) * forward;
  const newX = camera.position.x - Math.sin(camera.rotation.y) * forward;

  const newRow = maze[Math.floor(newZ / 10)];
  const newColumn = newRow && newRow[Math.floor(newX / 10)];

  const newTile = newColumn? newColumn: 0;

  if (newTile === 0) {
    camera.position.z = newZ;
    camera.position.x = newX;
  }

  renderer.render(scene, camera);
}
