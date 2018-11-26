import * as THREE from 'three';
import OBJLoader from '../object3D/loadObj'
OBJLoader(THREE);
let objLoader = new THREE.OBJLoader();
export default (url) => new Promise((resolve, reject) => {
    try {
        objLoader.load(url, obj => {
            resolve(obj);
        });
    } catch (error) {
        reject(error);
    }
});