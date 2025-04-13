import * as THREE from "three";

export const initThreeScene = async (canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xc2c2c2);
    camera.position.z = 5;

    scene.fog = new THREE.Fog(0xc2c2c2, 90, 100);

    // @ts-ignore
    const { EffectComposer } = await import(
        "three/examples/jsm/postprocessing/EffectComposer"
    );
    // @ts-ignore
    const { RenderPass } = await import(
        "three/examples/jsm/postprocessing/RenderPass"
    );
    // @ts-ignore
    const { UnrealBloomPass } = await import(
        "three/examples/jsm/postprocessing/UnrealBloomPass"
    );
    // @ts-ignore
    const { BokehPass } = await import(
        "three/examples/jsm/postprocessing/BokehPass"
    );
    // @ts-ignore
    const { VignetteShader } = await import(
        "three/examples/jsm/shaders/VignetteShader"
    );
    // @ts-ignore
    const { ShaderPass } = await import(
        "three/examples/jsm/postprocessing/ShaderPass"
    );

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bokehPass = new BokehPass(scene, camera, {
        focus: 2.8,
        aperture: 0.025,
        maxblur: 1.0,
    });
    composer.addPass(bokehPass);

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        2.0,
        1.0,
        0.9
    );
    composer.addPass(bloomPass);

    // Vignette effect to darken the corners
    const vignettePass = new ShaderPass(VignetteShader);
    vignettePass.uniforms["offset"].value = 0.3;
    vignettePass.uniforms["darkness"].value = 12;
    composer.addPass(vignettePass);

    return { scene, camera, renderer, composer };
};
