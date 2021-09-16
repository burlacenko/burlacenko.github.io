var balls = document.getElementsByClassName("ball");

document.onmousemove = (event) => {

  // same movement for both:
  // var x = (event.clientX * 100) / window.innerWidth + "%";
  // var y = (event.clientY * 100) / window.innerHeight + "%";

  // for (let i = 0; i < 2; i++) {
  //   balls[i].style.left = x;
  //   balls[i].style.top = y;
  //   balls[i].transfoorm = "translate(-" + x + ",-" + y + ")";
  // }

  // 

  for (let i = 0; i < balls.length; i++) {
    
    let halfScreen = window.innerWidth / 2;

    if (balls[i].id = 'leftEye') {
      var x = (event.clientX * 100) / window.innerWidth + "%";
      var y = (event.clientY * 100) / window.innerHeight + "%";

      balls[i].style.left = x;
      balls[i].style.top = y;
      balls[i].transform = "translate(-" + x + ",-" + y + ")";
    }

    if (balls[i].id = 'rightEye') {
      var x = (event.clientX * 100) / window.innerWidth + "%";
      var y = (event.clientY * 100) / window.innerHeight + "%";

      balls[i].style.left = x;
      balls[i].style.top = y;
      balls[i].transform = "translate(-" + x + ",-" + y + ")";
    }    

  }
  
};