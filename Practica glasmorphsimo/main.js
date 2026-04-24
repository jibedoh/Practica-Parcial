import * as THREE from 'three';

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Luces
const light1 = new THREE.PointLight(0xff0040, 5);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x00d4ff, 5);
light2.position.set(-5, -5, 5);
scene.add(light2);

// Objetos flotantes
const shapes = [];
const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.TetrahedronGeometry(1.2),
    new THREE.IcosahedronGeometry(1, 0)
];

for (let i = 0; i < 50; i++) {
    const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0xff0040 : 0x00d4ff,
        wireframe: Math.random() > 0.4,
        transparent: true,
        opacity: 0.4
    });

    const randomGeo = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(randomGeo, material);
    
    mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15
    );
    
    mesh.rotation.set(Math.random() * 5, Math.random() * 5, 0);
    scene.add(mesh);
    shapes.push(mesh);
}

camera.position.z = 10;

// Mouse Tracking
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
    requestAnimationFrame(animate);

    shapes.forEach((shape, i) => {
        shape.rotation.x += 0.005;
        shape.rotation.y += 0.005;
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
    });

    // Movimiento suave de cámara
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();