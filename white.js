   //variables
   var cnv;
   let g = 0;
   let value = 0;
   let yMotion;
   let xMotion;
   let zMotion;
   let erasing = 0;

   let mySound;

   //function that allows the canvas to be in the center of the screen
  function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2
    cnv.position(x, y);
    background(255);
  }

  function setup() {

//responsiveness of the canvas
    if(windowHeight < windowWidth){
        cnv = createCanvas(windowHeight * 0.8, windowHeight * 0.8);
    } else { cnv = createCanvas(windowWidth * 0.8, windowWidth * 0.8)}
       
    centerCanvas();
    background(255);
  }

  function draw() {
    
    noFill();
      if (erasing == 1){
        fill('white');
      } 
      stroke(value);

  // the below code ensures a smooth transition from 0-180 and back
  // x and y values moved from the centre point
 yMotion = round(height / 2 + rotationX * 3)
 xMotion = round(width / 2 + rotationY * 3)

  //let zMotion = rotationZ;
 zMotion = round(20 / abs(radians(rotationZ) - PI))

  // motion affected circle
    circle(xMotion + 10*(random(0.1, 0.8)), yMotion + 10*(random(0.1, 0.8)), zMotion + g);  
}
    
//resize of the canvas
  function windowResized() { 
     if(windowWidth < windowHeight){
         a = windowWidth;
     }else { a = windowHeight} 
     resizeCanvas(a * 0.9, a * 0.9);
     centerCanvas();
  }
     
  function deviceTurned() {
    if (turnAxis === 'X') {
      if (value === 0) {
        value = 255;
      } else if (value === 255) {
        value = 0;
      }
    }
  }

  // request permissions on iOS
  function touchEnded(event) {
    if(DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
    }
  }
  // request permissions on iOS
  function touchEnded(event) {
    if(DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
    }
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
    erasing = 0;
   } if (action == 'erase'){
      value = parameter;
      erasing = 1;
   }
   
}

//this function allows you to draw also by dragging your finger on the screen
function mouseDragged(){
  circle(mouseX, mouseY, g + round(20 / abs(radians(rotationZ) - PI)));
}
