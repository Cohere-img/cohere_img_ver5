import * as THREE from "three";

export const createTorus = (scene: THREE.Scene): THREE.Mesh => {
    const geometry = new THREE.TorusGeometry(1.5, 0.3, 20, 40);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        transmission: 0.7,
        ior: 2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.rotation.set(
        (-30 * Math.PI) / 180,
        (30 * Math.PI) / 180,
        (30 * Math.PI) / 180
    );
    scene.add(torus);
    return torus;
};

export const createCylinder = (scene: THREE.Scene): THREE.Mesh => {
    const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 50, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: 0x000000,
        emissiveIntensity: 1,
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.rotation.set(
        (30 * Math.PI) / 180,
        (-30 * Math.PI) / 180,
        (-30 * Math.PI) / 180
    );
    cylinder.position.set(0, 0, 0);
    scene.add(cylinder);
    return cylinder;
};

export const createGlow = (
    scene: THREE.Scene,
    cylinder: THREE.Mesh
): THREE.Mesh => {
    const glowGeometry = new THREE.SphereGeometry(1, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.09,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.copy(cylinder.position);
    glowMesh.scale.set(7, 7, 7);
    scene.add(glowMesh);
    return glowMesh;
};
