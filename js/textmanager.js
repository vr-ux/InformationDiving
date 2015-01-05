G.TextManager = function() {

  var textHeight = G.camHeight / 2;
  var textZPos = 300
  var textZInc = 30
  


  //************ TEXT FRAMED ***************

  var text = new G.TextFramed({
    string: "Ambient: 213",
    position: new THREE.Vector3(-10, textHeight, 190)
  })
  G.app.addObject(text)

  var text = new G.TextFramed({
    string: "Ambient: 305",
    position: new THREE.Vector3(-25, textHeight, 180)
  })
  G.app.addObject(text)

  var text = new G.TextFramed({
    string: "Ambient: 155",
    position: new THREE.Vector3(15, textHeight, 150)
  })
  G.app.addObject(text)

  var text = new G.TextFramed({
    string: "Ambient: 184",
    position: new THREE.Vector3(-15, textHeight, 120)
  })
  G.app.addObject(text)

  var text = new G.TextFramed({
    string: "Ambient: 108",
    position: new THREE.Vector3(20, textHeight, 108)
  })
  G.app.addObject(text)

  var text = new G.TextFramed({
    string: "Ambient: 210",
    position: new THREE.Vector3(-20, textHeight, 100)
  })
  G.app.addObject(text)



  //************ TEXT ***************

  var text = new G.Text({
    string: "REFLECTED SKY WAVES",
    position: new THREE.Vector3(-25, textHeight, 260)
  })
  G.app.addObject(text)

  var text = new G.Text({
    string: "COMMUNICATIONS SATELLITE",
    position: new THREE.Vector3(25, textHeight, 270)
  })
  G.app.addObject(text)

  var text = new G.Text({
    string: "RETRANSMITED MICROWAVE SIGNAL",
    position: new THREE.Vector3(-60, textHeight, 250)
  })
  G.app.addObject(text)

  var text = new G.Text({
    string: "SKYWAVES",
    position: new THREE.Vector3(50, textHeight, 200)
  })
  G.app.addObject(text)

  var text = new G.Text({
    string: "SKYWAVES",
    position: new THREE.Vector3(10, textHeight, 235)
  })
  G.app.addObject(text)


  /*
  var text = new G.TextFramed({
    string: "ZERO POINT ZERO",
    position: new THREE.Vector3(0, 0, 0)
  })
  G.app.addObject(text)
  */


  /*
  var markers = 50

  for (var i = 0; i < markers; i++ ) {

    var text = new G.TextPrimitive({
      string: "Depth = " + i*20,
      position: new THREE.Vector3(-3, textHeight, i*20)

    })
    G.app.addObject(text)
  }
  */

  /*
  var text = new G.TextPrimitive({
    string: "to",
    position: new THREE.Vector3(3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "the",
    position: new THREE.Vector3(-3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)

  var text = new G.TextPrimitive({
    string: "MettaVerse",
    position: new THREE.Vector3(3, textHeight, textZPos-=textZInc)
  })
  G.app.addObject(text)
  */

}