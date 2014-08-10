'use strict';

if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, camera, scene, renderer, particles, geometry, material, parameters, i, h;
var mouseX = 0;
var mouseY = 0;
var color = [0, 0, 0.14];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var numOfAttractors = 50;
var attractors = [];


init();
animate();


// -----------------------------
// Init
// -----------------------------
function init() {
  // Setup container
  container = document.createElement('div');
  document.body.appendChild(container);

  // Setup camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000 * 0.75;
  camera.rotation.x = 90 * Math.PI / 180;

  // Setup the Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.001);

  // Add particles to scene
  for (var i = 0; i < numOfAttractors; i ++ ) {
    geometry = new THREE.Geometry();

    for (var j = 0; j < 500; j++) {

      var x = random(-w, w);
      var y = random(-h, h);
      var z = random(-w, w);

      var v = new THREE.Vector3(random(-w, w), random(-h, h), random(-w, w));
      v.normalize();
      v.multiplyScalar(AMP);

      geometry.vertices.push(v);
    }

    material = new THREE.PointCloudMaterial({ size: 1 });
    particles = new THREE.PointCloud(geometry, material);
    particles.sortParticles = true;
    scene.add(particles);

    var att = new Attractor(particles);
    attractors.push(att);
  }

  // Build and attach renderer to DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xfffffa, 1);
  container.appendChild(renderer.domElement);

  // Document event listeners
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);

  // Window event listeners
  window.addEventListener('resize', onWindowResize, false);
}


// -----------------------------
// Update Animation
// -----------------------------
function animate() {
  requestAnimationFrame(animate);
  render();
}


// -----------------------------
// Render Loop
// -----------------------------
function render() {
  var time = Date.now() * 0.00005;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  // for (var i = 0; i < scene.children.length; i++) {
  //   var object = scene.children[i];

  //   if (object instanceof THREE.PointCloud) {
  //     // object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
  //     // object.position.set(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000);
  //   }
  // }
  // debugger;
  for (var i = 0; i < numOfAttractors; i++) {
    attractors[i].render();
  }

  // h = (360 * (color[0] + time) % 360) / 360;
  // material.color.setHSL(h, color[1], color[2]);

  renderer.render(scene, camera);
}


function random(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}