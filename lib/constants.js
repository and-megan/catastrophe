var Constants = {
  canvasDim: [ 600, 600 ],
  backgroundColor: 'rgb(0, 0, 0)',

  shipRadius: 10,
  shipStartPos: [ 50, 550 ],
  shipMass: 1,
  shipSpeedMultiplier: 5,

  pointerPos: [ 100, 500 ],
  pointerOffset: [ -25, -25 ],
  pointerSize: [ 50, 50 ],

  levelOnePlanet: [ 350, 350 ],
  levelOneGoal: [ 500, 100 ],

  levelTwoPlanetA: [ 200, 200 ],
  levelTwoPlanetB: [ 400, 400 ],

// could use canvasDim instead? might be a little more DRY
  canvasMin: 0,
  canvasMax: 600,

  // change later if want to add more levels, for testing purposes
  finalLevel: 3
};

module.exports = Constants;
