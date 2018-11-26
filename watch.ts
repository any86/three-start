
// import AnyTouch from '../../src/main';
import * as THREE from 'three';
import createPlane from './object3D/plane';
import load from './loader/loadObj'
import { Object3D } from 'three';

let {
	Scene, ObjectLoader, JSONLoader,
	WebGLRenderer,
	PerspectiveCamera,
	MeshBasicMaterial, DirectionalLight,
	TextGeometry, SpotLight, SpotLightHelper,
	PointLight, AmbientLight,
	AxesHelper, CubeGeometry,
	Object3D
} = THREE;


// 渲染器
let box = document.getElementById('box');
if (undefined === box) {
	box = document.createElement('div');
	box.id = 'box';
}

let renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(box)
box.appendChild(renderer.domElement);

renderer.setClearColor(0xaaaaaa);
renderer.shadowMap.enabled = true;


let position = { x: 188, y: 36, z: 210, cameraX: 0, cameraY: 100, cameraZ: 100 };
const dat = require('dat.gui');
let gui = new dat.GUI();
gui.add(position, 'x', -1000, 1000);
gui.add(position, 'y', -1000, 1000);
gui.add(position, 'z', -1000, 1000);
gui.add(position, 'cameraX', -1000, 1000);
gui.add(position, 'cameraY', -1000, 1000);
gui.add(position, 'cameraZ', -1000, 1000);


// 场景
let scene = new Scene()

// 相机
let camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// 辅助线
scene.add(new AxesHelper(130));

// 平面
scene.add(createPlane());


// 光源
let spotLight = new SpotLight(0xffffff);
spotLight.position.set(-40, 60, 300);
spotLight.castShadow = true;
scene.add(spotLight);

(async ()=>{
	let obj:any = await load('a.obj')
		obj.position.y = 50;
		obj.position.z = 50;
		scene.add(obj);
	
		function render3() {
			requestAnimationFrame(render3);
			scene.remove(spotLight);
			spotLight = new SpotLight(0xffffff);
			spotLight.position.set(position.x, position.y, position.z);
			spotLight.castShadow = true;
			scene.add(spotLight);
	
			camera.position.x = position.cameraX;
			camera.position.y = position.cameraY;
			camera.position.z = position.cameraZ;
			camera.lookAt(scene.position)
	
	
			// 开始渲染
			renderer.render(scene, camera);
		}
		render3();
})()

