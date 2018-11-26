import * as THREE from 'three';
import OBJLoader from './loadObjCore'
OBJLoader(THREE);
let objLoader = new THREE.OBJLoader();
export default (url) => new Promise((resolve, reject) => {
    try {
        objLoader.load(url, (obj:any) => {
            resolve(obj);
        });
    } catch (error) {
        reject(error);
    }
});