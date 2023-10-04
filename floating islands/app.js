// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create floating islands
const islandGeometry = new THREE.BoxGeometry(5, 0.5, 5);
const islandMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const islands = [];

for (let i = 0; i < 10; i++) {
    const island = new THREE.Mesh(islandGeometry, islandMaterial);
    island.position.x = (Math.random() - 0.5) * 50;
    island.position.y = Math.random() * 10;
    island.position.z = (Math.random() - 0.5) * 50;
    islands.push(island);
    scene.add(island);
}

// Add clouds (particles)
const cloudGeometry = new THREE.BufferGeometry();
const cloudMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
const cloudVertices = [];

for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = Math.random() * 20;
    const z = (Math.random() - 0.5) * 100;
    cloudVertices.push(x, y, z);
}

cloudGeometry.setAttribute('position', new THREE.Float32BufferAttribute(cloudVertices, 3));
const clouds = new THREE.Points(cloudGeometry, cloudMaterial);
scene.add(clouds);

// Add directional light for better shading
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// Set initial camera position
camera.position.set(0, 10, 20);

// Render loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate islands
    islands.forEach(island => {
        island.rotation.x += 0.005;
        island.rotation.y += 0.005;
    });

    // Move clouds
    cloudGeometry.attributes.position.array.forEach((_, i) => {
        cloudGeometry.attributes.position.array[i] += i % 3 === 0 ? 0.005 : 0;
        if (cloudGeometry.attributes.position.array[i] > 20) {
            cloudGeometry.attributes.position.array[i] = -20;
        }
    });
    cloudGeometry.attributes.position.needsUpdate = true;

    // Day-night cycle
    light.intensity = Math.abs(Math.sin(Date.now() * 0.0001));

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

animate();
