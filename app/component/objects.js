import './three.min.js';

const lights = {

    hemi() {
        const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        light.color.setHSL( 0.6, 1, 0.6 );
        light.groundColor.setHSL( 0.095, 1, 0.75 );
        light.position.set( 0, 500, 0 );
        return light;
    },

    dir() {
        const light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.color.setHSL( 0.1, 1, 0.95 );
        light.position.set( -1, 1.75, 1 );
        light.position.multiplyScalar( 50 );
        return light;
    }
};

const skydome = (() => {
    const vertexShader = document.getElementById( 'vertexShader' ).textContent;
    const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    const uniforms = {
      topColor:    { value: new THREE.Color( 0x0077ff ) },
      bottomColor: { value: new THREE.Color( 0xffffff ) },
      offset:      { value: 33 },
      exponent:    { value: 0.6 }
    };

    return new THREE.Mesh(
        new THREE.SphereGeometry(4000, 32, 15),
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            side: THREE.BackSide
        }));
})();

function scene() {
    const s = new THREE.Scene();

    s.fog = new THREE.Fog(0xffffff, 1, 250);
    s.add(lights.hemi());
    s.add(lights.dir());
    s.add(skydome);

    return s;
}

function camera() {

    return new THREE.PerspectiveCamera(
      75, // fov
      600 / 400, // aspect ratio
      0.25, // near clip
      10000); // far clip
}

export { scene, camera };
