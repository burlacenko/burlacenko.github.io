var allowMovement = false;
var started = false;
var pos = 0;
var PacID = 0;
const pacArray = [
    ['./images/pacman1.png', './images/pacman2.png'],
    ['./images/pacman3.png', './images/pacman4.png']
];
var direction = 0;
var game = document.getElementById('game');
var pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(30); // {x:?, y:?}
    let position = setToRandom(500);

    // Add image to div id = game
    // let game = document.getElementById('game');
    let img = document.createElement('img');
    img.style.position = 'absolute';
    img.src = './images/pacman1.png';
    img.width = 100;

    PacID++;
    img.id = 'pac' + PacID;

    let focus = 0; // 0=mouth shut; 1=mouth opened

    let direction = 0;
    // FUTURE improvements in direction:
    // 0 => leftToRight = true (right)
    // 1 => leftToRight = false (left)
    // 2 => topToBottom = true (down) facing right
    // 3 => topToBottom = true (down) facing left
    // 4 => topToBottom = false (up) facing right
    // 5 => topToBottom = false (up) facing left

    //
    // set position here 
    //
    img.style.left = position.x +'px';
    img.style.top = position.y +'px';

    // click event
    // img.onclick = reverseMovement(this);
    // img.addEventListener('click', reverseMovement(this));
    img.onclick = function (mouseEvent) {
        if (mouseEvent.ctrlKey){
          destroyMe(this.id)
        } else {
          reverseMovement(this.id);
        }
    };

    // img.addEventListener('dblclick', destroyMe(this.id));    

    // add new Child image to game
    game.appendChild(img);

    // return details in an object
    return {
        position,
        velocity,
        img,
        focus,
        direction
    };
}

function update() {
    if(allowMovement){
    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        
        // open and shut mouth
        item.focus = (item.focus + 1) % 2;
        item.img.src = pacArray[item.direction][item.focus]

        if (item.velocity.x < 0) {
            item.direction = 1;
        } else {
            item.direction = 0;
        }
        
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.img.style.left = item.position.x +'px';
        item.img.style.top = item.position.y +'px';
    });

    setTimeout(update, 200);
    }
}

function checkCollisions(item) {
    //
    // detect collision with all walls and make pacman bounce
    //
    if ( ((item.position.x + item.velocity.x + item.img.width) > window.innerWidth)
    ||
    ((item.position.x + item.velocity.x) < 0) ) { item.velocity.x = -item.velocity.x}

    // treat Y and reverse velocity before hitting the edge
    if ( ((item.position.y + item.velocity.y + item.img.height) > window.innerHeight)
        ||
        ((item.position.y + item.velocity.y) < 0) ) { item.velocity.y = -item.velocity.y}

}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}

function start(){
    if (pacMen.length < 1) {
        alert('It is necessary to Add at least one PacMan :)')
    } else {
        if (!started) {
            started = true;
            allowMovement = true;
            setTimeout(update, 100);
        }
    }
}

// function start(){
//     if (pacMen.length < 1) {
//         alert('It is necessary to Add at least one PacMan :)')
//     } else {
//         if (!started) {
//             allowMovement = true;
//             document.getElementById('btnStart').innerHTML = 'PAUSE ||';
//             setTimeout(update, 100);
//         } if (!allowMovement) {
//             allowMovement = true;
//             document.getElementById('btnStart').innerHTML = 'PAUSE ||';
//             setTimeout(update, 100);
//         } else {
//             allowMovement = false;
//             document.getElementById('btnStart').innerHTML = 'Start';
//         }
//     }
// }

function turnOff(){
    allowMovement = false;
 }


 function destroyMe(myID){
    if (typeof myID !== 'undefined') {
        // locate the "img" at the DOM:
        let pacImg = document.getElementById(myID);

        // locate in the PacMen (array)
        // the one PacMan that got clicked searching by its img.id
        let pac = getPac(pacImg.id);
        
        for (let i=(pacMen.length-1); i>=0; i--) {
        // search for the PacMan id and remove from the pacMen array 
        if(pacMen[i].img.id === pac.img.id){
            // remove from array
            pacMen.splice(i, 1);
            // remove img from the DOM:     
            pac.img.remove();

            checkAutoTurnOff();

            // end for loop
            break;
            }
        }
    }
}

function checkAutoTurnOff(){
    if (pacMen.length === 0){
        turnOff();
        started = false;
    }
}

function destroyLastPacMan(){
    pacManToDestroy = pacMen.pop();
    pacManToDestroy.img.remove();

    checkAutoTurnOff();
}

function destroyAllPacMen(){
  for (let i=(pacMen.length-1); i>=0; i--) {
     // pop one PacMan reference from the pacMen array
     pacToDestroy = pacMen.pop();
     // remove element from the DOM
     pacToDestroy.img.remove();
  }
}

function reset(){
    turnOff();
    started = false;
    destroyAllPacMen();
    // makeOne();
    // start();   
}

function reverseMovement(myID) {
    if (typeof myID !== 'undefined'){
        // locate the "img" at the DOM:
        let pacImg = document.getElementById(myID);
        // locate in the PacMen (array) the one PacMan that got clicked searchin by its img.id
        let pac = getPac(pacImg.id);

        pac.velocity.x = pac.velocity.x * -1;
    }
}

function getPac(myID) {
    //debugger;
    let pac = pacMen.find( aPac => {
        return aPac.img.id === myID
    });

    return pac; 
}

// added a "start" function to control starting process and thus prevent multiple setTimeOuts to be placed!
//      => it solved the speed being increased at every click on "Start Game"
// added a "click" property to each PacMan:
//      Click to reverse direction of the PacMan
//      CTRL+Click to kill the PacMan
// added "Kill on PacMan" button
// added Reset (Kill All) button
