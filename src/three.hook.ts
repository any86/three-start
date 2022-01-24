import * as THREE from "three";
import type { Mesh, Object3D } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { type Ref } from 'vue';
export default function (wrapRef: Ref<HTMLElement>) {
  const scene = new THREE.Scene();

  // 光源
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 1110);
  spotLight.castShadow = true;
  scene.add(spotLight);
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  const plane = createPlane();
  scene.add(plane);


  function createPlane({ color = '#ccc' } = {}) {
    let planeGeometry = new THREE.PlaneGeometry(30, 30);
    let planeMaterial = new THREE.MeshBasicMaterial({ color });
    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.set(15, 0, 0);
    planeMesh.rotation.set(0, 0, 10 * Math.PI / 180);
    planeMesh.receiveShadow = true;
    return planeMesh;
  };

  let mesh3: Object3D;

  const loader = new GLTFLoader();
  loader.load('/1.glb', function (gltf) {
    mesh3 = gltf.scene.children[3];

    console.log(gltf.scene.children);
    scene.add(gltf.scene);
    mesh3.rotation.set(10, 10, 10);

  }, undefined, function (error) {
    console.error(error);
  });


  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );



  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  wrapRef.value.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x6699cc });
  const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 15;


  function animate() {
    requestAnimationFrame(animate);
    if (mesh3) {
      mesh3.rotation.x += 0.01;
      mesh3.rotation.y += 0.01;
      if (mesh3.scale.x > 3) {
        mesh3.scale.x -= 0.01;
        mesh3.scale.y -= 0.01;
      } else {
        mesh3.scale.x += 0.01;
        mesh3.scale.y += 0.01;
      }
    }
    renderer.render(scene, camera);
  }

  animate();
}

