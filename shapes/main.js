import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const gradientShader = {
    uniforms: {
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uTime: { value: 0.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec2 uResolution;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
            vec2 st = gl_FragCoord.xy / uResolution;
            float dist = distance(st, vec2(0.5));

            // Pulsating gradient
            float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
            vec3 color1 = vec3(0.2, 0.4, 0.8) * pulse;  // Blue
            vec3 color2 = vec3(0.9, 0.2, 0.5) * (1.0 - pulse); // Pink

            vec3 gradient = mix(color1, color2, smoothstep(0.0, 1.0, dist));
            gl_FragColor = vec4(gradient, 1.0);
        }
    `
};

const gradientGeometry = new THREE.PlaneGeometry(2, 2);
const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: gradientShader.uniforms,
    vertexShader: gradientShader.vertexShader,
    fragmentShader: gradientShader.fragmentShader,
    depthWrite: false
});

const gradientMesh = new THREE.Mesh(gradientGeometry, gradientMaterial);
gradientMesh.renderOrder = -1;
scene.add(gradientMesh);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -1.5;
scene.add(sphere);

const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x4682b4 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 1.5;
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    gradientShader.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate(time) {
    gradientShader.uniforms.uTime.value = time * 0.001;

    sphere.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    torus.rotation.z += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();