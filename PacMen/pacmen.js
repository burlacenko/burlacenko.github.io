const pacArray = [
    ['images/pacman1.png', 'images/pacman2.png'],
    ['images/pacman3.png', 'images/pacman4.png']
];
var direction = 0;
var focus = 0;
var posX = 0;
var posY = 0;

function Run() {
    let img = document.getElementById("PacMan");
    let imgWidth = img.width;
    let imgHeight = img.height;

    focus = (focus + 1) % 2;
    direction = checkPageBounds(direction, imgWidth, imgHeight);
    img.src = pacArray[direction][focus];
    if (direction) {
        posX -= 20;
        img.style.left = posX + "px";
    } else {
        posX += 20;
        img.style.left = posX + 'px';
    }
    // Use setTimeout to call Run every 200 millesecs
    setTimeout(Run, 200);
}

function checkPageBounds(direction, imgWidth, imgHeight) {
    //
    // Complete this to reverse direction on hitting page bounds
    // 
    let hitTheEdge = false;
    let limitX = window.innerWidth - imgWidth - 20;
    let limitY = window.innerHeight - imgHeight - 20 ;

    // reverse direction on X
    if(posX > limitX){
        direction = 1;
        hitTheEdge = true;
    }
    if(posX < 0) {
        direction = 0;
        hitTheEdge = true;
    }        

    return direction;
}
