//make a variable to deal with data
var data;
var reading = 0;

//variables for birds
var birds = [];
var b = 0;
var bx = 0;

//for sound
var playMode = 'sustain';
var s = 1;

function preload() {

  // initialize sound
  sound = loadSound('data/puffin.mp3');

}


function setup() {
  createCanvas(640, 480);
  background(255);
  imageMode(CENTER);
  frameRate(12);
  callAPI();
}

function draw() {

  noStroke();
  //change color of background according to data
  from = color(255, 0, 0);
  to = color(0, 0, 255);
  var x = map(reading, 0, 250, 0, 1);
  var col1 = lerpColor(from, to, x); //http://p5js.org/reference/#/p5/lerpColor
  fill(col1);
  rect(0, 0, width, height / 2);
  fill(0);
  rect(0, height / 2, width, height / 2);

  //conditional to play sound
  if (reading > 60) {
    console.log("start sound");
    if (s == 1) {
      sound.play();
      s = 0;
    }
    sound.onended(myCallback);

  } else {
    sound.stop();
  }


}

function myCallback() {
  console.log("sound finished");
  s = 1;
}


//data functions
function parseData(data) {
  reading = data.result;
  print("reading:" + reading);
  //call API every 1000 milliseconds
  setTimeout(callAPI(), 1000);

}

function callAPI() {
  var url = 'https://api.particle.io/v1/devices/3a0040000851353531343431/analogvalue?access_token=27280314aec35f59f2530e76ba2e999f3600dfd9';
  data = loadJSON(url, parseData);

}