import * as THREE from "https://cdn.skypack.dev/three@0.136";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/FBXLoader.js";
import { LoadingManager } from "https://cdn.skypack.dev/three@0.136/src/loaders/LoadingManager.js";
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js";
import { TextureLoader } from "https://cdn.skypack.dev/three@0.136/src/loaders/TextureLoader.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/RenderPass.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set (5,10,2);
// Window Resizing
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


const renderer = new THREE.WebGLRenderer({
    antialias : true
});


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// renderer.domElement.style.position ="absolute";

const controls = new OrbitControls(camera , renderer.domElement)
controls.rotateSpeed = 1.0
controls.zoomSpeed  = 1.2
controls.enableDamping = true
controls.enablePan = true
controls.dampingFactor = 0.2
// controls.minDistance = 10
// controls.maxDistance = 500
controls.enabled = true
// scene.add(controls)

// const textureLoader = new THREE.TextureLoader();
// // const texture = textureLoader.load('silver.jpg');
// const geometry = new THREE.PlaneGeometry( 500,500);
// const material = new THREE.MeshStandardMaterial( {
//   color: 0x101010 , 
// //   roughness:1,  
// //   metalness:0.5,
// } );
// const plane = new THREE.Mesh( geometry, material );
// plane.castShadow = true;
// plane.receiveShadow = true;
// plane.rotation.x = -Math.PI / 2; 
// plane.position.set(0,0,0);
// scene.add( plane );

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x101010} ); 
const cube = new THREE.Mesh( geometry, material ); 
cube.position.set(0,-1,0)
cube.scale.set(20,0.2,20)
scene.add( cube );



const axesHelper = new THREE.AxesHelper( 10 );
// scene.add( axesHelper );
// const light = new THREE.AmbientLight(0xffffff,1)
// scene.add(light)

  
// renderer.gammaOutput = true;
// renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.6;
  const loader = new RGBELoader();
  loader.load("lake.hdr",(texture)=>{
    // texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    // scene.environment = texture;

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
        
    });

    let model;
    const loader1 = new GLTFLoader();
    loader1.load('alf.glb', (e) => {
        model = e.scene;
        model.position.set(0, 1, 0);
        model.scale.set(6, 6, 6);
        model.rotation.set(0,300,0);
        scene.add(model);
        
        const cameraDistance = 0; // Adjust this distance as needed
        const cameraOffset = new THREE.Vector3(6, 6, -cameraDistance);
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        // camera.rotation.x = 20;
        camera.position.copy(model.position).add(cameraOffset);
        camera.lookAt(model.position);
        scene.add(camera);
        
    
// Define variables for key states
const keyState = {};

// Function to handle key down events
function onKeyDown(event) {
    keyState[event.keyCode] = true;
}

// Function to handle key up events
function onKeyUp(event) {
    keyState[event.keyCode] = false;
}

// Listen for keydown and keyup events
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

// Define a speed for the model movement
const movementSpeed = 0.1;

// Update function for model movement
function updateModelMovement() {
// w
if(keyState[87]  || keyState[38] ) model.translateZ(+0.1);
// s
if(keyState[83]  ||keyState[40]) model.translateZ(-0.1);
// A
if(keyState[65]  ||keyState[37]) model.rotateY(+0.04);
// D
if(keyState[68]  ||keyState[39]) model.rotateY(-0.04);
// arrow up
// if (keyState[38]) {
//     model.position.y += 0.1;
// }
// // arrow down
// if (keyState[40]) {
//     model.position.y -= 0.1;
// }





camera.position.copy(model.position).add(cameraOffset);
camera.lookAt(model.position);
}


function animate() {
	requestAnimationFrame( animate );
    updateModelMovement();
	// console.log(camera.position)
   

    controls.update()
	renderer.render( scene, camera );
}

animate();

    });