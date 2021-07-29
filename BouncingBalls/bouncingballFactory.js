window.scrollbars = false; // could not prevent scroll bars from appearing?
//createBall(0, 0, "red");
bouncingBall = {
       aBall: document, // "document" instead of "ball", because "document" is of the language, but "ball" is ours, but undefined at this point!
       positionX: Number,
       positionY: Number,
       topToBottom: Boolean,
       leftToRight: Boolean,
       timeOfBirth: Date(),
   };

function bouncingBallCreate(initialX, initialY, topToBottom, leftToRight){
   // initialX, initialY, topToBottom, leftToRight are all optionals
   let newBouncingBall = bouncingBall;

   if(initialX = undefined){initialX = 0};
   if(initialY = undefined){initialY = 0};
   if(topToBottom = undefined){true};
   if(leftToRight = undefined){true};
   
   bouncingBall.aBall = createBallRGB();
   bouncingBall.positionX = initialX;
   bouncingBall.positionY = initialY;
   bouncingBall.topToBottom = topToBottom;
   bouncingBall.leftToRight = leftToRight;

   return newBouncingBall;
}  

var ballCollection = []; // empty array of bouncingBalls to hold all created balls
var maxNumberOfBalls = 100;
var timeFrame = 10; // in ms
var timeDifferenceBetweenNewBalls = 2000; // in ms 
var velocityX = 5;
var velocityY = 3;
// "screen" gives the position of the window of the browser in relation to the main desktop
// so, if the browser is maximized, we get 0,0 for screenLeft, screenTop 
// var limitX = screen.availWidth;
// var limitY = screen.availHeight;
// var limitX = 500;
// var limitY = 500;
var ballWidth = 50;
var ballHeight = 50;
var red = 0;
var green = 0;
var blue = 0;
var counter = 0;

//  ball is no longer created here:
//  var ball = document.getElementById('ball');

// using some code from the MIT PCCO Week 2 magic.js
function colorizeBallRGB(div, r, g, b){
   // div is expected to be a ball document
   div.style.background = 'rgb(' + r + ', ' + g + ', ' + b + ')'; 
}   

function colorRGB(r, g, b){
   return 'rgb(' + r + ', ' + g + ', ' + b + ')'; 
}   

function incrementColor(){
   // here we take te global red, green, blue and increase it by 50 starting from "blue" to "red", blue being the LSB and red the HSB
   // if incrementColor reaches the higher value, considering the limit of 255, 255, 255, it returns FALSE
   // so FALSE returns means the max has been reached
   let increment = 50; // our default is 50. Caution: before changing it to a higher number consider the amount of colors it may result
   let belowMax = true;
   blue = blue + increment;
   if(blue > 255){
       // reset blue
       blue = 0;
       // it is time to increment green
       green = green + increment;
       if(green > 255){
           // reset green
           green = 0;
           // it is time to increment red
           red = red + increment;
           if(red > 255){
               // we could restor red to previous and stop increments like in red = red - increment
               // or just reset red (and eventually let the colors all restart from 0,0,0)
               red = 0;
               belowMax = false; // tell the caller that max,max,max has been reached
           }
       }
   }
   //console.log("Ball id " + ballCollection[0].aBall.id + " has new color RGB: (" + red + ", " + green + ", " + blue + ") at counter " + counter);
   return belowMax;
}

// added a few extra attributes so the ball contains all its essencial information
function createBallColor(x,y,color){
   // set div attributes
   let div = document.createElement('div');
   let current = new Date();
   let cDate = String(current.getFullYear()).padStart(4,'0') + '-' + String((current.getMonth() + 1)).padStart(2,'0') + '-' + String(current.getDate()).padStart(2,'0');
   let cTime = String(current.getHours()).padStart(2,'0') + ":" + String(current.getMinutes()).padStart(2,'0') + ":" + String(current.getSeconds()).padStart(2,'0') + String(current.getMilliseconds()).padStart(3,'0');
   let dateTime = cDate + " " + cTime;
   //console.log(dateTime);
   div.id = 'ball' + dateTime;
   div.style.zIndex = '1';
   div.style.position = 'absolute';    
   div.style.left = x + 'px';    
   div.style.top = y + 'px';    
   div.style.width = ballWidth + 'px'; 
   div.style.height = ballHeight + 'px';    
   div.style.borderRadius = '50%';
   div.style.background = color;

   // Then append the whole thing onto the body
   document.getElementsByTagName('body')[0].appendChild(div);
   return div;        
};     

function createBallRGB(x,y,r,g,b){
   return createBallColor(x,y,colorRGB(r,g,b));
}   

