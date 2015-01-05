G.StraightLinePrimitive = function(params) {

  var obj = new Vizi.Object;

  var script = new G.StraightLinePrimitiveScript();
  obj.addComponent(script);
 

  return obj;
}

G.StraightLinePrimitiveScript = function(param) {
  Vizi.Script.call(this, param);

  this.visible = false;
  this.shown = false;
}

goog.inherits(G.StraightLinePrimitiveScript, Vizi.Script)

G.StraightLinePrimitiveScript.prototype.realize = function() {
  // Script subclasses need to implement update()
  Vizi.Script.prototype.realize.call(this);
 
  var strandMat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );

  var strandGeometry = new THREE.Geometry()
  strandGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  strandGeometry.vertices.push(new THREE.Vector3(0, 0, 350));

  var strand = new THREE.Line( strandGeometry, strandMat );
  
  //scene.add(line);

  var visual = new Vizi.Visual({
    object: strand
  });

  this._object.addComponent(visual);

  //strand.material.attributes.opacity.needsUpdate = true
}

G.StraightLinePrimitiveScript.prototype.update = function() {
  if (this.visible && !this.shown) {
    this.shown = true;
  }
}

G.StraightLinePrimitiveScript.prototype.appear = function(vertexIndex) {
  this.visible = true;
}