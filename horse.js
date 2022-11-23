//variables
var myRec = new p5.SpeechRec('en-GB'); // new P5.SpeechRec object
var cnv;
let g = 0;
let value = 0;
let shape;

//load image
function preload() {
  mask = loadImage('assets/horse_mask.png');
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
 background(255);

 //define the function associated to voice recognition and start the continuous registration
    myRec.onResult = showResult;
    myRec.continuous = true;
    myRec.start();
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

//function that allows you to draw a circle or a square based on voice recognition
function showResult()
	{
		if(myRec.resultValue==true) {
			if (myRec.resultString === "circle"){
                circle(width/2, height/2, g + 10);
				shape = "Circle";}
			if (myRec.resultString === "Square"){
                square(width/2, height/2, g + 10);		
                shape = "Square";
			} 
            console.log(myRec.resultString);
	}}

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

//this function allows you to draw also by dragging your finger on the screen
function mouseDragged(){
    if (shape === "Square"){
        square(mouseX, mouseY, g + 10);
    }
    if (shape === "Circle"){
        circle(mouseX, mouseY, g + 10);
    } if (shape !== "Circle" && shape !== "Square"){
        circle(mouseX, mouseY, g + 10);
    }
}
