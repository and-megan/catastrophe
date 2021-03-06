var Util = require('./util.js'),
CONSTANTS = require('./constants.js');

class Ship {
  // inherit from Planet? will require a gravitational pull
  //this will require a mass to calculate gravitational pull
  constructor(radius, pos) {
    this.radius = radius;
    this.pos = pos;
    this.mass = CONSTANTS.shipMass;
    this.vel = [ 0, 0 ];
    this.flying = false;
    // for cat rocket @ later date
    // let image = new Image;
    // image.src = './assets/cat.png';
    // this.image = image;
  }

  launch(event) {
    //grab destination coordinates & blastoff
    var coords = this.destination(event);
    this.blastoff(coords);
  }

  destination(event) {
    //grab coords
    var x = event.x;
    var y = event.y;
    var canvas = document.getElementById('game-canvas');

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    return ([x, y]);
  }

  blastoff(coords) {
    var nonScaledVector = Util.normalizedVector(this.pos, coords);
    this.vel = [
      nonScaledVector[0] * CONSTANTS.shipSpeedMultiplier,
      nonScaledVector[1] * CONSTANTS.shipSpeedMultiplier
    ];
    this.flying = true;
  }

  step() {
    // will need tweaking. just a basic movement to get things rolling
    // need to calculate graviational pull with objects - may want to pass in values from adjustCourse ?
    if (this.flying) {
      this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'rgb(100,100,100)';
    ctx.beginPath();
    var [x, y] = this.pos;
    ctx.arc(x, y ,this.radius,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  isCollided(obj) {
    var dist = Util.calculateDistance(this.pos, obj.pos);
    //is dist less than or equal to the sum of the two radii
    return dist <= (this.radius + obj.radius);
  }

  adjustCourse(ship, obj) {
    //may want to adjust this Math.floor to be more accurate. Just for testing.
    // apologies for terrible placeholder method -m
    var pull = Util.gravitationalForce(ship, obj);

    pull = pull * Math.pow(10, 8);
    //need to convert pull into useful values. Currently just making it work for testing. really really bad.
    // grav force seems backwards too. need to look into it.
    // grav force was backwards because of raising to a negative power -
    // changed to multiply by factor of ten to get usable numbers. - c

    var nonScaledVector = Util.normalizedVector(this.pos, obj.pos);

// so I added a bunch of terribleness to your terrible placeholder method
// desperately needs some refactoring and DRYing - c

    console.log(pull);
    switch (true) {
      case pull > 20:
        // arbitrary number to cause auto crash - anything higher also autocrash?
        console.log('autocrash');

        this.vel = [
          nonScaledVector[0] / 2 + this.vel[0],
          nonScaledVector[1] / 2 + this.vel[1]
        ];

        break;
      case pull > 15:
        console.log('large gravitational pull');
        this.vel = [
          nonScaledVector[0] / 10 + this.vel[0],
          nonScaledVector[1] / 10 + this.vel[1]
        ];
        break;
      case pull > 10:
        console.log('medium gravitational pull');
        this.vel = [
          nonScaledVector[0] / 15 + this.vel[0],
          nonScaledVector[1] / 15 + this.vel[1]
        ];
        break;
      case pull > 5:
        console.log('small gravitational pull');
        this.vel = [
          nonScaledVector[0] / 20 + this.vel[0],
          nonScaledVector[1] / 20 + this.vel[1]
        ];
        break;
      default:
        console.log('course not altered');
    }
  }

  catastrophe() {
    // set animation for boom-boom, sound? etc.
    console.log("ship is dead"); // testing purposes
    // needs to reset here - button?
  }

  victoryDance() {
    console.log("level complete"); //testing purposes
    // needs to reset here - button?
  }

}

module.exports = window.Ship = Ship;
// TODO: take off window
