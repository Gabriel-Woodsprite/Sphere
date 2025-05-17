let currentColor = 0x0077ff;
let currentSize = 1;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

let spherePoints = null; // Will hold the current sphere

function spherePlot(colorHex = 0x0077ff, size = 1) {
	if (spherePoints) {
		scene.remove(spherePoints); // remove old sphere if it exists
	}

	const radius = size;
	const segments = 60;
	const positions = [];

	for (let theta = 0; theta <= Math.PI; theta += Math.PI / segments) {
		for (let phi = 0; phi <= 2 * Math.PI; phi += Math.PI / segments) {
			const x = radius * Math.sin(theta) * Math.cos(phi);
			const y = radius * Math.sin(theta) * Math.sin(phi);
			const z = radius * Math.cos(theta);
			positions.push(x, y, z);
		}
	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(positions, 3),
	);

	const material = new THREE.PointsMaterial({
		color: colorHex,
		size: 0.03,
	});

	spherePoints = new THREE.Points(geometry, material);
	scene.add(spherePoints);
}

function animate() {
	requestAnimationFrame(animate);
	if (spherePoints) spherePoints.rotation.y += 0.01;
	renderer.render(scene, camera);
}

animate();
spherePlot(); // Initial plot

// Update color on input change
const colorPicker = document.querySelector(".colorPicker");
document.addEventListener("change", () => {
	const colorValue = colorPicker.value.replace("#", "0x");
	currentColor = Number(colorValue);
	spherePlot(currentColor, currentSize);
});
const size = document.querySelector(".sizeInput");
document.addEventListener("change", () => {
	console.log(size.value);
	currentSize = Number(size.value) != 0 ? Number(size.value) : 1;
	console.log(currentSize);
	spherePlot(currentColor, currentSize);
});
