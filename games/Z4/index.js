/* global Image, requestAnimationFrame, io */

// Physics




let maxPower = .45;
const maxReverse = 0.0475;
const powerFactor = 0.001;
const reverseFactor = 0.0005;

let drag = 0.85;
let angularDrag = 0.95;
let turnSpeed = 0.002;


var mq = window.matchMedia( "(max-width: 700px)" );
if (mq.matches) {
  maxPower = .35;
  drag = 0.95;
  angularDrag = 0.95;
  turnSpeed = 0.001;

}
else {
  maxPower = .6;
  drag = 0.95;
}



// Key codes

const arrowKeys = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
};
const wasdKeys = {
  up: 87,
  down: 83,
  left: 65,
  right: 68
};
const touchKeys = {
  up: 301,
  down: 302,
  left: 303,
  right: 304
};


const keyActive = (key) => {
  return keysDown[arrowKeys[key]] || keysDown[wasdKeys[key]] || keysDown[touchKeys[key]] ||false;
};

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const scene = document.getElementsByClassName("scene")[0];

const localCar = {
  el: document.getElementsByClassName("car")[0],
  x: windowWidth / 2,
  y: windowHeight / 2,
  xVelocity: 0,
  yVelocity: 0,
  power: 0,
  reverse: 0,
  angle: 0,
  angularVelocity: 0,
  isThrottling: false,
  isReversing: false
};

const cars = [localCar];
const carsById = {};

const keysDown = {};

let needResize;
let resizing;


window.addEventListener("keydown", (e) => {
  keysDown[e.which] = true;

});
window.addEventListener("keyup", (e) => {
  keysDown[e.which] = false;
});

const touching = {
  up: 0,
  down: 0,
  left: 0,
  right: 0
};



// window.addEventListener("touchstart", (e) => {
//   e.preventDefault();

//   if (touching.active) {
//     return;
//   }
//   touching.active = true;

//   const prevPos = {
//     x: e.touches[0].pageX,
//     y: e.touches[0].pageY
//   };

//   const touchmove = (e) => {
//     e.preventDefault();

//     const pos = {
//       x: e.touches[0].pageX,
//       y: e.touches[0].pageY
//     };

//     const diff = {
//       x: pos.x - prevPos.x,
//       y: pos.y - prevPos.y
//     };

//     prevPos.x = pos.x;
//     prevPos.y = pos.y;

//     touching.up -= diff.y / (windowHeight / 3);
//     touching.down += diff.y / (windowHeight / 3);
//     touching.left -= diff.x / (windowWidth / 3);
//     touching.right += diff.x / (windowWidth / 3);

//     touching.up = Math.max(0, Math.min(1, touching.up));
//     touching.down = Math.max(0, Math.min(1, touching.down));
//     touching.left = Math.max(0, Math.min(1, touching.left));
//     touching.right = Math.max(0, Math.min(1, touching.right));
//   };

//   const touchend = (e) => {
//     touching.active = false;
//     touching.up = 0;
//     touching.down = 0;
//     touching.left = 0;
//     touching.right = 0;

//     window.removeEventListener("touchmove", touchmove);
//     window.removeEventListener("touchend", touchend);
//   };

//   window.addEventListener("touchmove", touchmove);
//   window.addEventListener("touchend", touchend);
// });

function updateCar(car, i) {
  if (car.isThrottling) {
    car.power += powerFactor * car.isThrottling;
  } else {
    car.power -= powerFactor;
  }
  if (car.isReversing) {
    car.reverse += reverseFactor;
  } else {
    car.reverse -= reverseFactor;
  }

  car.power = Math.max(0, Math.min(maxPower, car.power));
  car.reverse = Math.max(0, Math.min(maxReverse, car.reverse));

  const direction = car.power > car.reverse ? 1 : -1;

  if (car.isTurningLeft) {
    car.angularVelocity -= direction * turnSpeed * car.isTurningLeft;
  }
  if (car.isTurningRight) {
    car.angularVelocity += direction * turnSpeed * car.isTurningRight;
  }

  car.xVelocity += Math.sin(car.angle) * (car.power - car.reverse);
  car.yVelocity += Math.cos(car.angle) * (car.power - car.reverse);

  car.x += car.xVelocity;
  car.y -= car.yVelocity;
  car.xVelocity *= drag;
  car.yVelocity *= drag;
  car.angle += car.angularVelocity;
  car.angularVelocity *= angularDrag;
}

function update() {
  cars.forEach(updateCar);
}

let lastTime;
let acc = 0;
const step = 1 / 120;

