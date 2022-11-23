//variables
var cnv;
let g = 0;
let value = 0;
let yMotion;
let xMotion;
let zMotion;
let mic;
let amp;
let level;

//loading the image
let mySound;
function preload() {
  mask = loadImage('assets/wolf_mask.png');
}

//function that allows the canvas to be in the center of the screen
function centerCanvas() {
 var x = (windowWidth - width) / 2;
 var y = (windowHeight - height) / 2
 cnv.position(x, y);
 background(255);
}

//responsiveness of the canvas
function setup() {
 if(windowHeight < windowWidth){
     cnv = createCanvas(windowHeight * 0.8, windowHeight * 0.8);
 } else { cnv = createCanvas(windowWidth * 0.8, windowWidth * 0.8)}
    
 centerCanvas();

   //create & start an audio input
   mic = new p5.AudioIn();
   mic.start();
 
   //create an amplitude object that will use mic as input
   amp = new p5.Amplitude();
   amp.setInput(mic);


 background(255);
}

function draw() {
   fill(value);
   noStroke();

   mask.resize(width + 2,height + 2);
   image(mask, 0, 0);
}
 
function windowResized() {
    //resize of the canvas 
  if(windowWidth < windowHeight){
      a = windowWidth;
  }else { a = windowHeight}
  resizeCanvas(a * 0.9, a * 0.9);
  centerCanvas();
}

 //function that allows you to change the diameter of the circle based on the scroll of the mousewheel
function mouseWheel(event) {
 g = g + event.delta/20;
}

//function called by the click of the button of the colors inside the html. everytime a button is clicked the color of the stroke of each circle changes.
  //If you click on the eraser, the erasing parameter is turned into 1, and the fill of the circle turns into white and allows you to "erase" your mistakes.
function buttonAction(p, a){
let parameter = p;
let action = a;
console.log(action);
if (action == 'changeColor'){
 value = parameter;
} if (action == 'erase'){
   value = parameter;
}
}

//this function allows you to draw when you drag your finger on the screen.
//this function also allows you to access to the microphone. the value of the amplitude changes the size of the ellipse --> DOESN'T WORK ON SAFARI!
function mouseDragged(){
  circle(mouseX, mouseY, 8);
   
	if (mic) { // if the microphone is enabled ...
    userStartAudio();  // start the audio function
    level = amp.getLevel();
   ellipse(mouseX, mouseY, level * width * 5 + g, level * width * 5 + g);
  } 
}

function touchStarted(){
  userStartAudio();
}



// inspiration from: https://editor.p5js.org/enickles/sketches/0S2buiOy0
