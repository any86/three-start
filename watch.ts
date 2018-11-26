
// import AnyTouch from '../../src/main';
import * as THREE from 'three';
import createPlane from './object3D/plane';
import createFont from './object3D/font';
import createSphere from './object3D/sphere';
import createBox from './object3D/box';


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

// 球体
// scene.add(createSphere());

// 光源

let spotLight = new SpotLight(0xffffff);
spotLight.position.set(-40, 60, 300);
spotLight.castShadow = true;
scene.add(spotLight);



// import OBJLoader from './object3D/loadObj'
// OBJLoader(THREE);
import load from './object3D/load'
load('a.obj').then(obj => {
	// scene.add(createBox());
	// console.log(obj);

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
});



// const log = console.log;
// const tap2 = new AnyTouch.TapRecognizer({ name: 'doubletap', pointer: 1, taps: 2 })
// const tap3 = new AnyTouch.TapRecognizer({ name: 'threetap', pointer: 1, taps: 3 })
// const anyTouch = new AnyTouch(box);
// anyTouch.add(tap2);
// anyTouch.add(tap3);
// const tap1 = anyTouch.get('tap');
// tap1.requireFailure(tap2);
// tap1.requireFailure(tap3);
// tap2.requireFailure(tap3);
// /**
//  * =========================== pan ===========================
//  */
// // anyTouch.on('tap', e => {
// //     console.log(`%c ${e.type} `, 'background-color:#f10;color:#fff;');
// // });

// // anyTouch.on('doubletap', e => {
// //     console.log(`%c ${e.type} `, 'background-color:#9c3;color:#fff;');
// // });

// // anyTouch.on('threetap', e => {
// //     console.log(`%c ${e.type} `, 'background-color:#99c;color:#fff;');
// // });
// anyTouch.on('panright', e => {
//     // console.warn(e.type);
// });