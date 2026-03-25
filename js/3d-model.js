// Dans js/3d-model.js
import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('model3d-container');
if (container) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(2, 1, 3);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);
    
    // Éclairage
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 3, 4);
    scene.add(directionalLight);
    
    // Charger votre modèle Blender
    const loader = new GLTFLoader();
    let model;
    loader.load(
        'models/votre-logo.glb', // Mettez votre fichier ici
        (gltf) => {
            model = gltf.scene;
            model.scale.set(0.8, 0.8, 0.8);
            scene.add(model);
        },
        undefined,
        (error) => console.error('Erreur:', error)
    );
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}