// YOUR CODE 
// defining a function to make it move
function letsMoveOneBall(bouncingBall){
   //let bouncingBall = ballCollection[0];
   let hitTheEdge = false;

   // original movement direction is preserved here to be passed to new ball if created
   // this will give the impression of "splitting up"
   let originalTopToBottom = bouncingBall.topToBottom;
   let originalLeftToRight = bouncingBall.leftToRight; 
   let originalPositionX = bouncingBall.positionX;
   let originalPositionY = bouncingBall.positionY; 

   // take care of movement and direction
   //console.log("Receive aBouncingBall:");
   //console.log(bouncingBall);

   // take this ball parameters:
   let positionX = bouncingBall.positionX; 
   let positionY = bouncingBall.positionY;
   let topToBottom = bouncingBall.topToBottom;
   let leftToRight = bouncingBall.leftToRight;

   // getting ready for ball changes in size, we make sure to get this ball measures
   let myWidth = Number(String(bouncingBall.aBall.style.width).replace("px", ""));
   let myHeight = Number(String(bouncingBall.aBall.style.height).replace("px", ""));
   // caution to stop before screen ends calculated each ball width and height wirh -1 offset
   // these limits takeing "innerWidth" and "innerHeight" allow scroolbars to show!
   // adjusted the offset to -20 to prevent scrollbars from showing
   // by bringing limits here we can adapt to window being resized
   let limitX = window.innerWidth - myWidth - 20;
   let limitY = window.innerHeight - myHeight - 20 ;
   // try something new, but did not work
   // let limitX = document.body.clientWidth - myWidth - 1;        
   // let limitY = document.body.clientHeight - myHeight - 1;

   if(topToBottom){
   positionY = positionY + velocityY;
   //console.log("new Y:" + positionY);
   } else {
   positionY = positionY - velocityY;
   //console.log("new Y:" + positionY);   
   }

   if(leftToRight){
   positionX = positionX + velocityX;
   //console.log("new X:" + positionX);
   } else {
   positionX = positionX - velocityX;
   //console.log("new X:" + positionX);
   }

   // reverse direction on Y
   if(positionY > limitY){
       topToBottom = false;
       hitTheEdge = true;
       // to Study: why did it not work when I used "incrementColor" without () ?
       incrementColor();
   }
   if(positionY < 0) {
       topToBottom = true;
       hitTheEdge = true;
       incrementColor();
   }

   // reverse direction on X
   if(positionX > limitX){
       leftToRight = false;
       hitTheEdge = true;
       incrementColor();
   }
   if(positionX < 0) {
       leftToRight = true;
       hitTheEdge = true;
       incrementColor();
   }

   // save this ball parameters:
   bouncingBall.aBall.style.top = positionY + 'px';
   bouncingBall.aBall.style.left = positionX + 'px';
   bouncingBall.positionX = positionX;
   bouncingBall.positionY = positionY;
   bouncingBall.topToBottom = topToBottom;
   bouncingBall.leftToRight = leftToRight;

   // show result in the console
   //console.log("What is happening to ball number : X=" + positionX + ", Y=" + positionY);
   counter++;
   //console.log(counter);

   // if hitTheEdge is true then create new ball
   // again To Study: when I used hitTheEdge without () the function never executed and it is TRUE all the times, so it executes on every loop !!!

   if(hitTheEdge){
       //console.log("Hit at counter: " + counter);
       // we need to prevent balls from being created to close to one another, like when they hit to close to a corner!
       // timeOfBirth is a way out to let us know when the last one was created
       let currentDateTime = Date.now(); // "new Date()"" consumes more resources while Date.now() is ligther and quicker!
       let timeEllapsedFromLastBall = currentDateTime - bouncingBall.timeOfBirth; // diff in ms
       
       if( (timeEllapsedFromLastBall > timeDifferenceBetweenNewBalls) 
           && // = and
           (ballCollection.length < maxNumberOfBalls)
         ){
           let newBouncingBall = {
               // create new ball considering the current "new" color
               aBall: createBallRGB(originalPositionX,originalPositionY,red,green,blue),
               positionX: originalPositionX,
               positionY: originalPositionY,
               leftToRight: !originalLeftToRight,
               topToBottom: !originalTopToBottom,
               timeOfBirth: Date.now(),
               }; 
           ballCollection.push(newBouncingBall);
       }                 
   }
}

function letsMoveAllBalls(){
   let originalLength = ballCollection.length;
   // logic with originalLength prevents crashing due to infinite growth of ballCollection

   for(i=0; i<originalLength; i++){
    letsMoveOneBall(ballCollection[i]);
   }
}

// let's make it move
console.log("Started");

// create the first ball
let firstBouncingBall = {
           //aBall: createBall(15,20, "#000000"), // black = "#000000" "lightblue" // another kind of blue: "#304BA4"
           aBall: createBallRGB(15,20,red,green,blue),
           positionX: 15,
           positionY: 20,
           leftToRight: true,
           topToBottom: true,
           timeOfBirth: Date.now(),
           };          

ballCollection.push(firstBouncingBall);

console.log("First ball created");

// time to set the movement
// setInterval will run only once is a pass "()" or even if I create ane inform parameters inside "()" like in (x,y,color) that I tryied previously
//setInterval(letsMoveOneBall(), timeFrame);
// to Study: why did it not work when I used "letsMoveAllBalls()" with () ?
//             if use "letsMoveAllBalls()" it will execute only once!!!
setInterval(letsMoveAllBalls, timeFrame);
