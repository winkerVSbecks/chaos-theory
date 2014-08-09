// -----------------------------
// Curve
// -----------------------------
var Curve = function (ep, c0) {
	this.ep = ep;
	this.c0 = c0;
};

// -----------------------------
// Path
// -----------------------------
var Path = function (ep, c0) {
	this.points = []; // type THREE.Vector3()
	this.curves = []; // type Curve
};