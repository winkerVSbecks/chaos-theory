// -----------------------------
// Curve
// -----------------------------
var Curve = function (ep, c0) {
	this.ep = ep || 0;
	this.c0 = c0 || 0;
};

// -----------------------------
// Path
// -----------------------------
var Path = function (numOfCurves) {
	this.points = new Array(numOfCurves*2); // type THREE.Vector3()
	this.curves = new Array(numOfCurves); // type Curve
};