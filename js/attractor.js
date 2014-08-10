'use strict';

var w = window.innerWidth;
var h = window.innerHeight;
var newAmplitude;
var AMP = 3;

window.onclick = function () {
  newAmplitude = 4;
};

// -----------------------------
// Attractor
// -----------------------------
var Attractor = function (particles) {
  this.returnVelocity = Math.random() * 0.0005;
  this.amplitude = AMP;
  this.fadeOut = false;
  this.restartCounter = 0;
  this.numCurves = 500;
  // Default Params
  this.param1 = random(0, 4);
  this.param2 = random(0, 4);

  this.param3 = 4.494;
  this.param4 = 0.44;
  this.dt = 0.136;

  this.path = new Path(this.numCurves);
  this.p0 = new THREE.Vector3();
  this.t1 = 0;

  this.spherePoint = new THREE.Vector3(random(-w, w), random(-h, h), random(-w, w));
  this.spherePoint.normalize();
  this.spherePoint.multiplyScalar(AMP);

  this.x = this.spherePoint.x;
  this.y = this.spherePoint.y;
  this.z = this.spherePoint.z;

  this.strokeFill = 0;
  this.strokeOpacity = 25;

  this.dx = 0;
  this.dy = 0;
  this.dz = 0;

  this.particles = particles;
};

Attractor.prototype.stateZero = function () {
  this.x = this.spherePoint.x;
  this.y = this.spherePoint.y;
  this.z = this.spherePoint.z;
};

Attractor.prototype.createShape = function () {
  this.p0 = new THREE.Vector3();
  this.path = new Path(this.numCurves);

  for (var i = 0; i < this.numCurves; i++) {
    this.path.curves[i] = new Curve(i * 2, i * 2 + 1);
    // Get next step in path
    var p1 = this.step();
    var p2 = this.step();
    this.path.points[i * 2 + 1] = this.controlFromPoints(this.p0, p1, p2);
    this.path.points[i * 2] = p2;
    this.p0 = p2;
  };

  this.drawPath(this.path);

  if (this.fadeOut) {
    this.restartCounter++;
    this.strokeOpacity -= 0.5;

    if (this.restartCounter > 50) {
      this.param1 = random(0, 4);
      this.param2 = random(0, 4);
      this.t1 = 0;
      this.fadeOut = false;
      this.restartCounter = 0;
      this.strokeOpacity = 25;
    }
  }
};

Attractor.prototype.drawPath = function (path) {
  var curves = path.curves;

  for (var i = 0; i < curves.length; i++) {

    var curve = curves[i];
    var c0 = new THREE.Vector3();
    var c1 = new THREE.Vector3();

    this.amplitude = newAmplitude > this.amplitude ?  newAmplitude : this.amplitude;

    if (this.amplitude > AMP) {
      this.amplitude -= this.returnVelocity;
      // newAmplitude = 3;
    }

    c0.normalize();
    c0.multiplyScalar(this.amplitude);

    c1.normalize();
    c1.multiplyScalar(this.amplitude);

    c0 = path.points[curve.c0];
    c1 = path.points[curve.c0 - 1];

    var ep = path.points[curve.ep];

    ep.normalize();
    ep.multiplyScalar(this.amplitude);

    // The Chaos
    // stroke(c0.x * 30 + 90, 25 - restartCounter / 2);
    c1.normalize();
    c1.multiplyScalar(this.amplitude * 100);
    this.particles.geometry.vertices[i].set(c1.x, c1.y, c1.z);
  }
  this.particles.geometry.vertices.needsUpdate = true;
};

// For 3 points on a curve, calculate a quadratic control point.  This means
// p0 and p2 are the end points, and we want to find a new point c0, such
// that the spline at t = 0.5 evaluates to p1.
Attractor.prototype.controlFromPoints = function (p0, p1, p2) {
  var output = new THREE.Vector3();
  output.setX(p1.x + p1.x - 0.5 * p0.x - 0.5 * p2.x);
  output.setY(p1.y + p1.y - 0.5 * p0.y - 0.5 * p2.y);
  output.setZ(p1.z + p1.z - 0.5 * p0.z - 0.5 * p2.z);
  return output;
};

// Lorentz Equation
Attractor.prototype.step = function () {
  this.dx = (-this.param1 * this.x - this.y * this.y - this.z * this.z + this.param1 * this.param3) * this.dt;
  this.dy = (-this.y + this.x * this.y - this.param2 * this.x * this.z + this.param4) * this.dt;
  this.dz = (-this.z + this.param2 * this.x * this.y + this.x * this.z) * this.dt;

  this.x += this.dx;
  this.y += this.dy;
  this.z += this.dz;

  var output = new THREE.Vector3(this.x, this.y, this.z);
  return output;
};

Attractor.prototype.render = function () {
  this.stateZero();

  if (this.param1 > 0.6)
    this.param1 -= 0.0005;

  this.param2 = this.t1 / 2000.0;

  this.fadeOut = this.param2 > 1.40 ? true : false;

  this.t1 += 5;

  this.createShape();
};