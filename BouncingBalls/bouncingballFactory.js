//
// in 2021-07-23:
//   Added turnOn(), turnOff() and reset() => names are self explanatory
//   separated js code to "bouncingballFactory.js"
//
function getLimitX(){
    // caution to stop before screen ends calculated each ball width and height with offset
    // these limits takeing "innerWidth" and "innerHeight" allow scroolbars to show!
    // adjusted the offset to -20 to prevent scrollbars from showing
    // tried something new, but did not work:
    // let limitX = document.body.clientWidth;        
    return (window.innerWidth - 20);
}

function getLimitY(){
    // tried something new, but did not work:
    // let limitY = document.body.clientHeight;
    return (window.innerHeight - 20);
}

function bouncingBallCreate(initialX, initialY, topToBottom = true, leftToRight = true){
    // initialX, initialY, topToBottom, leftToRight are all optionals
    if(initialX == undefined){initialX = Math.floor(Math.random() * (getLimitX() - ballWidth))};
    if(initialY == undefined){initialY = Math.floor(Math.random() * (getLimitY() - ballHeight))};
    
    let newBouncingBall = bouncingBall;

    newBouncingBall.aBall = createBallRGB(initialX, initialY);
    newBouncingBall.positionX = initialX;
    newBouncingBall.positionY = initialY;
    newBouncingBall.topToBottom = topToBottom;
    newBouncingBall.leftToRight = leftToRight;
    newBouncingBall.timeOfBirth = Date.now();

    let myWidth = Number(String(bouncingBall.aBall.style.width).replace("px", ""));
    let myHeight = Number(String(bouncingBall.aBall.style.height).replace("px", ""));
    //newBouncingBall.aBall.onClick = destroyMe(newBouncingBall.aBall);   
    // instead of returning will already push it
    //return newBouncingBall;
    ballCollection.push(newBouncingBall);
 }  

//  let newBouncingBall = {
//     aBall: createBallRGB(originalPositionX,originalPositionY,red,green,blue),
//     positionX: originalPositionX,
//     positionY: originalPositionY,
//     leftToRight: !originalLeftToRight,
//     topToBottom: !originalTopToBottom,
//     timeOfBirth: Date.now(),
//     }; 
//  ballCollection.push(newBouncingBall);


 function createFirstBall(){
    // create the first ball
    // firstBouncingBall = {
    //    //aBall: createBall(15,20, "#000000"), // black = "#000000" "lightblue" // another kind of blue: "#304BA4"
    //    aBall: createBallRGB(15,20,red,green,blue),
    //    positionX: 15,
    //    positionY: 20,
    //    leftToRight: true,
    //    topToBottom: true,
    //    timeOfBirth: Date.now(),
    //    };          

    // ballCollection.push(firstBouncingBall);     
    //debugger;
    bouncingBallCreate();
 } 

 // using some code from the MIT PCCO Week 2 magic.js
 function colorizeBallRGB(div, r, g, b){
    if (r == undefined){r = Math.floor(255*(Math.random()))};
    if (g == undefined){g = Math.floor(255*(Math.random()))};
    if (b == undefined){b = Math.floor(255*(Math.random()))};
    // div is expected to be a ball document
    if (!(typeof div === "undefined")){
       div.style.background = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
 }   

 function colorRGB(r, g, b){
    if (r == undefined){r = Math.floor(255*(Math.random()))};
    if (g == undefined){g = Math.floor(255*(Math.random()))};
    if (typeof b === "undefined"){b = Math.floor(255*(Math.random()))};
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
    if((typeof color === "undefined")
      ||(typeof color === "rgb (undefined, undefined, undefined)"))
      {
        color = randomSimpleColors();
      }
    if (typeof x === "undefined"){x = Math.floor(Math.random() * (getLimitX() - ballWidth))};
    if (typeof y === "undefined"){y = Math.floor(Math.random() * (getLimitY() - ballHeight))};
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
    // by bringing limits here we can adapt to window being resized
    let limitX = getLimitX() - myWidth;
    let limitY = getLimitY() - myHeight;

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
    //debugger;
    if(hitTheEdge){
        //console.log("Hit at counter: " + counter);
        // we need to prevent balls from being created to close to one another, like when they hit to close to a corner!
        // timeOfBirth is a way out to let us know when the last one was created
        //debugger;
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
            //newBouncingBall.aBall.onClick = destroyMe(newBouncingBall.aBall);
            ballCollection.push(newBouncingBall);
        }                 
    }
 }

 function letsMoveAllBalls(){
    if(allowMovement){         
        let originalLength = ballCollection.length;
        // logic with originalLength prevents crashing due to infinite growth of ballCollection

        for(i=0; i<originalLength; i++){
        letsMoveOneBall(ballCollection[i]);
        }

        setTimeout(letsMoveAllBalls, timeFrame); // this calls update ever 1/10 second // clever, instead of setInterval, it makes sure all balls are processed before the next call!
    }
 }

 function turnOn(){
    allowMovement = true;
    letsMoveAllBalls();
 }  

 function turnOff(){
    allowMovement = false;
 }

 function destroyMe(ballToDestroy){
    for (let i=(ballCollection.length-1); i>=0; i--) {
       // search for the ball id
       if(ballCollection[i].aBall.id === ballToDestroy.id){
           ballCollection.splice(i, 1);
           ballToDestroy.remove();
           break;
        }
    }
    // ballToDestroy.remove();

}

function destroyLastBall(){
       ballToDestroy = ballCollection.pop();
       ballToDestroy.aBall.remove();
}

 function destroyAllBalls(){
     for (let i=(ballCollection.length-1); i>=0; i--) {
        //ballCollection[i].aBall.remove();
        ballToDestroy = ballCollection.pop();
        ballToDestroy.aBall.remove();
     }
 }

 function reset(){
     turnOff();
     destroyAllBalls();
     //ballCollection = [];
     createFirstBall();
     turnOn();   
 }

 function randomSimpleColors() {
    const colors = ["red", "green", "blue", "yellow"];
    return colors[Math.floor(Math.random() * 5)];
  }

  function randomColor(){
    let r = Math.floor(255*(Math.random()));
    let g = Math.floor(255*(Math.random()));
    let b = Math.floor(255*(Math.random()));        
    let color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return color;  
  }

  function buttonGotClicked() {
    document.getElementById("demo").innerHTML = "Hello World";
  }  

 // added Mouse Click
//  let totalFactoryOutput = 0; // this global variable comes with the mouse click factory!
 
//  var mouse = function (e) {
//     ymouse = e.clientY;
//     xmouse = e.clientX;
//     makeBall(xmouse, ymouse, randomColor());
//     totalFactoryOutput++; // one more made
//  };

//  if (window.addEventListener) {
//   document.addEventListener("click", mouse, false); // also should work with "mousedown" // click and mousedown work the same!
//  
