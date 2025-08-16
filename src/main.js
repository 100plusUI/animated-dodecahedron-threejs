import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById('canvas');

// 1. Создание сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000');

// 2. Добавить камеру
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// 3. Добавить объект на сцену
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({color: '#fff', emissive: '#603'});
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 3);
const boxMaterial = new THREE.MeshLambertMaterial({color: '#fff', emissive: '#603'});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

// 4. Добавим свет
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

// 5. Отрисовка
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 6. Добавим элементы управления
const controls = new OrbitControls(camera, renderer.domElement);

// Включаем плавное замедление камеры после движения (требует controls.update())
controls.enableDamping = true;

// Коэффициент демпфирования/замедления (0.05 по умолчанию)
// Чем меньше значение - тем дольше "скольжение" (0.01 = плавнее)
// Чем больше - тем резче остановка (0.1 = быстрее затормозит)
controls.dampingFactor = 0.05;

// Включить или выключить масштабирование (наезд) камеры
controls.enableZoom = true;

// Включить или отключить панорамирование камеры. Значение по умолчанию — true
controls.enablePan = true;

// 7. Добавление анимации
function animation() {
    requestAnimationFrame(animation);

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;

    box.rotation.y += 0.005;

    controls.update();
    renderer.render(scene, camera);
}

// 8. Обработчик изменения размеров окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

animation();