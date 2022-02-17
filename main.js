import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import elliot from './public/elliot.jpg';
import moon1 from './public/moon1.png';
import normal from './public/normal.jpg';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
d
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus thang

const geometry = new THREE.TorusGeometry(13, 3, 77, 88);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Le Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);


//populate Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 240); 
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(140));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('elliot.jpg');
scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load('moon1.png');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32), 
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 46;
moon.position.x = -10;


// Avatar

const fsocTexture = new THREE.TextureLoader().load('fsoc.jpeg');

const fsoc = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 6),
  new THREE.MeshBasicMaterial({ map: fsocTexture }));

scene.add(fsoc);

renderer.render(scene, camera);


// CAMERA SCROLLING...

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  //fsoc.rotation.y += 0.01;
  //fsoc.rotation.z += 0.01;

  camera.position.z = t * -0.1;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Display das Animations,,,

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();