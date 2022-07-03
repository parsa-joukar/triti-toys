let body = document.getElementsByTagName('BODY')[0];
let c = document.createElement("canvas");
let mobileQuery = window.matchMedia("(max-width: 1000px)");
if (mobileQuery.matches) {
  c.style.transform = "rotateZ(90deg)";
  c.width =  body.offsetHeight;
  c.height = window.innerWidth;

  body.scrollTo(100 , 1000);
  let arrowUp = document.createElement('div');
  let arrowDown = document.createElement('div');
  let arrowRight = document.createElement('div');
  let arrowLeft = document.createElement('div');
  let spanUp = document.createElement('span');
  let spanDown = document.createElement('span');
  let spanRight = document.createElement('span');
  let spanLeft = document.createElement('span');
  arrowUp.classList.add("arrow","arrow-up");
  arrowDown.classList.add("arrow" , "arrow-down");
  arrowRight.classList.add("arrow" , "arrow-right");
  arrowLeft.classList.add("arrow" , "arrow-left");
  arrowUp.appendChild(spanUp);
  arrowDown.appendChild(spanDown);
  arrowRight.appendChild(spanRight);
  arrowLeft.appendChild(spanLeft);
  body.appendChild(arrowUp);
  body.appendChild(arrowDown);
  body.appendChild(arrowRight);
  body.appendChild(arrowLeft);
  spanUp.style.backgroundImage = "url(./right-gas.svg)";
  spanDown.style.backgroundImage = "url(./left-gas.svg)";
  // functions 
  arrowUp.addEventListener("touchstart", function (e){
    e.preventDefault(); 
    k.ArrowUp = 1;
    arrowUp.style.backgroundImage = "linear-gradient(to top , rgba(0, 255, 21, 1) ,  rgba(58, 138, 47, 0.85))";
  }, true);
  arrowDown.addEventListener("touchstart", function (e){
    e.preventDefault(); 
    k.ArrowDown= 1;
    arrowDown.style.backgroundImage = "linear-gradient(to top ,rgba(184, 49, 49, 1) ,  rgba(112, 49, 49, 0.85))";

  }, true);
  arrowRight.addEventListener("touchstart", function (e){
    e.preventDefault(); 
    k.ArrowRight= 1;
    arrowRight.style.backgroundImage = "linear-gradient(to top , rgba(19, 17, 17, 1) , rgba(56, 56, 53, 0.85)";
  }, true);
  arrowLeft.addEventListener("touchstart", function (e){
    e.preventDefault(); 
    k.ArrowLeft= 1;
    arrowLeft.style.backgroundImage = "linear-gradient(to top , rgba(19, 17, 17, 1) , rgba(56, 56, 53, 0.85)";

  }, true);
  arrowUp.addEventListener("touchend", function (e){
    e.preventDefault(); 
    k.ArrowUp = 0;
    arrowUp.style.backgroundImage = "linear-gradient(to top , rgba(0, 255, 21, 0.65) ,  rgba(58, 138, 47, 0.45))";

  }, true);
  arrowDown.addEventListener("touchend", function (e){
    e.preventDefault(); 
    k.ArrowDown= 0;
    arrowDown.style.backgroundImage = "linear-gradient(to top ,rgba(184, 49, 49, 0.65) ,  rgba(112, 49, 49, 0.45)";
  }, true);
  arrowRight.addEventListener("touchend", function (e){
    e.preventDefault(); 
    k.ArrowRight= 0;
    arrowRight.style.backgroundImage = "linear-gradient(to top , rgba(19, 17, 17, 0.65) , rgba(56, 56, 53, 0.45)";
  }, true);
  arrowLeft.addEventListener("touchend", function (e){
    e.preventDefault(); 
    k.ArrowLeft= 0;
    arrowLeft.style.backgroundImage = "linear-gradient(to top , rgba(19, 17, 17, 0.65) , rgba(56, 56, 53, 0.45)";
  }, true);

  const scoreX = document.querySelector(".score");
  const highScore = document.querySelector(".high-score");

  scoreX.style.transform = "rotateZ(90deg)";
  highScore.style.transform = "rotateZ(90deg)";
  scoreX.style.top = "5vh";
  scoreX.style.left = "77vw";
  highScore.style.top = "4vh";
  highScore.style.left = "70vw";
  scoreX.style.fontSize = "2vh";
  highScore.style.fontSize = "2vh"; 

  const homeIcon = document.getElementsByTagName("a")[0];

  homeIcon.style.position = "absolute";
  homeIcon.style.width = "40px";
  homeIcon.style.height = "auto";
  homeIcon.style.top = "9vh";
  homeIcon.style.left = "85vw";
  homeIcon.style.zIndex = "2";
  homeIcon.style.transform = "rotateZ(90deg)";



}else{
  c.width =  window.innerWidth;
  c.height = window.innerHeight - window.innerHeight / 10;
}
    let ctx = c.getContext("2d");
    document.body.appendChild(c);
    let scoreInc =  0;
    let score = document.querySelector(".score");
    let highScore = document.querySelector(".high-score");
    highScore.innerHTML = parseFloat(localStorage.getItem("thehighScoreValue")) || 0;
    let perm = [];
    while (perm.length < 500) {
      while (perm.includes(val = Math.floor(Math.random() * 500)));
      perm.push(val);
    }
    
    let lerp = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
    let noise = x => {
      x = x * 0.01 % 499;
      return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
    };
    
    let Player = function () {
      this.x = c.width / 2;
      this.y = c.height / 2;
      this.ySpeed = 0;
      this.rot = 0;
      this.rSpeed = 0;
      this.img = new Image();
      this.img.src = "./tritrike-with-rider.png";
      this.img.height = "200px";
      this.draw = function () {
        let p1 = c.height - noise(t + this.x) * 0.25;
        let p2 = c.height - noise(t + 5 + this.x) * 0.25;
        
        let grounded = 0;
        if (p1 - 12 > this.y) {
          this.ySpeed += 0.3;                           //after jumping speed 
        } else {
          this.ySpeed -= this.y - (p1 - 12);
          this.y = p1 - 12;
          grounded = 1;
        }
    
        let angle = Math.atan2(p2 - 12 - this.y, this.x + 5 - this.x);
        this.y += this.ySpeed;
    
        if (!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
          playing = false;
          this.rSpeed = 3;
          k.ArrowUp = 1;
          this.x -= speed * 20;
        }
    
    
        if (grounded && playing) {
          this.rot -= (this.rot - angle) * 0.65;
          this.rSpeed = this.rSpeed - (angle - this.rot);
        }
        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
        this.rot -= this.rSpeed * 0.1;
        if (this.rot > Math.PI) this.rot = -Math.PI;
        if (this.rot < -Math.PI) this.rot = Math.PI;
        ctx.save();
        ctx.translate(this.x, this.y - 3);
        ctx.rotate(this.rot);
        ctx.drawImage(this.img, -15, -15, 30, 30);
        ctx.restore();
      };
    };
    let balfade = 0;
    let player = new Player();
    let t = 0;
    let speed = 0;
    let playing = true;

    let k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 }; 
    let scoreState = 0;
    let currentColor = {
      r: 17,
      g: 153,
      b: 255
    };
    let magic = false;

    function blendColors(r1,g1,b1,r2,g2,b2,balance) {
      let bal = Math.min(Math.max(balance,0),1);
      let nbal = 1-bal;
      return {
              r : Math.floor(r1*nbal + r2*bal),
              g : Math.floor(g1*nbal + g2*bal),
              b : Math.floor(b1*nbal + b2*bal)
             };
    }
    let i= 0 ;
    function loop() {
      speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.07;
      t += 10 * speed;
      
      // if(scoreInc > 100 && scoreState === 0){
      //   let bc = blendColors(17,153,255,68,68,68,balfade);
      //   ctx.fillStyle = 'rgb('+ bc.r +','+ bc.g +','+ bc.b +')';
      //   currentColor = {
      //     r: bc.r,
      //     g: bc.g,
      //     b: bc.b
      //   };
      //   console.log(currentColor);
      //   if (balfade < 1 && scoreState === 0) {
      //     balfade += 0.02;
      //   }else if(scoreInc > 100){
      //     scoreState = 1;
      //     balfade = 0;
      //     magic = true;
      //     currentColor = {
      //       r: bc.r,
      //       g: bc.g,
      //       b: bc.b
      //     };
      //   }

      // }
      // // else if(scoreInc > 3300 && scoreState === 1){
      // //   let abc = blendColors(  68 , 68 , 68 , 76 , 18 , 161 ,balfade);
      // //   ctx.fillStyle = 'rgb('+ abc.r +','+ abc.g +','+ abc.b +')';
      // //   currentColor = {
      // //     r: abc.r,
      // //     g: abc.g,
      // //     b: abc.b
      // //   };
      // //   if (balfade < 1 && scoreState === 1) {
      // //     balfade += 0.02;
      // //   }else{
      // //     //scoreState = 2;
      // //   }
        
      // // }
      // else{
      //   let backToColor = blendColors(  currentColor.r , currentColor.g , currentColor.b , 17 , 153 , 255 ,balfade);
      //   ctx.fillStyle = 'rgb('+ backToColor.r +','+ backToColor.g +','+ backToColor.b +')';
      //   if (balfade < 1 && magic) {
      //   console.log(balfade , magic);
      //     console.log("1");
      //     balfade += 0.001;
      //   }
      // }
      ctx.fillStyle = "#19E";
      ctx.fillRect(0, 0, c.width , c.height);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.moveTo(0, c.height);
      for (let i = 0; i < c.width; i++)
      ctx.lineTo(i, c.height * 0.8 - noise(t + i * 5) * 0.25);
      ctx.lineTo(c.width, c.height);
      ctx.fill();
    
      ctx.fillStyle = "#444";
      ctx.beginPath();
      ctx.moveTo(0, c.height);
      for (let i = 0; i < c.width; i++)
      ctx.lineTo(i, c.height - noise(t + i) * 0.25);
      ctx.lineTo(c.width, c.height);
      ctx.fill();
        
      player.draw();
      
      // score //
    if(k.ArrowUp === 1 && k.ArrowDown !== 1){
        scoreInc += 1;
    }else{
      if( ( scoreInc / 10 ) > highScore.innerHTML){
          localStorage.setItem("thehighScoreValue", JSON.stringify(scoreInc / 10));
          highScore.innerHTML = parseFloat(localStorage.getItem("thehighScoreValue"));
      }  
      scoreInc = 0;
    }

    score.innerHTML = scoreInc / 10;
    
    // ----  //
      if (player.x < 0)
      restart();
      requestAnimationFrame(loop);
    }
    
    onkeydown = d => k[d.key] = 1;
    onkeyup = d => k[d.key] = 0;
    
    function restart() {
    
      player = new Player();
      t = 0;
      speed = 0;
      playing = true;
      k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };
    
    }
    loop();



