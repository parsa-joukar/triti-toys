

//-----------------------------cubes setup ----------------//

const mediaQueryMobile = window.matchMedia("(max-width: 600px)");

const containerGrid = document.querySelector(".container");
const conOneOne = document.querySelectorAll(".cube-container");
const conOneTwo = document.querySelectorAll(".cube-container-1-2");
const conTwoOne = document.querySelectorAll(".cube-container-2-1");
const conTwoTwo = document.querySelectorAll(".cube-container-2-2");
var WidthOneOne = conOneOne[0].clientWidth;
var WidthOneTwo = conOneTwo[0].clientWidth;
var WidthTwoOne = conTwoOne[0].clientWidth;
var HeightTwoOne = WidthTwoOne * 2 + 6;
var WidthTwoTwo = conTwoTwo[0].clientWidth;
var breakOneOne = conOneOne[0].clientWidth + 100;
var breakOneTwo = conOneTwo[0].clientWidth + 100;
var breakTwoOne = HeightTwoOne + 100;
var breakTwoTwo = conTwoTwo[0].clientWidth + 100;
containerGrid.style.gridTemplateRows =
  "repeat(auto-fit," + WidthOneOne * 2 + "px)";
containerGrid.style.gridAutoRows = WidthOneOne * 2 + "px";

(function () {
  for (let i = 0; i < conOneOne.length; i++) {
    conOneOne[i].style.perspective = WidthOneOne + "px";
    conOneOne[i].style.height = WidthOneOne + "px";
    const faces = conOneOne[i].querySelectorAll(".cube__face");
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" + i * 90 + "deg) translateZ(" + WidthOneOne / 2 + "px)";
    }
  }

  for (let i = 0; i < conOneTwo.length; i++) {
    conOneTwo[i].style.perspective = WidthOneTwo + "px";
    conOneTwo[i].style.height = (WidthOneTwo - 6) / 2 + "px";
	conOneTwo[i].style.width = WidthOneTwo +"px";
    const faces = conOneTwo[i].querySelectorAll(".cube__face-1-2");
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" + i * 90 + "deg) translateZ(" + WidthOneTwo / 2 + "px)";
    }
  }

  for (let i = 0; i < conTwoOne.length; i++) {
    conTwoOne[i].style.perspective = WidthTwoOne + "px";
    conTwoOne[i].style.height = HeightTwoOne + "px";
    const faces = conTwoOne[i].querySelectorAll(".cube__face-2-1");
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" + i * 90 + "deg) translateZ(" + WidthTwoOne / 2 + "px)";
    }
  }
  for (let i = 0; i < conTwoTwo.length; i++) {
    conTwoTwo[i].style.perspective = WidthTwoTwo + "px";
    conTwoTwo[i].style.height = WidthTwoTwo + "px";
    const faces = conTwoTwo[i].querySelectorAll(".cube__face-2-2");
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" + i * 90 + "deg) translateZ(" + WidthTwoTwo / 2 + "px)";
    }
  }
})();

//-----------------------------on resize changes----------------//

//window.addEventListener("resize", onResize , false);

//-----------------------------on hover setupt ----------------//

const mainContainer = document.querySelector(".container");
const containerChilds = mainContainer.children;

for (let i = 0; i < containerChilds.length; i++) {
  containerChilds[i].addEventListener(
    "mouseover",
    function () {
      onhover(i);
    },
    true
  );
  containerChilds[i].addEventListener(
    "touchdown",
    function () {
      onhover(i);
    },
    true
  );
}

function onhover(cubeNo) {
  if (!isItBigOneOne && !isItBigOneTwo && !isItBigTwoOne && !isItBigTwoTwo) {
    let whichCube;

    for (let i = 0; i < containerChilds.length; i++) {
      if (i == cubeNo) {
        whichCube = i;
        containerChilds[i].style.transform = "scale(1.02)";
        containerChilds[i].style.zIndex = "2";
      } else {
        containerChilds[i].style.transform = "scale(1)";
        containerChilds[i].style.zIndex = "1";
      }
    }
    if (
      howBigOneOne > breakOneOne ||
      howBigOneTwo > breakOneTwo ||
      howBigTwoOne > breakTwoOne ||
      howBigTwoTwo > breakTwoTwo
    ) {
      containerChilds[whichCube].style.transform = "scale(1)";
      containerChilds[whichCube].style.zIndex = "20";
      containerChilds[whichCube].querySelector(".all-cubes").style.zIndex =
        "20";
    }
    setTimeout(function () {
      if (
        !isItBigOneOne &&
        !isItBigOneTwo &&
        !isItBigTwoOne &&
        !isItBigTwoTwo
      ) {
        containerChilds[whichCube].style.transform = "scale(1)";
        containerChilds[whichCube].style.zIndex = "1";
      }
    }, 1000);
  }
}

//--------------------------------1-1-----------------------------------//

const cubeOneOne = document.querySelectorAll(".cube-container-1-1");

const cubeRotatorOneOne = document.querySelectorAll(".cube-1-1");
const cubeLoaderOneOne = document.querySelectorAll(".cube-loader-1-1");
const loaderSpanOneOne = document.querySelectorAll(".cube-span-1-1");
const exitOneOne = document.querySelectorAll(".exit-1-1");

const expandOneOne = document.querySelectorAll(".expand-1-1");

var counterOneOne = 0;
let isholdOneOne = false;
let isItBigOneOne = false;
var howBigOneOne;
let startXOneOne;
var anglesOneOne = [0, 90, 180, 270];
var cubeRotateAngleOneOne = [0, 0, 0, 0];

//-----------------------------------------
//    calling functions
//------------------------------------------

for (let i = 0; i < cubeOneOne.length; i++) {
  cubeOneOne[i].addEventListener(
    "mousedown",
    function (e) {
      var eve = e;
      onMousedownOneOne(eve, i);
    },
    false
  );

  cubeOneOne[i].addEventListener(
    "mouseup",
    function (e) {
      onMouseUpOneOne(i);
    },
    false
  );
  cubeOneOne[i].addEventListener(
    "mousemove",
    function (e) {
      var eve = e;
      onMousemoveOneOne(eve, i);
    },
    false
  );
  cubeOneOne[i].addEventListener(
    "mouseleave",
    function (e) {
      onMouseleaveOneOne(i);
    },
    false
  );
  //                     for mobile                      //
  cubeOneOne[i].addEventListener(
    "touchstart",
    function (e) {
      var eve = e;
      onMousedownOneOne(eve, i);
    },
    false
  );
  cubeOneOne[i].addEventListener(
    "touchend",
    function (e) {
      onMouseUpOneOne(i);
    },
    false
  );
  cubeOneOne[i].addEventListener(
    "touchmove",
    function (e) {
      var eve = e;
      onMousemoveOneOne(eve, i);
    },
    false
  );
  //------------- on exit -----------
  exitOneOne[i].addEventListener(
    "click",
    function (e) {
      backToNormOneOne(i);
    },
    false
  );
  //-------------- on expand----------
  expandOneOne[i].addEventListener(
    "click",
    function (e) {
      onExpandOneOne(i);
    },
    false
  );
}

//-----------------------------------------
//    on mouse down
//------------------------------------------

function onMousedownOneOne(eve, cubeNo) {
  if (!isItBigOneOne) {
    isholdOneOne = true;
    const pos = eve.pageX || eve.touches[0].pageX;
    cubeOneOne[cubeNo].classList.add("active");
    startXOneOne = pos - cubeOneOne[cubeNo].offsetLeft;
  }
}

