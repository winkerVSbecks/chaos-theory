'use strict';

var w = window.innerWidth;
var h = window.innerHeight;

// -----------------------------
// Attractor
// -----------------------------
var Attractor = function (spherePoint) {
  this.returnVelocity = random(0, 0.001);
  this.amplitude = 3;
  this.fadeOut=false;
  this.restartCounter = 0;
  this.numCurves = 500;
  // Default Params
  this.param1 = random(0, 4);
  this.param2 = random(0, 4);

  this.param3 = 4.494;
  this.param4 = 0.44;
  this.dt = 0.136;

  this.path = new Path();
  this.p0 = new THREE.Vector3();
  this.t1 = 0;

  this.spherePoint = spherePoint;

  this.x = spherePoint.x;
  this.y = spherePoint.y;
  this.z = spherePoint.z;

  // if (this.spherePoint instanceof THREE.Vector3) {
  //   this.spherePoint.normalize();
  //   this.speherePoint.multiplyScalar(3);
  // }

  this.strokeFill = 0;
  this.strokeOpacity = 25;

  this.dx = 0;
  this.dy = 0;
  this.dz = 0;
};

Attractor.prototype.render = function () {};

Attractor.prototype.stateZero = function () {};

Attractor.prototype.createShape = function () {};

Attractor.prototype.drawPath = function () {};

Attractor.prototype.controlFromPoints = function () {};

Attractor.prototype.step = function () {
  this.dx = (-this.param1 * this.x - this.y * this.y - this.z * this.z + this.param1 * this.param3) * this.dt;
  this.dy = (-this.y + this.x * this.y - this.param2 * this.x * this.z + this.param4) * this.dt;
  this.dz = (-this.z + this.param2 * this.x * this.y + this.x * this.z) * this.dt;

  this.x += this.dx;
  this.y += this.dy;
  this.z += this.dz;
  var output = new THREE.Vector3(x,y,z);

  return output;
};