setInterval(() => {
  let changed;

  const canTurn = localCar.power > 0.0025 || localCar.reverse;

   if (touching.active) {
  //   const throttle = Math.round(touching.up * 10) / 10;
  //   const reverse = Math.round(touching.down * 10) / 10;

  //   if (
  //     localCar.isThrottling !== throttle ||
  //     localCar.isReversing !== reverse
  //   ) {
  //     changed = true;
  //     localCar.isThrottling = throttle;
  //     localCar.isReversing = reverse;
  //   }
  //      const turnLeft = canTurn && Math.round(touching.left * 10) / 10;
  //      const turnRight = canTurn && Math.round(touching.right * 10) / 10;

  //   if (localCar.isTurningLeft !== turnLeft) {
  //     changed = true;
  //     localCar.isTurningLeft = turnLeft;
  //   }
  //   if (localCar.isTurningRight !== turnRight) {
  //     changed = true;
  //     localCar.isTurningRight = turnRight;
  //   }
  } else {
    const pressingUp = keyActive("up");
    const pressingDown = keyActive("down");

    if (
      localCar.isThrottling !== pressingUp ||
      localCar.isReversing !== pressingDown
    ) {
      changed = true;
      localCar.isThrottling = pressingUp;
      localCar.isReversing = pressingDown;
    }

    const turnLeft = canTurn && keyActive("left");
    const turnRight = canTurn && keyActive("right");

    if (localCar.isTurningLeft !== turnLeft) {
      changed = true;
      localCar.isTurningLeft = turnLeft;
    }
    if (localCar.isTurningRight !== turnRight) {
      changed = true;
      localCar.isTurningRight = turnRight;
    }
  }

  if (localCar.x > windowWidth) {
    localCar.x -= windowWidth;
    changed = true;
  } else if (localCar.x < 0) {
    localCar.x += windowWidth;
    changed = true;
  }

  if (localCar.y > windowHeight) {
    localCar.y -= windowHeight;
    changed = true;
  } else if (localCar.y < 0) {
    localCar.y += windowHeight;
    changed = true;
  }

  const ms = Date.now();
  if (lastTime) {
    acc += (ms - lastTime) / 1000;

    while (acc > step) {
      update();

      acc -= step;
    }
  }

  lastTime = ms;

  if (changed) {
    sendParams(localCar);
  }
}, 1000 / 60);

function randomizeCarColour(el) {
  const colour = `hsl(${Math.floor(Math.random() * 16 * 16)}, 75%, 50%)`;

  el.style.background = colour;
}

function renderCar(car) {
  const { x, y, angle, power, reverse, angularVelocity } = car;

  car.el.style.transform = `translate(${x}px, ${y}px) rotate(${
    (angle * 180) / Math.PI
  }deg)`;

  if (power > 0.0025 || reverse) {
    if (
      (maxReverse === reverse || maxPower === power) &&
      Math.abs(angularVelocity) < 0.002
    ) {
      return;
    }
    ctx.fillRect(
      x -
        Math.cos(angle + (3 * Math.PI) / 2) * 3 +
        Math.cos(angle + (2 * Math.PI) / 2) * 3,
      y -
        Math.sin(angle + (3 * Math.PI) / 2) * 3 +
        Math.sin(angle + (2 * Math.PI) / 2) * 3,
      1,
      1
    );
    ctx.fillRect(
      x -
        Math.cos(angle + (3 * Math.PI) / 2) * 3 +
        Math.cos(angle + (4 * Math.PI) / 2) * 3,
      y -
        Math.sin(angle + (3 * Math.PI) / 2) * 3 +
        Math.sin(angle + (4 * Math.PI) / 2) * 3,
      1,
      1
    );
  }
}

function render(ms) {
  requestAnimationFrame(render);

  if (needResize || resizing) {
    needResize = false;

    if (!resizing) {
      resizing = true;

      const prevImage = new Image();
      prevImage.src = canvas.toDataURL();

      prevImage.onload = () => {
        resizing = false;

        canvas.width = windowWidth;
        canvas.height = windowHeight;

        ctx.fillStyle = "black";

        ctx.drawImage(prevImage, 0, 0);
      };
    }
  }

  cars.forEach(renderCar);
}

requestAnimationFrame(render);

function resize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  needResize = true;
}

resize();

window.addEventListener("resize", resize);


function sendParams(car) {
  const {
    x,
    y,
    xVelocity,
    yVelocity,
    power,
    reverse,
    angle,
    angularVelocity,
    isThrottling,
    isReversing,
    isTurningLeft,
    isTurningRight
  } = car;
}

const clearScreen = document.getElementsByTagName("button")[0];

clearScreen.onclick = () => {
  ctx.clearRect(0, 0, windowWidth, windowHeight);
};

