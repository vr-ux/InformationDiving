G.CurveDotPrimitiveFixed = function(params) {
  var obj = new Vizi.Object;

  var script = new G.CurveDotPrimitiveFixedScript(params);
  obj.addComponent(script);

  return obj;
}

G.CurveDotPrimitiveFixedScript = function(params) {
  Vizi.Script.call(this);

  this.visible = false;
  this.shown = false;
}


goog.inherits(G.CurveDotPrimitiveFixedScript, Vizi.Script);

G.CurveDotPrimitiveFixedScript.prototype.realize = function() {

  Vizi.Script.prototype.realize.call(this);
  
  this.colorPalette = _.sample(G.colorPalette)
  this.subdivisions = 200
  this.dotScale = 0.01;
  this.percentFullScale = .1 // dot will be full scale by 10% of curve
  this.strandMat = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        type: 'c',
        value: new THREE.Color( this.colorPalette )
      }
    },
    attributes: {
      opacity: {
        type: 'f',
        value: []
      },
    },
    vertexShader: G.shaders.vs.strand,
    fragmentShader: G.shaders.fs.strand,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });

  var strandGeometry = new THREE.Geometry()
  var curve = new THREE.CubicBezierCurve3();

  curve.v0 = new THREE.Vector3(0, 0, 0);
  curve.v1 = new THREE.Vector3(G.rf(0, 0), G.rf(40, 50), 0);
  curve.v2 = new THREE.Vector3(G.rf(30, 30), G.rf(40, 50), 0);
  curve.v3 = new THREE.Vector3(G.rf(30, 30), 0, 0);

  var opacity = this.strandMat.attributes.opacity.value
  for (var j = 0; j < this.subdivisions; j++) {
    strandGeometry.vertices.push(curve.getPoint(j / this.subdivisions))
    opacity[j] = 1;
  }
  strandGeometry.dynamic = false
  this.strand = new THREE.Line(strandGeometry, this.strandMat)

  var visual = new Vizi.Visual({
    object: this.strand
  });
  this._object.addComponent(visual);

  this.dot = new Vizi.Object();
  visual = new Vizi.Visual({
    geometry: new THREE.SphereGeometry(0.15, 8, 8),
    //material: _.sample(G.materials)
    material: new THREE.MeshBasicMaterial( { color: this.colorPalette } )
  });
  this.dot.addComponent(visual);

}

G.CurveDotPrimitiveFixedScript.prototype.update = function() {
  if (this.visible && !this.shown) {
    this.shown = true;
  }
}

G.CurveDotPrimitiveFixedScript.prototype.appear = function(vertexIndex) {
  this.visible = true;
}