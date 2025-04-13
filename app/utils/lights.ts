import * as THREE from "three";

export const addAmbientLight = (scene: THREE.Scene): void => {
    const ambientLight = new THREE.AmbientLight(0x333333, 0.8);
    scene.add(ambientLight);
};

export const addDirectionalLight = (scene: THREE.Scene): void => {
    const directionalLight = new THREE.DirectionalLight(0x000000, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
};