setInterval(() => {
  ctx.fillStyle = "rgba(255, 255, 255, .05)";
  ctx.fillRect(0, 0, windowWidth, windowHeight);
  ctx.fillStyle = "rgba(63, 63, 63, 0.25)";
}, 40000);





var JoyStick = (function(container, parameters)
{
	parameters = parameters || {};
	var title = (typeof parameters.title === "undefined" ? "joystick" : parameters.title),
		width = (typeof parameters.width === "undefined" ? 0 : parameters.width),
		height = (typeof parameters.height === "undefined" ? 0 : parameters.height),
		internalFillColor = (typeof parameters.internalFillColor === "undefined" ? "#F1948A" : parameters.internalFillColor),
		internalLineWidth = (typeof parameters.internalLineWidth === "undefined" ? 2 : parameters.internalLineWidth),
		internalStrokeColor = (typeof parameters.internalStrokeColor === "undefined" ? "#EC7063" : parameters.internalStrokeColor),
		externalLineWidth = (typeof parameters.externalLineWidth === "undefined" ? 2 : parameters.externalLineWidth),
		externalStrokeColor = (typeof parameters.externalStrokeColor ===  "undefined" ? "#999" : parameters.externalStrokeColor),
		autoReturnToCenter = (typeof parameters.autoReturnToCenter === "undefined" ? true : parameters.autoReturnToCenter);
	
	// Create Canvas element and add it in the Container object
	var objContainer = document.getElementById(container);
	var canvas = document.createElement("canvas");
	canvas.id = title;
	if(width === 0) { width = objContainer.clientWidth; }
	if(height === 0) { height = objContainer.clientHeight; }
	canvas.width = width;
	canvas.height = height;
	objContainer.appendChild(canvas);
	var context=canvas.getContext("2d");
	
	var pressed = 0; // Bool - 1=Yes - 0=No
    var circumference = 2 * Math.PI;
    var internalRadius = (canvas.width-((canvas.width/2)+10))/2;
	var maxMoveStick = internalRadius + 1;
	var externalRadius = internalRadius + 29;
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var directionHorizontalLimitPos = canvas.width / 10;
	var directionHorizontalLimitNeg = directionHorizontalLimitPos * -1;
	var directionVerticalLimitPos = canvas.height / 10;
	var directionVerticalLimitNeg = directionVerticalLimitPos * -1;
	// Used to save current position of stick
	var movedX=centerX;
	var movedY=centerY;
		
	// Check if the device support the touch or not
	if("ontouchstart" in document.documentElement)
	{
		canvas.addEventListener("touchstart", onTouchStart, false);
		document.addEventListener("touchmove", onTouchMove, false);
		document.addEventListener("touchend", onTouchEnd, false);
	}
	else
	{
		canvas.addEventListener("mousedown", onMouseDown, false);
		document.addEventListener("mousemove", onMouseMove, false);
		document.addEventListener("mouseup", onMouseUp, false);
	}
	// Draw the object
	drawExternal();
	drawInternal();

	/******************************************************
	 * Private methods
	 *****************************************************/

	/**
	 * @desc Draw the external circle used as reference position
	 */
	function drawExternal()
	{
		context.beginPath();
		context.arc(centerX, centerY, externalRadius, 0, circumference, false);
		context.lineWidth = externalLineWidth;
		context.strokeStyle = externalStrokeColor;
		context.stroke();
	}

	function drawInternal()
	{
		context.beginPath();
		if(movedX < internalRadius) { movedX=maxMoveStick; }
		if((movedX + internalRadius) > canvas.width) { movedX = canvas.width-(maxMoveStick); }
		if(movedY < internalRadius) { movedY=maxMoveStick; }
		if((movedY + internalRadius) > canvas.height) { movedY = canvas.height-(maxMoveStick); }
		context.arc(movedX, movedY, internalRadius , 0, circumference, false);
		// create radial gradient
		var grd = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
		// Light color
		grd.addColorStop(0, internalFillColor);
		// Dark color
		grd.addColorStop(1, internalStrokeColor);
		context.fillStyle = grd;
		context.fill();
		context.lineWidth = internalLineWidth;
		context.strokeStyle = internalStrokeColor;
		context.stroke();
	}
	
	/**
	 * @desc Events for manage touch
	 */
	function onTouchStart(event) 
	{
		pressed = 1;
	}

	function onTouchMove(event)
	{
		// Prevent the browser from doing its default thing (scroll, zoom)
		event.preventDefault();
		if(pressed === 1 && event.targetTouches[0].target === canvas)
		{
			movedX = event.targetTouches[0].pageX;
			movedY = event.targetTouches[0].pageY;
			// Manage offset
			if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
			{
				movedX -= canvas.offsetLeft;
				movedY -= canvas.offsetTop;
			}
			else
			{
				movedX -= canvas.offsetParent.offsetLeft;
				movedY -= canvas.offsetParent.offsetTop;
			}
			// Delete canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Redraw object
			drawExternal();
			drawInternal();
		}
    
	} 

	function onTouchEnd(event) 
	{
		pressed = 0;
		// If required reset position store variable
		if(autoReturnToCenter)
		{
			movedX = centerX;
			movedY = centerY;
		}
		// Delete canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Redraw object
		drawExternal();
		drawInternal();
		//canvas.unbind('touchmove');
	}

	/**
	 * @desc Events for manage mouse
	 */
	function onMouseDown(event) 
	{
		pressed = 1;
	}

	function onMouseMove(event) 
	{
		if(pressed === 1)
		{
			movedX = event.pageX;
			movedY = event.pageY;
			// Manage offset
			if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
			{
				movedX -= canvas.offsetLeft;
				movedY -= canvas.offsetTop;
			}
			else
			{
				movedX -= canvas.offsetParent.offsetLeft;
				movedY -= canvas.offsetParent.offsetTop;
			}
			// Delete canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Redraw object
			drawExternal();
			drawInternal();
		}
    
  }

	function onMouseUp(event) 
	{
		pressed = 0;
		// If required reset position store variable
		if(autoReturnToCenter)
		{
			movedX = centerX;
			movedY = centerY;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawExternal();
		drawInternal();
	}

	this.GetDir = function()
	{
		var result = "";
		var orizontal = movedX - centerX;
		var vertical = movedY - centerY;
		
		if(vertical >= directionVerticalLimitNeg && vertical <= directionVerticalLimitPos)
		{
			result = "C";
		}
		if(vertical < directionVerticalLimitNeg)
		{
			result = "N";
		}
		if(vertical > directionVerticalLimitPos)
		{
			result = "S";
		}
		
		if(orizontal < directionHorizontalLimitNeg)
		{
			if(result === "C")
			{ 
				result = "W";
			}
			else
			{
				result += "W";
			}
		}
		if(orizontal > directionHorizontalLimitPos)
		{
			if(result === "C")
			{ 
				result = "E";
			}
			else
			{
				result += "E";
			}
		}
		return result;
	};

});

let joyParam = { "title": "joystick" };
let joy = new JoyStick('joyDiv' , joyParam);
let joyPos;

setInterval(function(){
    joyPos = joy.GetDir();
    if(joyPos === "C"){
      keysDown[301] = false;
      keysDown[302] = false;
      keysDown[304] = false;
      keysDown[303] = false;
    }else if(joyPos === "N"){
      keysDown[301] = true;
      keysDown[302] = false;
      keysDown[304] = false;
      keysDown[303] = false;
    }else if(joyPos === "NW"){
      keysDown[301] = true;
      keysDown[302] = false;
      keysDown[304] = false;
      keysDown[303] = true;
    }else if(joyPos === "NE"){
      keysDown[301] = true;
      keysDown[302] = false;
      keysDown[304] = true;
      keysDown[303] = false;
    }else if(joyPos === "W"){
      keysDown[301] = false;
      keysDown[302] = false;
      keysDown[304] = false;
      keysDown[303] = true;
    }else if(joyPos === "E"){
      keysDown[301] = false;
      keysDown[302] = false;
      keysDown[304] = true;
      keysDown[303] = false;
    }else if(joyPos === "S"){
      keysDown[301] = false;
      keysDown[302] = true;
      keysDown[304] = false;
      keysDown[303] = false;
    }else if(joyPos === "SW"){
      keysDown[301] = false;
      keysDown[302] = true;
      keysDown[304] = false;
      keysDown[303] = true;
    }else if(joyPos === "SE"){
      keysDown[301] = false;
      keysDown[302] = true;
      keysDown[304] = true;
      keysDown[303] = false;
    }

}, 50);


// input change text apear in middle of the thing 

// let input = document.getElementsByTagName("input")[0];
// console.log(input);
// let middleText = document.createElement('h1');
// document.getElementsByTagName('body')[0].appendChild(middleText);
// middleText.style.fontSize = "235px";
// middleText.style.color = "transparent";
// middleText.style.width = "100%";
// middleText.style.height = "100%";
// middleText.style.position = "absolute";
// middleText.style.display = "grid";
// middleText.style.placeContent = "center";
// middleText.style.margin = "0";
// middleText.style.letterSpacing = "25px";
// middleText.style.textTransform = "uppercase";
// middleText.style.textStroke = "2px red";
// middleText.style.webkitTextStroke = "2px #333";
// middleText.style.zIndex = "-1";



// function inputChange() {
//   middleText.innerHTML = input.value;
// }