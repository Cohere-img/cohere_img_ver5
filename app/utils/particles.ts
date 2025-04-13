import * as THREE from "three";

export const createFineParticles = (scene: THREE.Scene): THREE.Group => {
    const particleCount = 2000;
    const particles = new THREE.Group();

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x000000,
        size: 0.01,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
    });

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particles.add(particleSystem);
    scene.add(particles);

    return particles;
};

export const animateParticles = (particleGroup: THREE.Group): void => {
    const particleSystem = particleGroup.children[0] as THREE.Points;
    const positions = particleSystem.geometry.attributes.position
        .array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.02;
        positions[i + 1] += (Math.random() - 0.5) * 0.02;
        positions[i + 2] += (Math.random() - 0.5) * 0.02;

        if (positions[i] > 5 || positions[i] < -5)
            positions[i] = (Math.random() - 0.5) * 10;
        if (positions[i + 1] > 5 || positions[i + 1] < -5)
            positions[i + 1] = (Math.random() - 0.5) * 10;
        if (positions[i + 2] > 5 || positions[i + 2] < -5)
            positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
};
