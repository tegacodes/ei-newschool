//make a variable to deal with data
var data;
var reading = 0;

//variables for birds
var birds = [];
var b = 0;
var bx = 0;
var by = 0;
var x = 0;

var frames = []; // An array to store the images



function preload() {

  // load images
  // These URLs are for the individual walk cycle images,
  // stored in the imgur album http://imgur.com/a/85DTu
  var filenames = [];
  filenames[0] = "http://i.imgur.com/svA3cqA.png";
  filenames[1] = "http://i.imgur.com/jV3FsVQ.png";
  filenames[2] = "http://i.imgur.com/IgQDmRK.png";
  filenames[3] = "http://i.imgur.com/kmVGuo9.png";
  filenames[4] = "http://i.imgur.com/jcMNeGq.png";
  filenames[5] = "http://i.imgur.com/ttJGwkt.png";
  filenames[6] = "http://i.imgur.com/9tL5TRr.png";
  filenames[7] = "http://i.imgur.com/IYn7mIB.png";

//load birds
  for (var i = 0; i < 5; i++) {

    frames[i] = loadImage("data/bird/frame_" + i + ".gif");
  }

}


function setup() {
  createCanvas(640, 480);
  background(255);
  imageMode(CENTER);
  frameRate(12);
  bx = width - 100;
  by = height / 2;
  callAPI();




}

function draw() {

  noStroke();

  image(frames[b], bx, by, 100, 100);
  if (b < 4) {
    b++;
  } else {
    b = 0;
  }

  if (reading < 60) {
    bx = bx - 5;
  } else if (reading < 120) {
    bx = bx - 2;
  } else {
    bx = bx + 1;
  }

  if (bx < 0) {
    bx = width - 100;
  }


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