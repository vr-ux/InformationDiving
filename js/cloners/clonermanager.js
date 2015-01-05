// cloner system name (string)
// parent (object3D)
// position (
// objectsToClone (array)
// quantity (number)

// Create groups of clones
// Set uniform starting condition of those clones (position, rotation, scale)
// Distribute these groups of clones in varied ways. e.g.:
//   - Randomize clone position, scale and rotation within ranges (most important… gets us most of what we need)
//   - Randomize clone positions on faces of mesh (less important, but still very handy for spawning arcs on plane at start of animation, for example )
// Have clones respond to proximity / timed events. eg:
//   - Distance of camera to individual clones
//   - Time elapsed since start of animation (I suppose we can do this by simply delaying creating of the cloner system with a setTimeout, or some such)

//ranges are relative to the parent object
G.ClonerManager = function(){
 
  var cloner;


  //************ CIRCLES ***************


  // create circles

  var count = 4;
  var circles = new Vizi.Object;
  //scircles.transform.position.z = 50;
  var geometry = new THREE.CircleGeometry( 60, 120 );
  var material = new THREE.LineDashedMaterial( { color: 0xffffff, scale: 1, dashSize: 1, gapSize: 1, linewidth: 1, transparent: true, opacity: 0.25 } );
  geometry.vertices.shift(); // remove center vertex
  geometry.computeLineDistances();

  for ( var i = 0; i < count; i++ ) {
    
    var line = new THREE.Line( geometry, material, THREE.LinePieces );
    line.position.set( 0, 0, i * 60 );
    var visual = new Vizi.Visual({ object: line });
    circles.addComponent( visual );

  }

  G.app.addObject( circles );



  //************ GRID LINES ***************

  var quantity = 60;
  var increment = 10;
  var length = 400;
  var strandMat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1, opacity: 0.2, transparent: true } );
  

  var strandGeometry = new THREE.Geometry()
  strandGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  strandGeometry.vertices.push(new THREE.Vector3(0, 0, length));

  var linesX = new Vizi.Object;
  linesX.transform.position.x = 0 - ( increment * quantity / 2);

  for( var i = 0; i < quantity; i++ ){

    var strand = new THREE.Line( strandGeometry, strandMat );
    strand.position.set( i * increment, 0, 0 )
    var visual = new Vizi.Visual({ object: strand });
    linesX.addComponent( visual );

  }


  strandGeometry = new THREE.Geometry()
  strandGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  strandGeometry.vertices.push(new THREE.Vector3(length, 0, 0));

  var linesZ = new Vizi.Object;
  linesZ.transform.position.x = 0 - ( length / 2);

  for( var i = 0; i < quantity; i++ ){

    var strand = new THREE.Line( strandGeometry, strandMat );
    strand.position.set( 0, 0, i * increment )
    var visual = new Vizi.Visual({ object: strand });
    linesZ.addComponent( visual );

  }


  G.app.addObject( linesX );
  G.app.addObject( linesZ );



  //************ FIXED ARCS ***************

  cloner = G.Cloner({
    primitive: G.CurveDotPrimitiveFixed,
    num: 50,
    position: new THREE.Vector3(-70, 0, 200),
    posRange: {x: {start: 40, end: -40}, y: {start: 0, end: 0}, z:{start: 200, end: -200 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: 0, end: 4}, z:{start: 0, end: 0 }},
  })
  
  G.app.addObject(cloner)

  cloner = G.Cloner({
    primitive: G.CurveDotPrimitiveFixed,
    num: 50,
    position: new THREE.Vector3(70, 0, 200),
    posRange: {x: {start: 40, end: -40}, y: {start: 0, end: 0}, z:{start: 200, end: -200 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: 0, end: 4}, z:{start: 0, end: 0 }},
  })
  
  G.app.addObject(cloner)



  //************ ARCS ***************


  // spawn burst

  /*
  cloner = G.Cloner({
    primitive: G.CurveDotPrimitive,
    num: 50,
    position: new THREE.Vector3(0, 20, -100),
    //posRange: {x: {start: 50, end: -50}, y: {start: 0, end: 0}, z:{start: 150, end: -150 }},
    rotRange: {x: {start: 0, end: 3}, y: {start: 0, end: 3}, z:{start: 0, end: 3 }},
  })
  
  G.app.addObject(cloner)
  */

  // spawn clone area to left of camera path

  cloner = G.Cloner({
    primitive: G.CurveDotPrimitive,
    num: 100,
    position: new THREE.Vector3(-80, 0, 180),
    posRange: {x: {start: 50, end: -50}, y: {start: 0, end: 0}, z:{start: 150, end: -150 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: 0, end: 4}, z:{start: 0, end: 0 }},
  })
  
  G.app.addObject(cloner)


  // spawn clone area to right of camera path

  cloner = G.Cloner({
    primitive: G.CurveDotPrimitive,
    num: 100,
    position: new THREE.Vector3(80, 0, 180),
    posRange: {x: {start: 50, end: -50}, y: {start: 0, end: 0}, z:{start: 150, end: -150 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: 0, end: 4}, z:{start: 0, end: 0 }},
  })
  
  G.app.addObject(cloner)


  // spawn in a straight line
  
  var visibilityEffector = new G.VisibilityEffector({distance: 150});
  cloner = G.Cloner({
    primitive: G.CurveDotPrimitive,
    num: 100,
    position: new THREE.Vector3(0, 0, 180),
    posRange: {x: {start: 200, end: -200}, y: {start: 0, end: 0}, z:{start: 20, end: -10 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: -1, end: 1}, z:{start: 0, end: 0 }},
    primitiveEffectors: [visibilityEffector],
    scaleRange: { x: {start: 2, end: 2}, y: {start: 2, end: 2}, z:{start: 2, end: 2 }},
  })
  
  //cloner.addComponent(visibilityEffector)
  G.app.addObject(cloner)


  // spawn in a straight line 
  
  var visibilityEffector = new G.VisibilityEffector({distance: 150});
  cloner = G.Cloner({
    primitive: G.CurveDotPrimitive,
    num: 200,
    position: new THREE.Vector3(0, 0, 50),
    posRange: {x: {start: 250, end: -250}, y: {start: 0, end: 0}, z:{start: 10, end: -10 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: 0, end: 0.35}, z:{start: 0, end: 0 }},
    primitiveEffectors: [visibilityEffector],
    scaleRange: { x: {start: 2, end: 2}, y: {start: 2, end: 2}, z:{start: 2, end: 2 }},
  })
  
  //cloner.addComponent(visibilityEffector)
  G.app.addObject(cloner)


  var script = cloner.getComponent(Vizi.Script);
  script.addEventListener('distancethreshold', function(){
    this.spawnPrimitives();
    //console.log("threshold")
  })



  //************ TRACER PRIMITIVE ************

  /*
  cloner = G.Cloner({
    primitive: G.TracerPrimitive,
    num: 20,
    position: new THREE.Vector3(10, 0, 200),
    posRange: {x: {start: -200, end: 200}, y: {start: 40, end: 80}, z:{start: -300, end: 0 }},
    scaleRange: {x: {start: 1, end: 10}, y: {start: 2, end: 3}, z:{start: 1, end: 1 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: Math.PI/2, end: Math.PI/2}, z:{start: 0, end: 0 }},
  });
  var visibilityEffector = new G.VisibilityEffector({distance: 600});
  cloner.addComponent(visibilityEffector)
  G.app.addObject(cloner)
  */

  /*
  cloner = G.Cloner({
    primitive: G.TracerPrimitive,
    num: 20,
    position: new THREE.Vector3(10, 120, 200),
    posRange: {x: {start: -200, end: 200}, y: {start: 40, end: 80}, z:{start: -300, end: 0 }},
    scaleRange: {x: {start: 1, end: 10}, y: {start: 2, end: 3}, z:{start: 1, end: 1 }},
    rotRange: {x: {start: 0, end: 0}, y: {start: Math.PI/2, end: Math.PI/2}, z:{start: 0, end: 0 }},
  });
  var visibilityEffector = new G.VisibilityEffector({distance: 600});
  cloner.addComponent(visibilityEffector)
  G.app.addObject(cloner)
  */

  /*
  script = cloner.getComponent(Vizi.Script);
  script.addEventListener('distancethreshold', function(){
    this.spawnPrimitives();
  })
  */



  //************ FRESNEL PRITMIVES ***************


  // starting position fresnel

  // cloner = G.Cloner({
  //   primitive: G.FresnalPrimitive,
  //   num: 1,
  //   position: new THREE.Vector3(0, 0, 200),
  //   //posRange: {x: {start: 1000, end: -1000}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }},
  //   //primitiveEffectors: [scaleEffector],
  //   //scaleRange: { x: {start: scale, end: scale}, y: {start: scale, end: scale}, z:{start: scale, end: scale }},
  // })
  
  // G.app.addObject(cloner)

  // cloner = G.Cloner({
  //   primitive: G.FresnalPrimitive,
  //   num: 1,
  //   position: new THREE.Vector3(0, 0, 100),
  //   //posRange: {x: {start: 1000, end: -1000}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }},
  //   //primitiveEffectors: [scaleEffector],
  //   //scaleRange: { x: {start: scale, end: scale}, y: {start: scale, end: scale}, z:{start: scale, end: scale }},
  // })
  
  // G.app.addObject(cloner)

  // cloner = G.Cloner({
  //   primitive: G.FresnalPrimitive,
  //   num: 1,
  //   position: new THREE.Vector3(0, 0, -100),
  //   //posRange: {x: {start: 1000, end: -1000}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }},
  //   //primitiveEffectors: [scaleEffector],
  //   //scaleRange: { x: {start: scale, end: scale}, y: {start: scale, end: scale}, z:{start: scale, end: scale }},
  // })
  
  // G.app.addObject(cloner)


  // // distant fresnels

  // cloner = G.Cloner({
  //   primitive: G.FresnalPrimitive,
  //   num: 1,
  //   position: new THREE.Vector3(0, 0, -1400),
  //   //posRange: {x: {start: 1000, end: -1000}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }},
  //   //primitiveEffectors: [scaleEffector],
  //   //scaleRange: { x: {start: scale, end: scale}, y: {start: scale, end: scale}, z:{start: scale, end: scale }},
  // })
  
  // G.app.addObject(cloner)


  // cloner = G.Cloner({
  //   primitive: G.FresnalPrimitive,
  //   num: 1,
  //   position: new THREE.Vector3(0, 600, -4000),
  //   //posRange: {x: {start: 1000, end: -1000}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }},
  //   //primitiveEffectors: [scaleEffector],
  //   //scaleRange: { x: {start: scale, end: scale}, y: {start: scale, end: scale}, z:{start: scale, end: scale }},
  // })
  
  // G.app.addObject(cloner)


  /*
  var numFresnalPrimitives = 1;
  var scale = G.rf(.2, .5);

  for(var i = 0; i < numFresnalPrimitives; i++){

    var scaleEffector = new G.ScaleEffector( {nearDistance: 10, farDistance: G.explodeDistance, nearScale: G.rf(3, 20), farScale: scale})
    var cloner = G.Cloner({
      primitive: G.FresnalPrimitive,
      num: 2,
      position: new THREE.Vector3(0, G.camHeight/2, -500),
      posRange: {x: {start: 1000, end: -1000}, y: {start: 0, end: 0}, z:{start: 0, end: 0 }},
      primitiveEffectors: [scaleEffector],
      scaleRange: { x: {start: scale, end: scale}, y: {start: scale, end: scale}, z:{start: scale, end: scale }},
    })
    
    G.app.addObject(cloner)
  }
  */


  //*************************************************

  // scaleEffector = new G.ScaleEffector( {nearDistance: 50, farDistance: 400, nearScale: 2, farScale: 1})
  // var cloner = G.Cloner({
  //   primitive: G.CurveDotPrimitive,
  //   num: 1,
  //   position: new THREE.Vector3(0, 0, 200),
  //   // posRange: {x: {start: -200, end: -20}, y: {start: 0, end: 0}, z:{start: -800, end: 0 }},
  //   rotRange: {start: 0, end: Math.PI * 2},
  //   primitiveEffectors: [scaleEffector]

  // })

  // G.app.addObject(cloner)

  //UNCOMMENT BELOW BLOCK TO TEST VISIBILITY EFEFCTOR

  // var visibilityEffector = new G.VisibilityEffector({distance: 600});
  // var primitiveVisibilityEffector = new G.VisibilityEffector({distance: 200});
  // var cloner = G.Cloner({
  //   primitive: G.ArcPrimitive,
  //   num: 10,
  //   position: new THREE.Vector3(-10, 0, 300),
  //   posRange: {x: {start: -200, end: -20}, y: {start: 0, end: 0}, z:{start: -300, end: 0 }},
  //   scaleRange: { x: {start: 1, end: 2}, y: {start: 1, end: 10}, z:{start: 1, end: 2 }},
  //   primitiveEffectors: [primitiveVisibilityEffector]
  // })

  // cloner.addComponent(visibilityEffector);
  // G.app.addObject(cloner);

  // var script = cloner.getComponent(Vizi.Script);
  // script.addEventListener('distancethreshold', function(){
  //   this.spawnPrimitives();
  // })

  // var visibilityEffector = new G.VisibilityEffector({distance: 100})  

}
