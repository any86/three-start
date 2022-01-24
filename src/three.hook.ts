import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { type Ref } from 'vue';
export default function (wrapRef: Ref<HTMLElement>) {
    const scene = new THREE.Scene();

    const loader = new GLTFLoader();
    loader.load( '/1.glb', function ( gltf ) {
      const light = new THREE.AmbientLight( 0x404040 ); // soft white light
      scene.add( light );
  
      scene.add( gltf.scene );
    
    }, undefined, function ( error ) {
    
      console.error( error );
    
    } );

    

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    wrapRef.value.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x6699cc });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
}