//-----------------------------------------
//    on mouse leave
//------------------------------------------
function onMouseleaveOneOne(cubeNo) {
  const faces = cubeOneOne[cubeNo].querySelectorAll(".cube__face-1-1");

  if (!isItBigOneOne) {
    isholdOneOne = false;
    cubeOneOne[cubeNo].classList.remove("active");
    anglesOneOne = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneOne[i] +
        "deg) translateZ(" +
        WidthOneOne / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse up
//------------------------------------------
function onMouseUpOneOne(cubeNo) {
  const faces = cubeOneOne[cubeNo].querySelectorAll(".cube__face-1-1");

  if (!isItBigOneOne) {
    isholdOneOne = false;
    cubeOneOne[cubeNo].classList.remove("active");
    anglesOneOne = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneOne[i] +
        "deg) translateZ(" +
        WidthOneOne / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse move
//------------------------------------------
function onMousemoveOneOne(eve, cubeNo) {
  const faces = cubeOneOne[cubeNo].querySelectorAll(".cube__face-1-1");
  if (!isholdOneOne || isItBigOneOne) return; //stops function if clicke isnt hold
  cubeOneOne[cubeNo].classList.add("active");
  
  const pos = eve.pageX || eve.touches[0].pageX;
  const x = pos - cubeOneOne[cubeNo].offsetLeft;
  const walk = (x - startXOneOne) / 10;
  let i, angle;

  if (walk < 10 && walk > -10) {
    for (i = 0; faces.length; i++) {
      anglesOneOne[i] += walk;
      angle = anglesOneOne[i];
      faces[i].style.transform =
        "rotateY(" + angle + "deg) translateZ(" + howBigOneOne / 2 + "px)";
    }

    onMouseUpOneOne(cubeNo);
  } else if (walk >= 10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";

    cubeRotateAngleOneOne[cubeNo] += 90;

    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleOneOne[cubeNo] + "deg)";

    anglesOneOne = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneOne[i] +
        "deg) translateZ(" +
        howBigOneOne / 2 +
        "px)";
    }

    onMouseUpOneOne(cubeNo);
  } else if (walk <= -10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleOneOne[cubeNo] -= 90;

    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleOneOne[cubeNo] + "deg)";

    anglesOneOne = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneOne[i] +
        "deg) translateZ(" +
        howBigOneOne / 2 +
        "px)";
    }

    onMouseUpOneOne(cubeNo);
  }
}

//------------------------------------------------on hold functions------------------------------------------

var isBigOneOne = false;

function onExpandOneOne(cubeNo) {
  expandOneOne[cubeNo].style.display = "none";
  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "hidden";
  window.scrollTo(0, 0);

  const imgOneOne = cubeOneOne[cubeNo].querySelectorAll(".img-1-1");
  const aboutUs = cubeOneOne[cubeNo].querySelectorAll(".about-us");
  if(cubeNo == 0){
    for (let i = 0; i < imgOneOne.length; i++) {
      imgOneOne[i].style.display = "none";
      aboutUs[i].style.display = "block";
    }
  }else{
    for (let i = 0; i < imgOneOne.length; i++) {
      imgOneOne[i].style.display = "none";
      aboutUs[i].style.display = "flex";
    }
  }
  
  // this is the place we have work for games
  cubeOneOne[cubeNo].style.transitionDuration = ".3s";
  cubeOneOne[cubeNo].style.position = "fixed";
  cubeOneOne[cubeNo].style.height = "120%";
  cubeOneOne[cubeNo].style.width = "100vw";
  cubeOneOne[cubeNo].style.top = "0";
  cubeOneOne[cubeNo].style.left = "0";
  cubeOneOne[cubeNo].style.zIndex = "20";
  cubeOneOne[cubeNo].style.overflow = "scroll";
  cubeOneOne[cubeNo].style.backgroundColor = "#ffffff";
  cubeRotatorOneOne[cubeNo].style.backgroundColor = "#ffffff";
  isBigOneOne = true;
  isItBigOneOne = true;
  isholdOneOne = false;
  cubeLoaderOneOne[cubeNo].style.display = "none";
  loaderSpanOneOne[cubeNo].style.width = "0px";
  exitOneOne[cubeNo].style.display = "flex";
  fullFaceViewOneOne(cubeNo);
}

function fullFaceViewOneOne(cubeNo) {
  const faces = cubeOneOne[cubeNo].querySelectorAll(".cube__face-1-1");
  cubeRotatorOneOne[cubeNo].style.width = "100%";
  cubeRotatorOneOne[cubeNo].style.height = "100%";
  cubeRotatorOneOne[cubeNo].style.flexDirection = "column";
  cubeRotatorOneOne[cubeNo].style.overflow = "scroll";
  cubeRotatorOneOne[cubeNo].style.padding = "65px 0 150px 0";
  cubeRotatorOneOne[cubeNo].style.backgroundColor = "#fff";
  cubeOneOne[cubeNo].style.zIndex = "20";
  cubeRotatorOneOne[cubeNo].style.zIndex = "20";
  cubeRotatorOneOne[cubeNo].style.opacity = "1";

  setTimeout(function () {
    exitOneOne[cubeNo].style.visibility = "visible";
    exitOneOne[cubeNo].style.opacity = "1";
    cubeOneOne[cubeNo].style.zIndex = "20";
    cubeRotatorOneOne[cubeNo].style.zIndex = "20";
  }, 800);

  for (let i = 0; i < 4; i++) {
    faces[i].style.position = "relative";
    faces[i].style.transition = "all 1.5s";
    faces[i].style.marginBottom = "20px";
    faces[i].style.textAlign = "right";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.width = WidthOneTwo * 2 + "px";
    faces[i].style.height = WidthOneTwo - 6 + "px";
    faces[i].style.backgroundColor = "#e7e7e7";
  }

  faces[1].style.transition = "none";
  faces[2].style.transition = "none";
  faces[3].style.transition = "none";

  cubeRotationOneOne(cubeNo);
}

function cubeRotationOneOne(cubeNo) {
  let rotationRounds = cubeRotateAngleOneOne[cubeNo] / 90;
  let rotationRoundsAbs = Math.abs(rotationRounds);
  let firstX;
  let secondX;

  if (cubeRotateAngleOneOne[cubeNo] < 0) {
    firstX = ((rotationRounds - 1) / 4) % 1;
    secondX = ((rotationRounds - 3) / 4) % 1;
  } else {
    secondX = ((rotationRounds - 1) / 4) % 1;
    firstX = ((rotationRounds - 3) / 4) % 1;
  }
  backX = ((rotationRounds - 2) / 4) % 1;
  if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleOneOne[cubeNo] < 0
  ) {
    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneOne[cubeNo] - 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleOneOne[cubeNo] < 0
  ) {
    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneOne[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleOneOne[cubeNo] > 0
  ) {
    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneOne[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleOneOne[cubeNo] > 0
  ) {
    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneOne[cubeNo] - 90) + "deg)";
  } else if (backX === 0) {
    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneOne[cubeNo] - 180) + "deg)";
  } else {
    cubeRotatorOneOne[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleOneOne[cubeNo] + "deg)";
  }
}

function backToNormOneOne(cubeNo) {
  expandOneOne[cubeNo].style.display = "block";

  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "scroll";
  body[0].style.overflowX = "hidden";
  cubeRotatorOneOne[cubeNo].style.padding = "0";

  const imgOneOne = cubeOneOne[cubeNo].querySelectorAll(".img-1-1");
  const aboutUs = cubeOneOne[cubeNo].querySelectorAll(".about-us");
  for (let i = 0; i < imgOneOne.length; i++) {
    imgOneOne[i].style.display = "block";
    aboutUs[i].style.display = "none";
  }

  const faces = cubeOneOne[cubeNo].querySelectorAll(".cube__face-1-1");
  cubeOneOne[cubeNo].style.position = "relative";
  cubeOneOne[cubeNo].style.height = WidthOneOne + "px";
  cubeOneOne[cubeNo].style.width = WidthOneOne + "px";
  cubeOneOne[cubeNo].style.overflow = "visible";
  cubeOneOne[cubeNo].style.overflowX = "visible";
  cubeOneOne[cubeNo].style.perspective = WidthOneOne + "px";

  cubeRotatorOneOne[cubeNo].style.width = "100%";
  cubeRotatorOneOne[cubeNo].style.height = "100%";
  cubeRotatorOneOne[cubeNo].style.display = "flex";
  cubeRotatorOneOne[cubeNo].style.transformStyle = "preserve-3d";
  cubeRotatorOneOne[cubeNo].style.overflow = "visible";
  cubeRotatorOneOne[cubeNo].style.position = "relative";
  cubeRotatorOneOne[cubeNo].style.top = "0";

  for (let i = 0; i < faces.length; i++) {
    faces[i].style.position = "absolute";
    faces[i].style.height = "100%";
    faces[i].style.width = "100%";
    faces[i].style.marginBottom = "0px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.transform =
      "rotateY(" + i * 90 + "deg) translateZ(" + WidthOneOne / 2 + "px)";
    faces[i].style.transition = "0.3s";
    if (cubeNo == 0) {
      faces[i].style.backgroundColor = "#c8e5ed";
    } else {
      faces[i].style.backgroundColor = "#f58181";
    }
  }

  exitOneOne[cubeNo].style.display = "none";

  cubeOneOne[cubeNo].style.zIndex = "1";

  cubeRotatorOneOne[cubeNo].style.zIndex = "1";

  isBigOneOne = false;
  isItBigOneOne = false;
}

//------------------------------------1-2--------------------------------//

const cubeOneTwo = document.querySelectorAll(".cube-container-1-2");

const cubeRotatorOneTwo = document.querySelectorAll(".cube-1-2");
const cubeLoaderOneTwo = document.querySelectorAll(".cube-loader-1-2");
const loaderSpanOneTwo = document.querySelectorAll(".cube-span-1-2");
const exitOneTwo = document.querySelectorAll(".exit-1-2");
const imgOneTwo = document.querySelectorAll(".img-1-2");
const imgHolderOneTwo = document.querySelectorAll(".imgholder-1-2");
const vidOneTwo = document.querySelectorAll(".video-1-2");
const proNameOneTwo = document.querySelectorAll(".product-name-1-2");
const proDesOneTwo = document.querySelectorAll(".product-des-1-2");
const proColOneTwo = document.querySelectorAll(".product-col-1-2");
const hintRight = document.querySelector(".hint-right");
const hintLeft = document.querySelector(".hint-left");

const expandOneTwo = document.querySelectorAll(".expand-1-2");

var counterOneTwo = 0;
let isholdOneTwo = false;
let isItBigOneTwo = false;
var howBigOneTwo;
let startXOneTwo;
var anglesOneTwo = [0, 90, 180, 270];
var cubeRotateAngleOneTwo = [0, 0, 0, 0];
let fixedAngleOneTwo = [];

const lastSideCubeRotatorOneTwo =
  document.querySelectorAll(".cube__face-1-2_4");

//-----------------------------------------
//    calling functions
//------------------------------------------

for (let i = 0; i < cubeOneTwo.length; i++) {
  cubeOneTwo[i].addEventListener(
    "mousedown",
    function (e) {
      var eve = e;
      onMousedownOneTwo(eve, i);
    },
    false
  );

  cubeOneTwo[i].addEventListener(
    "mouseup",
    function (e) {
      onMouseUpOneTwo(i);
    },
    false
  );
  cubeOneTwo[i].addEventListener(
    "mousemove",
    function (e) {
      var eve = e;
      onMousemoveOneTwo(eve, i);
    },
    false
  );
  cubeOneTwo[i].addEventListener(
    "mouseleave",
    function (e) {
      onMouseleaveOneTwo(i);
    },
    false
  );
  //                     for mobile                      //
  cubeOneTwo[i].addEventListener(
    "touchstart",
    function (e) {
      var eve = e;
      onMousedownOneTwo(eve, i);
    },
    false
  );
  cubeOneTwo[i].addEventListener(
    "touchend",
    function (e) {
      onMouseUpOneTwo(i);
    },
    false
  );
  cubeOneTwo[i].addEventListener(
    "touchmove",
    function (e) {
      var eve = e;
      onMousemoveOneTwo(eve, i);
    },
    false
  );
  //---------- on exit --------

  exitOneTwo[i].addEventListener(
    "click",
    function (e) {
      backToNormOneTwo(i);
    },
    false
  );
  //---------- on expand --------
  expandOneTwo[i].addEventListener(
    "click",
    function (e) {
      onExpandOneTwo(i);
    },
    false
  );
}

//-----------------------------------------
//    on mouse down
//------------------------------------------

function onMousedownOneTwo(eve, cubeNo) {
  if (!isItBigOneTwo) {
    isholdOneTwo = true;
    const pos = eve.pageX || eve.touches[0].pageX;
    cubeOneTwo[cubeNo].classList.add("active");
    startXOneTwo = pos - cubeOneTwo[cubeNo].offsetLeft;
  }
}

//-----------------------------------------
//    on mouse leave
//------------------------------------------
function onMouseleaveOneTwo(cubeNo) {
  const faces = cubeOneTwo[cubeNo].querySelectorAll(".cube__face-1-2");

  if (!isItBigOneTwo) {
    isholdOneTwo = false;
    cubeOneTwo[cubeNo].classList.remove("active");
    anglesOneTwo = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneTwo[i] +
        "deg) translateZ(" +
        WidthOneTwo / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse up
//------------------------------------------
function onMouseUpOneTwo(cubeNo) {
  const faces = cubeOneTwo[cubeNo].querySelectorAll(".cube__face-1-2");

  if (!isItBigOneTwo) {
    isholdOneTwo = false;
    cubeOneTwo[cubeNo].classList.remove("active");
    anglesOneTwo = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneTwo[i] +
        "deg) translateZ(" +
        WidthOneTwo / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse move
//------------------------------------------
function onMousemoveOneTwo(eve, cubeNo) {
  const faces = cubeOneTwo[cubeNo].querySelectorAll(".cube__face-1-2");
  if (!isholdOneTwo || isItBigOneTwo) return; //stops function if click isnt hold
  cubeOneTwo[cubeNo].classList.add("active");
  
  const pos = eve.pageX || eve.touches[0].pageX;
  const x = pos - cubeOneTwo[cubeNo].offsetLeft;
  const walk = (x - startXOneTwo) / 10;
  var i, angle;

  if (walk < 10 && walk > -10) {
    for (i = 0; faces.length; i++) {
      anglesOneTwo[i] += walk;
      angle = anglesOneTwo[i];
      faces[i].style.transform =
        "rotateY(" + angle + "deg) translateZ(" + howBigOneTwo / 2 + "px)";
    }

    onMouseUpOneTwo(cubeNo);
  } else if (walk >= 10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleOneTwo[cubeNo] += 90;

    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleOneTwo[cubeNo] + "deg)";

    anglesOneTwo = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneTwo[i] +
        "deg) translateZ(" +
        howBigOneTwo / 2 +
        "px)";
    }

    onMouseUpOneTwo(cubeNo);
  } else if (walk <= -10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleOneTwo[cubeNo] -= 90;

    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleOneTwo[cubeNo] + "deg)";

    anglesOneTwo = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesOneTwo[i] +
        "deg) translateZ(" +
        howBigOneTwo / 2 +
        "px)";
    }

    onMouseUpOneTwo(cubeNo);
  }
}

//------------------------------------------------on hold functions------------------------------------------

var isBigOneTwo = false;

function onExpandOneTwo(cubeNo) {
  expandOneTwo[cubeNo].style.display = "none";
  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "hidden";
  window.scrollTo(0, 0);
  hintRight.style.display = "none";
  hintLeft.style.display = "none";
  cubeOneTwo[cubeNo].style.transitionDuration = ".3s";
  if (cubeNo == 0) {
    cubeOneTwo[cubeNo].style.position = "fixed";
  } else {
    cubeOneTwo[cubeNo].style.position = "fixed";
  }

  cubeOneTwo[cubeNo].style.height = "120%";
  cubeOneTwo[cubeNo].style.width = "100vw";
  cubeOneTwo[cubeNo].style.top = "0";
  cubeOneTwo[cubeNo].style.left = "0";
  cubeOneTwo[cubeNo].style.overflow = "scroll";
  cubeOneTwo[cubeNo].style.backgroundColor = "#ffffff";
  cubeRotatorOneTwo[cubeNo].style.backgroundColor = "#ffffff";
  isBigOneTwo = true;
  isItBigOneTwo = true;
  isholdOneTwo = false;
  cubeLoaderOneTwo[cubeNo].style.display = "none";
  loaderSpanOneTwo[cubeNo].style.width = "0px";
  exitOneTwo[cubeNo].style.display = "flex";
  fullFaceViewOneTwo(cubeNo);
}

function fullFaceViewOneTwo(cubeNo) {
  const faces = cubeOneTwo[cubeNo].querySelectorAll(".cube__face-1-2");
  cubeRotatorOneTwo[cubeNo].style.width = "100%";
  cubeRotatorOneTwo[cubeNo].style.height = "100%";
  cubeRotatorOneTwo[cubeNo].style.flexDirection = "column";
  cubeRotatorOneTwo[cubeNo].style.overflow = "scroll";
  cubeRotatorOneTwo[cubeNo].style.padding = "65px 0 150px 0";
  cubeRotatorOneTwo[cubeNo].style.backgroundColor = "#fff";
  cubeOneTwo[cubeNo].style.zIndex = "20";
  cubeRotatorOneTwo[cubeNo].style.zIndex = "20";
  cubeRotatorOneTwo[cubeNo].style.opacity = "1";

  setTimeout(function () {
    exitOneTwo[cubeNo].style.visibility = "visible";
    exitOneTwo[cubeNo].style.opacity = "1";
    cubeOneTwo[cubeNo].style.zIndex = "20";
    cubeRotatorOneTwo[cubeNo].style.zIndex = "20";
  }, 800);

  for (let i = 0; i < 4; i++) {
    faces[i].style.position = "relative";
    faces[i].style.transition = "all 1.5s";
    faces[i].style.marginBottom = "20px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.width = WidthOneTwo * 2 + "px";
    faces[i].style.height = WidthOneTwo - 6 + "px";
  }

  // Check if the media query is true

  if (mediaQueryMobile.matches) {
    proNameOneTwo[cubeNo].style.fontSize = "17px";
    proDesOneTwo[cubeNo].style.fontSize = "15px";
    proColOneTwo[cubeNo].style.fontSize = "12px";
    imgOneTwo[cubeNo].style.height = "100%";
    imgOneTwo[cubeNo].style.width = "auto";

    imgHolderOneTwo[cubeNo].style.width = "85%";

    vidOneTwo[cubeNo].style.height = "auto";
    vidOneTwo[cubeNo].style.width = "100%";
  } else {
    imgHolderOneTwo[cubeNo].style.width = "85%";

    imgOneTwo[cubeNo].style.height = "100%";
    imgOneTwo[cubeNo].style.width = "auto";
  }

  faces[1].style.transition = "none";
  faces[2].style.transition = "none";
  faces[3].style.transition = "none";

  // for (let i = 0; i < buttonsOneTwo[cubeNo].length; i++) {
  //   buttonsOneTwo[cubeNo][i].style.width = "3.5vh";
  //   buttonsOneTwo[cubeNo][i].style.height = "1.025vh";
  //   buttonsOneTwo[cubeNo][i].style.borderRadius = "0.512vh";
  // }
  for (let i = 0; buttonsOneTwo[0].length; i++) {
    buttonsOneTwo[0][i].style.width = "55%";
  }
  cubeRotationOneTwo(cubeNo);
}

function cubeRotationOneTwo(cubeNo) {
  let rotationRounds = cubeRotateAngleOneTwo[cubeNo] / 90;
  let rotationRoundsAbs = Math.abs(rotationRounds);
  let firstX;
  let secondX;

  if (cubeRotateAngleOneTwo[cubeNo] < 0) {
    firstX = ((rotationRounds - 1) / 4) % 1;
    secondX = ((rotationRounds - 3) / 4) % 1;
  } else {
    secondX = ((rotationRounds - 1) / 4) % 1;
    firstX = ((rotationRounds - 3) / 4) % 1;
  }
  backX = ((rotationRounds - 2) / 4) % 1;
  if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleOneTwo[cubeNo] < 0
  ) {
    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneTwo[cubeNo] - 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleOneTwo[cubeNo] < 0
  ) {
    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneTwo[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleOneTwo[cubeNo] > 0
  ) {
    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneTwo[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleOneTwo[cubeNo] > 0
  ) {
    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneTwo[cubeNo] - 90) + "deg)";
  } else if (backX === 0) {
    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleOneTwo[cubeNo] - 180) + "deg)";
  } else {
    cubeRotatorOneTwo[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleOneTwo[cubeNo] + "deg)";
  }
}

function backToNormOneTwo(cubeNo) {
  expandOneTwo[cubeNo].style.display = "block";

  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "scroll";
  body[0].style.overflowX = "hidden";
  cubeRotatorOneTwo[cubeNo].style.padding = "0";

  const faces = cubeOneTwo[cubeNo].querySelectorAll(".cube__face-1-2");
  const imgOneTwo = document.querySelectorAll(".img-1-2");
  cubeOneTwo[cubeNo].style.position = "relative";
  cubeOneTwo[cubeNo].style.height = (WidthOneTwo - 6) / 2 + "px";
  cubeOneTwo[cubeNo].style.width = WidthOneTwo + "px";
  cubeOneTwo[cubeNo].style.overflow = "visible";
  cubeOneTwo[cubeNo].style.overflowX = "visible";
  cubeOneTwo[cubeNo].style.perspective = WidthOneTwo + "px";

  cubeRotatorOneTwo[cubeNo].style.width = "100%";
  cubeRotatorOneTwo[cubeNo].style.height = "100%";
  cubeRotatorOneTwo[cubeNo].style.display = "flex";
  cubeRotatorOneTwo[cubeNo].style.transformStyle = "preserve-3d";
  cubeRotatorOneTwo[cubeNo].style.overflow = "visible";
  cubeRotatorOneTwo[cubeNo].style.position = "relative";
  cubeRotatorOneTwo[cubeNo].style.top = "0";

  imgHolderOneTwo[cubeNo].style.width = "85%";

  imgOneTwo[cubeNo].style.height = "100%";
  imgOneTwo[cubeNo].style.width = "auto";

  for (let i = 0; i < buttonsOneTwo[cubeNo].length; i++) {
    if (cubeNo != 0) {
      buttonsOneTwo[cubeNo][i].style.width = "15px";
      buttonsOneTwo[cubeNo][i].style.height = "4px";
      buttonsOneTwo[cubeNo][i].style.borderRadius = "2px";
    } else {
      buttonsOneTwo[cubeNo][i].style.width = "100%";
      buttonsOneTwo[cubeNo][i].style.borderRadius = "3px";
    }
  }
  ulOneTwo[0].style.width = "25%";
  for (let i = 0; i < faces.length; i++) {
    faces[i].style.position = "absolute";
    faces[i].style.height = "100%";
    faces[i].style.width = "100%";
    faces[i].style.marginBottom = "0px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.transform =
      "rotateY(" + i * 90 + "deg) translateZ(" + WidthOneTwo / 2 + "px)";
    faces[i].style.transition = "0.3s";
  }
  exitOneTwo[cubeNo].style.display = "none";
  cubeOneTwo[cubeNo].style.zIndex = "1";
  cubeRotatorOneTwo[cubeNo].style.zIndex = "1";
  isBigOneTwo = false;
  isItBigOneTwo = false;
  if (mediaQueryMobile.matches) {
    proNameOneTwo[cubeNo].style.fontSize = "10px";
    proDesOneTwo[cubeNo].style.fontSize = "6px";
    proColOneTwo[cubeNo].style.fontSize = "6px";
  }
}
//------------------------------------2-1--------------------------------//

const cubeTwoOne = document.querySelectorAll(".cube-container-2-1");

const cubeRotatorTwoOne = document.querySelectorAll(".cube-2-1");
const cubeLoaderTwoOne = document.querySelectorAll(".cube-loader-2-1");
const loaderSpanTwoOne = document.querySelectorAll(".cube-span-2-1");
const exitTwoOne = document.querySelectorAll(".exit-2-1");
const proNameTwoOne = document.querySelectorAll(".product-name-2-1");
const proDesTwoOne = document.querySelectorAll(".product-des-2-1");
const proColTwoOne = document.querySelectorAll(".product-col-2-1");
const imgTwoOne = document.querySelectorAll(".img-2-1");
const imgHolderTwoOne = document.querySelectorAll(".imgholder-2-1");
const expandTwoOne = document.querySelectorAll(".expand-2-1");
const vidTwoOne = document.querySelectorAll(".video-2-1");

var counterTwoOne = 0;
let isholdTwoOne = false;
let isItBigTwoOne = false;
var howBigTwoOne;
let startXTwoOne;
var anglesTwoOne = [0, 90, 180, 270];
let checkk = [];
for (let i = 0; i < anglesTwoOne.length; i++) {
  checkk.push(anglesTwoOne[i] + 90);
}
var cubeRotateAngleTwoOne = [0, 0, 0, 0];

const lastSideCubeRotatorTwoOne =
  document.querySelectorAll(".cube__face-2-1_4");

//-----------------------------------------
//    calling functions
//------------------------------------------

for (let i = 0; i < cubeTwoOne.length; i++) {
  cubeTwoOne[i].addEventListener(
    "mousedown",
    function (e) {
      var eve = e;
      onMousedownTwoOne(eve, i);
    },
    false
  );

  cubeTwoOne[i].addEventListener(
    "mouseup",
    function (e) {
      onMouseUpTwoOne(i);
    },
    false
  );
  cubeTwoOne[i].addEventListener(
    "mousemove",
    function (e) {
      var eve = e;
      onMousemoveTwoOne(eve, i);
    },
    false
  );
  cubeTwoOne[i].addEventListener(
    "mouseleave",
    function (e) {
      onMouseleaveTwoOne(i);
    },
    false
  );
  //                     for mobile                      //
  cubeTwoOne[i].addEventListener(
    "touchstart",
    function (e) {
      var eve = e;
      onMousedownTwoOne(eve, i);
    },
    false
  );
  cubeTwoOne[i].addEventListener(
    "touchend",
    function (e) {
      onMouseUpTwoOne(i);
    },
    false
  );
  cubeTwoOne[i].addEventListener(
    "touchmove",
    function (e) {
      var eve = e;
      onMousemoveTwoOne(eve, i);
    },
    false
  );
  //---------- on exit----------
  exitTwoOne[i].addEventListener(
    "click",
    function (e) {
      backToNormTwoOne(i);
    },
    false
  );
  //---------- on expand----------
  expandTwoOne[i].addEventListener(
    "click",
    function (e) {
      onExpandTwoOne(i);
    },
    false
  );
}

//-----------------------------------------
//    on mouse down
//------------------------------------------

function onMousedownTwoOne(eve, cubeNo) {
  if (!isItBigTwoOne) {
    isholdTwoOne = true;
    const pos = eve.pageX || eve.touches[0].pageX;
    cubeTwoOne[cubeNo].classList.add("active");
    startXTwoOne = pos - cubeTwoOne[cubeNo].offsetLeft;
  }
}

//-----------------------------------------
//    on mouse leave
//------------------------------------------
function onMouseleaveTwoOne(cubeNo) {
  const faces = cubeTwoOne[cubeNo].querySelectorAll(".cube__face-2-1");

  if (!isItBigTwoOne) {
    isholdTwoOne = false;
    cubeTwoOne[cubeNo].classList.remove("active");
    anglesTwoOne = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoOne[i] +
        "deg) translateZ(" +
        WidthTwoOne / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse up
//------------------------------------------
function onMouseUpTwoOne(cubeNo) {
  const faces = cubeTwoOne[cubeNo].querySelectorAll(".cube__face-2-1");

  if (!isItBigTwoOne) {
    isholdTwoOne = false;
    cubeTwoOne[cubeNo].classList.remove("active");
    anglesTwoOne = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoOne[i] +
        "deg) translateZ(" +
        WidthTwoOne / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse move
//------------------------------------------

function onMousemoveTwoOne(eve, cubeNo) {
  const faces = cubeTwoOne[cubeNo].querySelectorAll(".cube__face-2-1");
  if (!isholdTwoOne || isItBigTwoOne) return; //stops function if clicke isnt hold
  cubeTwoOne[cubeNo].classList.add("active");
  
  const pos = eve.pageX || eve.touches[0].pageX;
  const x = pos - cubeTwoOne[cubeNo].offsetLeft;
  const walk = (x - startXTwoOne) / 10;
  var i, angle;

  if (walk < 10 && walk > -10) {
    for (i = 0; faces.length; i++) {
      anglesTwoOne[i] += walk;
      angle = anglesTwoOne[i];
      faces[i].style.transform =
        "rotateY(" + angle + "deg) translateZ(" + howBigTwoOne / 2 + "px)";
    }

    onMouseUpTwoOne(cubeNo);
  } else if (walk >= 10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleTwoOne[cubeNo] += 90;

    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleTwoOne[cubeNo] + "deg)";

    anglesTwoOne = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoOne[i] +
        "deg) translateZ(" +
        howBigTwoOne / 2 +
        "px)";
    }

    onMouseUpTwoOne(cubeNo);
  } else if (walk <= -10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleTwoOne[cubeNo] -= 90;

    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleTwoOne[cubeNo] + "deg)";

    anglesTwoOne = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoOne[i] +
        "deg) translateZ(" +
        howBigTwoOne / 2 +
        "px)";
    }

    onMouseUpTwoOne(cubeNo);
  }
}

//------------------------------------------------on hold functions------------------------------------------

var isBigTwoOne = false;

function onExpandTwoOne(cubeNo) {
  expandTwoOne[cubeNo].style.display = "none";
  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "hidden";
  window.scrollTo(0, 0);

  cubeTwoOne[cubeNo].style.transitionDuration = ".3s";
  if (cubeNo == 0) {
    cubeTwoOne[cubeNo].style.position = "fixed";
  } else {
    cubeTwoOne[cubeNo].style.position = "fixed";
  }
  cubeTwoOne[cubeNo].style.height = "120%";
  cubeTwoOne[cubeNo].style.width = "100vw";
  cubeTwoOne[cubeNo].style.top = "0";
  cubeTwoOne[cubeNo].style.left = "0";
  cubeTwoOne[cubeNo].style.overflow = "scroll";
  cubeTwoOne[cubeNo].style.backgroundColor = "#ffffff";
  cubeRotatorTwoOne[cubeNo].style.backgroundColor = "#ffffff";
  isBigTwoOne = true;
  isItBigTwoOne = true;
  isholdTwoOne = false;
  cubeLoaderTwoOne[cubeNo].style.display = "none";
  loaderSpanTwoOne[cubeNo].style.width = "0px";
  exitTwoOne[cubeNo].style.display = "flex";
  fullFaceViewTwoOne(cubeNo);
}

function fullFaceViewTwoOne(cubeNo) {
  //lastSideCubeRotatorTwoOne[cubeNo].style.flexDirection = "row";
  vidTwoOne[cubeNo].src = "../../products/batman/mp4/batman-pack-mp4.mp4";
  const faces = cubeTwoOne[cubeNo].querySelectorAll(".cube__face-2-1");
  cubeRotatorTwoOne[cubeNo].style.width = "100%";
  cubeRotatorTwoOne[cubeNo].style.height = "100%";
  cubeRotatorTwoOne[cubeNo].style.flexDirection = "column";
  cubeRotatorTwoOne[cubeNo].style.overflow = "scroll";
  cubeRotatorTwoOne[cubeNo].style.padding = "65px 0 150px 0";
  cubeRotatorTwoOne[cubeNo].style.backgroundColor = "#fff";
  cubeTwoOne[cubeNo].style.zIndex = "20";
  cubeRotatorTwoOne[cubeNo].style.zIndex = "20";
  cubeRotatorTwoOne[cubeNo].style.opacity = "1";

  setTimeout(function () {
    exitTwoOne[cubeNo].style.visibility = "visible";
    exitTwoOne[cubeNo].style.opacity = "1";
    cubeTwoOne[cubeNo].style.zIndex = "20";
    cubeRotatorTwoOne[cubeNo].style.zIndex = "20";
  }, 800);

  for (let i = 0; i < 4; i++) {
    faces[i].style.position = "relative";
    faces[i].style.transition = "all 1.5s";
    faces[i].style.marginBottom = "20px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.width = WidthOneTwo * 2 + "px";
    faces[i].style.height = WidthOneTwo - 6 + "px";
  }

  // Check if the media query is true

  if (mediaQueryMobile.matches) {
    proNameTwoOne[cubeNo].style.fontSize = "17px";
    proDesTwoOne[cubeNo].style.fontSize = "15px";
    proColTwoOne[cubeNo].style.fontSize = "12px";

    imgHolderTwoOne[cubeNo].style.width = "85%";

    imgTwoOne[cubeNo].style.height = "100%";
    imgTwoOne[cubeNo].style.width = "auto";
  } else {
    imgHolderTwoOne[cubeNo].style.width = "85%";
    imgTwoOne[cubeNo].style.height = "100%";
    imgTwoOne[cubeNo].style.width = "auto";
  }

  faces[1].style.transition = "none";
  faces[2].style.transition = "none";
  faces[3].style.transition = "none";

  // for (let i = 0; i < buttonsTwoOne[cubeNo].length; i++) {
  //   buttonsTwoOne[cubeNo][i].style.width = "3.5vh";
  //   buttonsTwoOne[cubeNo][i].style.height = "1.025vh";
  //   buttonsTwoOne[cubeNo][i].style.borderRadius = "0.512vh";
  //   window.getComputedStyle(buttonsTwoOne[cubeNo][i], ":after");
  // }

  cubeRotationTwoOne(cubeNo);
}

function cubeRotationTwoOne(cubeNo) {
  let rotationRounds = cubeRotateAngleTwoOne[cubeNo] / 90;
  let rotationRoundsAbs = Math.abs(rotationRounds);
  let firstX;
  let secondX;

  if (cubeRotateAngleTwoOne[cubeNo] < 0) {
    firstX = ((rotationRounds - 1) / 4) % 1;
    secondX = ((rotationRounds - 3) / 4) % 1;
  } else {
    secondX = ((rotationRounds - 1) / 4) % 1;
    firstX = ((rotationRounds - 3) / 4) % 1;
  }
  backX = ((rotationRounds - 2) / 4) % 1;
  if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleTwoOne[cubeNo] < 0
  ) {
    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoOne[cubeNo] - 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleTwoOne[cubeNo] < 0
  ) {
    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoOne[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleTwoOne[cubeNo] > 0
  ) {
    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoOne[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleTwoOne[cubeNo] > 0
  ) {
    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoOne[cubeNo] - 90) + "deg)";
  } else if (backX === 0) {
    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoOne[cubeNo] - 180) + "deg)";
  } else {
    cubeRotatorTwoOne[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleTwoOne[cubeNo] + "deg)";
  }
}

function backToNormTwoOne(cubeNo) {
  //lastSideCubeRotatorTwoOne[cubeNo].style.flexDirection = "column";
  vidTwoOne[cubeNo].src = "../../products/batman/mp4/batman-mp4-1.mp4";
  expandTwoOne[cubeNo].style.display = "block";

  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "scroll";
  body[0].style.overflowX = "hidden";
  cubeRotatorTwoOne[cubeNo].style.padding = "0";

  const faces = cubeTwoOne[cubeNo].querySelectorAll(".cube__face-2-1");
  const imgTwoOne = document.querySelectorAll(".img-2-1");
  cubeTwoOne[cubeNo].style.position = "relative";
  cubeTwoOne[cubeNo].style.height = HeightTwoOne + "px";
  cubeTwoOne[cubeNo].style.width = WidthTwoOne + "px";
  cubeTwoOne[cubeNo].style.overflow = "visible";
  cubeTwoOne[cubeNo].style.overflowX = "visible";
  cubeTwoOne[cubeNo].style.perspective = WidthTwoOne + "px";

  cubeRotatorTwoOne[cubeNo].style.width = "100%";
  cubeRotatorTwoOne[cubeNo].style.height = "100%";
  cubeRotatorTwoOne[cubeNo].style.display = "flex";
  cubeRotatorTwoOne[cubeNo].style.transformStyle = "preserve-3d";
  cubeRotatorTwoOne[cubeNo].style.overflow = "visible";
  cubeRotatorTwoOne[cubeNo].style.position = "relative";

  imgHolderTwoOne[cubeNo].style.height = "90%";

  for (let i = 0; i < buttonsTwoOne[cubeNo].length; i++) {
    buttonsTwoOne[cubeNo][i].style.width = "15px";
    buttonsTwoOne[cubeNo][i].style.height = "4px";
    buttonsTwoOne[cubeNo][i].style.borderRadius = "2px";
  }
  for (let i = 0; i < faces.length; i++) {
    faces[i].style.position = "absolute";
    faces[i].style.height = "100%";
    faces[i].style.width = "100%";
    faces[i].style.marginBottom = "0px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.transform =
      "rotateY(" + i * 90 + "deg) translateZ(" + WidthTwoOne / 2 + "px)";
    faces[i].style.transition = "0.3s";
  }

  if (mediaQueryMobile.matches) {
    proNameTwoOne[cubeNo].style.fontSize = "10px";
    proDesTwoOne[cubeNo].style.fontSize = "6px";
    proColTwoOne[cubeNo].style.fontSize = "6px";
    imgTwoOne[cubeNo].style.height = "auto";
    imgTwoOne[cubeNo].style.width = "100%";
  } else {
    imgTwoOne[cubeNo].style.height = "auto";
    imgTwoOne[cubeNo].style.width = "100%";
  }

  exitTwoOne[cubeNo].style.display = "none";

  cubeTwoOne[cubeNo].style.zIndex = "1";
  cubeRotatorTwoOne[cubeNo].style.zIndex = "1";
  isBigTwoOne = false;
  isItBigTwoOne = false;
}

// //------------------------------------2-2--------------------------------//

const cubeTwoTwo = document.querySelectorAll(".cube-container-2-2");

const cubeRotatorTwoTwo = document.querySelectorAll(".cube-2-2");
const cubeLoaderTwoTwo = document.querySelectorAll(".cube-loader-2-2");
const loaderSpanTwoTwo = document.querySelectorAll(".cube-span-2-2");
const exitTwoTwo = document.querySelectorAll(".exit-2-2");
const proNameTwoTwo = document.querySelectorAll(".product-name-2-2");
const proDesTwoTwo = document.querySelectorAll(".product-des-2-2");
const proColTwoTwo = document.querySelectorAll(".product-col-2-2");
const imgTwoTwo = document.querySelectorAll(".img-2-2");
const vidTwoTwo = document.querySelectorAll(".video-2-2");
const imgHolderTwoTwo = document.querySelectorAll(".imgholder-2-2");
const expandTwoTwo = document.querySelectorAll(".expand-2-2");

const posterImgTwoTwo = document.querySelectorAll(".posters-2-2 svg");
const teaserImgTwoTwo = document.querySelectorAll(".teaser-2-2 svg");

var counterTwoTwo = 0;
let isholdTwoTwo = false;
let isItBigTwoTwo = false;
var howBigTwoTwo;
let startXTwoTwo;
var anglesTwoTwo = [0, 90, 180, 270];
var cubeRotateAngleTwoTwo = [0, 0, 0, 0];

const lastSideCubeRotatorTwoTwo =
  document.querySelectorAll(".cube__face-2-2_4");

//-----------------------------------------
//    calling functions
//------------------------------------------

for (let i = 0; i < cubeTwoTwo.length; i++) {
  cubeTwoTwo[i].addEventListener(
    "mousedown",
    function (e) {
      var eve = e;
      onMousedownTwoTwo(eve, i);
    },
    false
  );

  cubeTwoTwo[i].addEventListener(
    "mouseup",
    function (e) {
      onMouseUpTwoTwo(i);
    },
    false
  );
  cubeTwoTwo[i].addEventListener(
    "mousemove",
    function (e) {
      var eve = e;
      onMousemoveTwoTwo(eve, i);
    },
    false
  );
  cubeTwoTwo[i].addEventListener(
    "mouseleave",
    function (e) {
      onMouseleaveTwoTwo(i);
    },
    false
  );
  //                     for mobile                      //
  cubeTwoTwo[i].addEventListener(
    "touchstart",
    function (e) {
      var eve = e;
      onMousedownTwoTwo(eve, i);
    },
    false
  );
  cubeTwoTwo[i].addEventListener(
    "touchend",
    function (e) {
      onMouseUpTwoTwo(i);
    },
    false
  );
  cubeTwoTwo[i].addEventListener(
    "touchmove",
    function (e) {
      var eve = e;
      onMousemoveTwoTwo(eve, i);
    },
    false
  );
  //-----------on exit ---------

  exitTwoTwo[i].addEventListener(
    "click",
    function (e) {
      backToNormTwoTwo(i);
    },
    false
  );
  //-----------on expand ---------
  expandTwoTwo[i].addEventListener(
    "click",
    function (e) {
      onExpandTwoTwo(i);
    },
    false
  );
}

//-----------------------------------------
//    on mouse down
//------------------------------------------

function onMousedownTwoTwo(eve, cubeNo) {
  if (!isItBigTwoTwo) {
    isholdTwoTwo = true;
    const pos = eve.pageX || eve.touches[0].pageX;
    cubeTwoTwo[cubeNo].classList.add("active");
    startXTwoTwo = pos - cubeTwoTwo[cubeNo].offsetLeft;
  }
}

//-----------------------------------------
//    on mouse leave
//------------------------------------------
function onMouseleaveTwoTwo(cubeNo) {
  const faces = cubeTwoTwo[cubeNo].querySelectorAll(".cube__face-2-2");

  if (!isItBigTwoTwo) {
    isholdTwoTwo = false;
    cubeTwoTwo[cubeNo].classList.remove("active");
    anglesTwoTwo = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoTwo[i] +
        "deg) translateZ(" +
        WidthTwoTwo / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse up
//------------------------------------------
function onMouseUpTwoTwo(cubeNo) {
  const faces = cubeTwoTwo[cubeNo].querySelectorAll(".cube__face-2-2");

  if (!isItBigTwoTwo) {
    isholdTwoTwo = false;
    cubeTwoTwo[cubeNo].classList.remove("active");
    anglesTwoTwo = [0, 90, 180, 270];
    for (let i = 0; faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoTwo[i] +
        "deg) translateZ(" +
        WidthTwoTwo / 2 +
        "px)";
    }
  }
}

//-----------------------------------------
//    on mouse move
//------------------------------------------
function onMousemoveTwoTwo(eve, cubeNo) {
  const faces = cubeTwoTwo[cubeNo].querySelectorAll(".cube__face-2-2");
  if (!isholdTwoTwo || isItBigTwoTwo) return; //stops function if click isnt hold
  cubeTwoTwo[cubeNo].classList.add("active");
  
  const pos = eve.pageX || eve.touches[0].pageX;
  const x = pos - cubeTwoTwo[cubeNo].offsetLeft;
  const walk = (x - startXTwoTwo) / 10;
  var i, angle;

  if (walk < 10 && walk > -10) {
    for (i = 0; faces.length; i++) {
      anglesTwoTwo[i] += walk;
      angle = anglesTwoTwo[i];
      faces[i].style.transform =
        "rotateY(" + angle + "deg) translateZ(" + howBigTwoTwo / 2 + "px)";
    }

    onMouseUpTwoTwo(cubeNo);
  } else if (walk >= 10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleTwoTwo[cubeNo] += 90;

    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleTwoTwo[cubeNo] + "deg)";

    anglesTwoTwo = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoTwo[i] +
        "deg) translateZ(" +
        howBigTwoTwo / 2 +
        "px)";
    }

    onMouseUpTwoTwo(cubeNo);
  } else if (walk <= -10) {
    hintRight.style.display = "none";
    hintLeft.style.display = "none";
    cubeRotateAngleTwoTwo[cubeNo] -= 90;

    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleTwoTwo[cubeNo] + "deg)";

    anglesTwoTwo = [0, 90, 180, 270];
    for (let i = 0; i < faces.length; i++) {
      faces[i].style.transform =
        "rotateY(" +
        anglesTwoTwo[i] +
        "deg) translateZ(" +
        howBigTwoTwo / 2 +
        "px)";
    }

    onMouseUpTwoTwo(cubeNo);
  }
}

//------------------------------------------------on hold functions------------------------------------------

var isBigTwoTwo = false;

function onExpandTwoTwo(cubeNo) {
  expandTwoTwo[cubeNo].style.display = "none";
  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "hidden";
  window.scrollTo(0, 0);

  cubeTwoTwo[cubeNo].style.transitionDuration = ".3s";
  if (cubeNo == 0) {
    cubeTwoTwo[cubeNo].style.position = "fixed";
  } else {
    cubeTwoTwo[cubeNo].style.position = "fixed";
  }
  cubeTwoTwo[cubeNo].style.height = "120%";
  cubeTwoTwo[cubeNo].style.width = "100vw";
  cubeTwoTwo[cubeNo].style.top = "0";
  cubeTwoTwo[cubeNo].style.left = "0";
  cubeTwoTwo[cubeNo].style.overflow = "scroll";
  cubeTwoTwo[cubeNo].style.backgroundColor = "#ffffff";
  cubeRotatorTwoTwo[cubeNo].style.backgroundColor = "#ffffff";
  isBigTwoTwo = true;
  isItBigTwoTwo = true;
  isholdTwoTwo = false;
  cubeLoaderTwoTwo[cubeNo].style.display = "none";
  loaderSpanTwoTwo[cubeNo].style.width = "0px";
  exitTwoTwo[cubeNo].style.display = "flex";
  fullFaceViewTwoTwo(cubeNo);
}

function fullFaceViewTwoTwo(cubeNo) {
  const faces = cubeTwoTwo[cubeNo].querySelectorAll(".cube__face-2-2");
  cubeRotatorTwoTwo[cubeNo].style.width = "100%";
  cubeRotatorTwoTwo[cubeNo].style.height = "100%";
  cubeRotatorTwoTwo[cubeNo].style.flexDirection = "column";
  cubeRotatorTwoTwo[cubeNo].style.overflow = "scroll";
  cubeRotatorTwoTwo[cubeNo].style.padding = "65px 0 150px 0";
  cubeRotatorTwoTwo[cubeNo].style.backgroundColor = "#fff";
  cubeTwoTwo[cubeNo].style.zIndex = "20";
  cubeRotatorTwoTwo[cubeNo].style.zIndex = "20";
  cubeRotatorTwoTwo[cubeNo].style.opacity = "1";
  // posterImgTwoTwo[cubeNo].style.width = "auto";
  // teaserImgTwoTwo[cubeNo].style.width = "auto";
  // posterImgTwoTwo[cubeNo].style.height = "70%";
  // teaserImgTwoTwo[cubeNo].style.height = "70%";
  setTimeout(function () {
    exitTwoTwo[cubeNo].style.visibility = "visible";
    exitTwoTwo[cubeNo].style.opacity = "1";
    cubeTwoTwo[cubeNo].style.zIndex = "20";
    cubeRotatorTwoTwo[cubeNo].style.zIndex = "20";
  }, 800);

  for (let i = 0; i < 4; i++) {
    faces[i].style.position = "relative";
    faces[i].style.transition = "all 1.5s";
    faces[i].style.marginBottom = "20px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.width = WidthTwoTwo * 2 + "px";
    faces[i].style.height = WidthTwoTwo - 6 + "px";
  }

  // Check if the media query is true

  if (mediaQueryMobile.matches) {
    proNameTwoTwo[cubeNo].style.fontSize = "17px";
    proDesTwoTwo[cubeNo].style.fontSize = "15px";
    proColTwoTwo[cubeNo].style.fontSize = "12px";

    imgHolderTwoTwo[cubeNo].style.width = "80%";

    imgTwoTwo[cubeNo].style.height = "100%";
    imgTwoTwo[cubeNo].style.width = "auto";

    vidTwoTwo[cubeNo].style.height = "100%";
    vidTwoTwo[cubeNo].style.width = "auto";
  } else {
    imgHolderTwoTwo[cubeNo].style.width = "80%";
    imgTwoTwo[cubeNo].style.height = "100%";
    imgTwoTwo[cubeNo].style.width = "auto";
  }

  faces[1].style.transition = "none";
  faces[2].style.transition = "none";
  faces[3].style.transition = "none";

  // for (let i = 0; i < buttonsTwoTwo[cubeNo].length; i++) {
  //   buttonsTwoTwo[cubeNo][i].style.width = "3.5vh";
  //   buttonsTwoTwo[cubeNo][i].style.height = "1.025vh";
  //   buttonsTwoTwo[cubeNo][i].style.borderRadius = "0.512vh";
  // }

  cubeRotationTwoTwo(cubeNo);
}

function cubeRotationTwoTwo(cubeNo) {
  let rotationRounds = cubeRotateAngleTwoTwo[cubeNo] / 90;
  let rotationRoundsAbs = Math.abs(rotationRounds);
  let firstX;
  let secondX;

  if (cubeRotateAngleTwoTwo[cubeNo] < 0) {
    firstX = ((rotationRounds - 1) / 4) % 1;
    secondX = ((rotationRounds - 3) / 4) % 1;
  } else {
    secondX = ((rotationRounds - 1) / 4) % 1;
    firstX = ((rotationRounds - 3) / 4) % 1;
  }
  backX = ((rotationRounds - 2) / 4) % 1;
  if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleTwoTwo[cubeNo] < 0
  ) {
    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoTwo[cubeNo] - 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleTwoTwo[cubeNo] < 0
  ) {
    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoTwo[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    firstX === 0 &&
    cubeRotateAngleTwoTwo[cubeNo] > 0
  ) {
    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoTwo[cubeNo] + 90) + "deg)";
  } else if (
    rotationRoundsAbs % 2 == 1 &&
    secondX === 0 &&
    cubeRotateAngleTwoTwo[cubeNo] > 0
  ) {
    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoTwo[cubeNo] - 90) + "deg)";
  } else if (backX === 0) {
    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + (cubeRotateAngleTwoTwo[cubeNo] - 180) + "deg)";
  } else {
    cubeRotatorTwoTwo[cubeNo].style.transform =
      "rotateY(" + cubeRotateAngleTwoTwo[cubeNo] + "deg)";
  }
}
function backToNormTwoTwo(cubeNo) {
  expandTwoTwo[cubeNo].style.display = "block";
  const body = document.getElementsByTagName("body");
  body[0].style.overflow = "scroll";
  body[0].style.overflowX = "hidden";
  cubeRotatorTwoTwo[cubeNo].style.padding = "0";
  const faces = cubeTwoTwo[cubeNo].querySelectorAll(".cube__face-2-2");
  cubeTwoTwo[cubeNo].style.position = "relative";
  cubeTwoTwo[cubeNo].style.height = WidthTwoTwo + "px";
  cubeTwoTwo[cubeNo].style.width = WidthTwoTwo + "px";
  cubeTwoTwo[cubeNo].style.overflow = "visible";
  cubeTwoTwo[cubeNo].style.overflowX = "visible";
  cubeTwoTwo[cubeNo].style.perspective = WidthTwoTwo + "px";

  cubeRotatorTwoTwo[cubeNo].style.width = "100%";
  cubeRotatorTwoTwo[cubeNo].style.height = "100%";
  cubeRotatorTwoTwo[cubeNo].style.display = "flex";
  cubeRotatorTwoTwo[cubeNo].style.transformStyle = "preserve-3d";
  cubeRotatorTwoTwo[cubeNo].style.overflow = "visible";
  cubeRotatorTwoTwo[cubeNo].style.position = "relative";
  cubeRotatorTwoTwo[cubeNo].style.top = "0";

  imgHolderTwoTwo[cubeNo].style.width = "90%";

  imgTwoTwo[cubeNo].style.height = "90%";
  imgTwoTwo[cubeNo].style.width = "auto";

  for (let i = 0; i < buttonsTwoTwo[cubeNo].length; i++) {
    buttonsTwoTwo[cubeNo][i].style.width = "15px";
    buttonsTwoTwo[cubeNo][i].style.height = "4px";
    buttonsTwoTwo[cubeNo][i].style.borderRadius = "2px";
  }

  for (let i = 0; i < faces.length; i++) {
    faces[i].style.position = "absolute";
    faces[i].style.height = "100%";
    faces[i].style.width = "100%";
    faces[i].style.marginBottom = "0px";
    faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
    faces[i].style.transform =
      "rotateY(" + i * 90 + "deg) translateZ(" + WidthTwoTwo / 2 + "px)";
    faces[i].style.transition = "0.3s";
  }
  if (mediaQueryMobile.matches) {
    proNameTwoTwo[cubeNo].style.fontSize = "10px";
    proDesTwoTwo[cubeNo].style.fontSize = "6px";
    proColTwoTwo[cubeNo].style.fontSize = "6px";
    imgTwoTwo[cubeNo].style.height = "auto";
    imgTwoTwo[cubeNo].style.width = "85%";
  }

  posterImgTwoTwo[cubeNo].style.width = "35%";
  teaserImgTwoTwo[cubeNo].style.width = "35%";
  posterImgTwoTwo[cubeNo].style.height = "auto";
  teaserImgTwoTwo[cubeNo].style.height = "auto";

  exitTwoTwo[cubeNo].style.display = "none";

  cubeTwoTwo[cubeNo].style.zIndex = "1";
  cubeRotatorTwoTwo[cubeNo].style.zIndex = "1";

  isBigTwoTwo = false;
  isItBigTwoTwo = false;
}

//-----------------------------------------------------

const videos = document.querySelectorAll(".videos");

for (let i = 0; i < videos.length; i++) {
  videos[i].addEventListener("mouseover", function () {
    videos[i].pause();
  });
  videos[i].addEventListener("mouseleave", function () {
    videos[i].play();
  });
}

// --------------this is for the new button's-----------

const ulOneTwo = document.querySelectorAll(".ul-1-2");
const imageOneTwo = document.querySelectorAll(".img-1-2");
const spraysOneTwo = document.querySelectorAll(".sprays-1-2");
const sprayOneTwo = document.querySelectorAll(".spray-1-2");
const buttonsOneTwo = [];
buttonsOneTwo[0] = ulOneTwo[0].querySelectorAll(".happyTruck-btn");
let btnColorOneTwo = [];
let rgbOneTwo;

for (let i = 1; i < ulOneTwo.length; i++) {
  buttonsOneTwo[i] = ulOneTwo[i].querySelectorAll(".button");
  btnColorOneTwo[i] = [];
  imageOneTwo[i].addEventListener(
    "load",
    function () {
      spraysOneTwo[i].style.display = "none";
    },
    false
  );
}

for (let n = 1; n < ulOneTwo.length; n++) {
  for (let i = 0; i < buttonsOneTwo[n].length; i++) {
    btnColorOneTwo[n][i] = window.getComputedStyle(
      buttonsOneTwo[n][i],
      false
    ).backgroundImage;
    buttonsOneTwo[n][i].addEventListener("click", function () {
      changeImageColorOneTwo(i, n);
    });
  }
}

// just for happy truck

for (let i = 0; i < buttonsOneTwo[0].length; i++) {
  buttonsOneTwo[0][i].addEventListener("click", function () {
    changeImageColorOneTwo(i, 0);
  });
}
imageOneTwo[0].addEventListener(
  "load",
  function () {
    spraysOneTwo[0].style.display = "none";
  },
  false
);

function changeImageColorOneTwo(color, n) {
  if (n != 0) {
    rgbOneTwo = btnColorOneTwo[n][color].replace(/\s/g, "").split(/rgb/);
    rgbOneTwo.shift();
    rgbOneTwo[0] = rgbOneTwo[0].substring(0, rgbOneTwo[0].length - 1);
    rgbOneTwo[1] = rgbOneTwo[1].substring(0, rgbOneTwo[1].length - 1);
    sprayOneTwo[n + n].getElementsByTagName("path")[0].style.fill =
      "rgb" + rgbOneTwo[0];
    sprayOneTwo[n + n + 1].getElementsByTagName("path")[0].style.fill =
      "rgb" + rgbOneTwo[1];
  }
  spraysOneTwo[n].style.display = "block";
  if (n == 0) {
    imageOneTwo[n].src =
      "./products/happy-truck/colorsheet/happy-truck-" + color + ".png";
  } else if (n == 1) {
    imageOneTwo[n].src =
      "./products/tritrike/colorsheet/tritrike-" + color + ".png";
  } else {
    imageOneTwo[n].src = "./products/z4/colorsheet/z4-" + color + ".png";
  }

  for (let i = 0; i < buttonsOneTwo[n].length; i++) {
    if (i == color && n != 0) {
      buttonsOneTwo[n][i].classList.add("active-btn");
    } else if (i != color && n != 0) {
      buttonsOneTwo[n][i].classList.remove("active-btn");
    } else if (i == color && n == 0) {
      buttonsOneTwo[n][i].classList.add("active-btn-ht");
    } else if (i != color && n == 0) {
      buttonsOneTwo[n][i].classList.remove("active-btn-ht");
    }
  }
}

//-----------------------------------------
//    color change pics
//------------------------------------------

const ulTwoOne = document.querySelectorAll(".ul-2-1");
const imageTwoOne = document.querySelectorAll(".img-2-1");
const sprayTwoOne = document.querySelectorAll(".spray-2-1");
const spraysTwoOne = document.querySelectorAll(".sprays-2-1");
const buttonsTwoOne = [];
let btnColorTwoOne = [];
let rgbTwoOne;

for (let i = 0; i < ulTwoOne.length; i++) {
  buttonsTwoOne[i] = ulTwoOne[i].querySelectorAll(".button");
  btnColorTwoOne[i] = [];
  imageTwoOne[i].addEventListener(
    "load",
    function () {
      spraysTwoOne[i].style.display = "none";
    },
    false
  );
}

for (let n = 0; n < ulTwoOne.length; n++) {
  for (let i = 0; i < buttonsTwoOne[n].length; i++) {
    btnColorTwoOne[n][i] = window.getComputedStyle(
      buttonsTwoOne[n][i],
      false
    ).backgroundImage;
    buttonsTwoOne[n][i].addEventListener("click", function () {
      changeImageColorTwoOne(i, n);
    });
  }
}

function changeImageColorTwoOne(color, n) {
  spraysTwoOne[n].style.display = "block";
  rgbTwoOne = btnColorTwoOne[n][color].replace(/\s/g, "").split(/rgb/);
  rgbTwoOne.shift();
  rgbTwoOne[0] = rgbTwoOne[0].substring(0, rgbTwoOne[0].length - 1);
  rgbTwoOne[1] = rgbTwoOne[1].substring(0, rgbTwoOne[1].length - 1);
  sprayTwoOne[n + n].getElementsByTagName("path")[0].style.fill =
    "rgb" + rgbTwoOne[0];
  sprayTwoOne[n + n + 1].getElementsByTagName("path")[0].style.fill =
    "rgb" + rgbTwoOne[1];
  if (n == 0) {
    imageTwoOne[n].src =
      "./products/batman/colorsheet/batman-" + color + ".png";
  } else {
    imageTwoOne[n].src =
      "./products/batman/colorsheet/batman-" + color + ".png";
  }
  for (let i = 0; i < buttonsTwoOne[n].length; i++) {
    if (i == color) {
      buttonsTwoOne[n][i].classList.add("active-btn");
    } else {
      buttonsTwoOne[n][i].classList.remove("active-btn");
    }
  }
}

//-----------------------------------------
//    color change pics
//------------------------------------------

const ulTwoTwo = document.querySelectorAll(".ul-2-2");
const imageTwoTwo = document.querySelectorAll(".img-2-2");
const sprayTwoTwo = document.querySelectorAll(".spray-2-2");
const spraysTwoTwo = document.querySelectorAll(".sprays-2-2");
const buttonsTwoTwo = [];
let btnColorTwoTwo = [];
let rgbTwoTwo;

for (let i = 0; i < ulTwoTwo.length; i++) {
  buttonsTwoTwo[i] = ulTwoTwo[i].querySelectorAll(".button");
  btnColorTwoTwo[i] = [];
  imageTwoTwo[i].addEventListener(
    "load",
    function () {
      spraysTwoTwo[i].style.display = "none";
    },
    false
  );
}

for (let n = 0; n < ulTwoTwo.length; n++) {
  for (let i = 0; i < buttonsTwoTwo[n].length; i++) {
    btnColorTwoTwo[n][i] = window.getComputedStyle(
      buttonsTwoTwo[n][i],
      false
    ).backgroundImage;
    buttonsTwoTwo[n][i].addEventListener("click", function () {
      changeImageColorTwoTwo(i, n);
    });
  }
}

function changeImageColorTwoTwo(color, n) {
  spraysTwoTwo[n].style.display = "block";
  rgbTwoTwo = btnColorTwoTwo[n][color].replace(/\s/g, "").split(/rgb/);
  rgbTwoTwo.shift();
  rgbTwoTwo[0] = rgbTwoTwo[0].substring(0, rgbTwoTwo[0].length - 1);
  rgbTwoTwo[1] = rgbTwoTwo[1].substring(0, rgbTwoTwo[1].length - 1);
  sprayTwoTwo[n + n].getElementsByTagName("path")[0].style.fill =
    "rgb" + rgbTwoTwo[0];
  sprayTwoTwo[n + n + 1].getElementsByTagName("path")[0].style.fill =
    "rgb" + rgbTwoTwo[1];
  if (n == 0) {
    imageTwoTwo[n].src =
      "./products/jumping ball/colorsheet/jumping-ball-" + color + ".png";
  } else {
    imageTwoTwo[n].src =
      "./products/fancy-park/colorsheet/fancy-park-" + color + ".png";
  }
  for (let i = 0; i < buttonsTwoTwo[n].length; i++) {
    if (i == color) {
      buttonsTwoTwo[n][i].classList.add("active-btn");
    } else {
      buttonsTwoTwo[n][i].classList.remove("active-btn");
    }
  }
}

//-----------------------------------------
//    change lang
//------------------------------------------

//-----------------------------------------
//    rotation calculator
//------------------------------------------

// const stringResult = testDiv.style.transform.replace(/\s/g, ""); //removing spaces
// let tr = stringResult.split(/deg/); //spliting transform properties
// console.log(tr[0].replace(/\D+/g, "")); //extracting the numbers of a string

