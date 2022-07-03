
//



















    
const cube = document.querySelector(".cube-container-1-1");
const cubeRotator = document.querySelector(".cube");
const faces = document.querySelectorAll(".cube__face");
const cubeLoader = document.querySelector(".cube-loader");
const loaderSpan = document.getElementById("cube-span");


var counter = 0 ; 
let ishold = false;
let isItBig = false;
var howBig;
let startX, scrollleft;
var angles = [0, 90, 180 , 270];


//-----------------------------------------
//    calling functions
//------------------------------------------
cube.addEventListener('mousedown',   onMousedown,   false);
cube.addEventListener('mouseup',   onMouseUp,   false);
cube.addEventListener('mousemove',   onMousemove,   false);
cube.addEventListener('mouseleave',   onMouseleave,   false);
//                     for mobile 
cube.addEventListener('touchstart',   onMousedown,   false);
cube.addEventListener('touchend',   onMouseUp,   false);
cube.addEventListener('touchmove',   onMousemove,   false);

//-----------------------------------------
//    on mouse down
//------------------------------------------

function onMousedown(e) {
    if(! isItBig){
        ishold = true;
        const pos = e.pageX || e.touches[0].pageX; 
        cube.classList.add('active');
        startX = pos - cube.offsetLeft;
    }
    cube.style.opacity = ".8";
    
};
 
//-----------------------------------------
//    on mouse leave
//------------------------------------------
function onMouseleave(e) {
    if(! isItBig){
        ishold = false;
        cube.classList.remove('active');
        
        angles = [0 , 90 , 180 , 270];
        cube.style.opacity = "1";

        for(let i = 0 ;  faces.length ; i++ ){
            faces[i].style.transform = "rotateY(" + angles[i] + "deg) translateZ(99px)";
        }
    }

};

//-----------------------------------------
//    on mouse up
//------------------------------------------
function onMouseUp(e){
    if(! isItBig){
        ishold = false;
        cube.classList.remove('active');
        
        angles = [0 , 90 , 180 , 270];
        cube.style.opacity = "1";

        for(let i = 0 ;  faces.length ; i++ ){
            faces[i].style.transform = "rotateY(" + angles[i] + "deg) translateZ(99px)";
        }
    }
};

//-----------------------------------------
//    on mouse move
//------------------------------------------
cubeRotateAngle = 0;
function onMousemove(e) {

    if(!ishold || isItBig) return; //stops function if clicke isnt hold
        cube.classList.add('active');
        e.preventDefault();
        const pos = e.pageX || e.touches[0].pageX;
        const x = pos - cube.offsetLeft;
        const walk =  (x - startX) / 10 ;
        var i,angle;
    
        if(walk < 10 && walk > -10){
            for(i = 0 ;  faces.length ; i++ ){
                angles[i] += walk;
                angle =  angles[i];
                faces[i].style.transform = "rotateY(" + angle + "deg) translateZ(99px)";
            }
            onMouseUp();
        }
        
        
        else if(walk >= 10 ){
            cubeRotateAngle += 90;         
            
            cubeRotator.style.transform = "rotateY("+ cubeRotateAngle + "deg)";
                
            angles = [ 0 , 90 , 180 , 270];
            for(let i = 0 ;  i < faces.length ; i++){
                faces[i].style.transform = "rotateY(" + angles[i] + "deg) translateZ(99px)";
            }
            onMouseUp();
    
        }else if(walk <= -10 ){
            cubeRotateAngle -= 90;         
    
            cubeRotator.style.transform = "rotateY("+ cubeRotateAngle + "deg)";
                
            angles = [ 0 , 90 , 180 , 270];
            for(let i = 0 ;  i < faces.length ; i++){
                faces[i].style.transform = "rotateY(" + angles[i] + "deg) translateZ(99px)";
            }
            onMouseUp();
        }
    
    
};


//------------------------------------------------on hold functions------------------------------------------

function counterOptimize(){
    if(ishold){
        setUpSize();
        counter++;
    }else{
        resetSize();
        counter = 0;
    }
    requestAnimationFrame(counterOptimize);
}
counterOptimize();
var curentwidth =  cube.clientWidth;
var isBig = false;
function setUpSize(){
    if(isBig == false){
        cubeLoader.style.display = "block";
        const updatedSize= curentwidth + (counter / 2);
        cube.style.width = updatedSize + "px";
        cube.style.height = updatedSize + "px";
        cube.style.background = "hsla(0, 100%, 50%, 1)";
        cube.style.transform = "translateX(" + counter / 50  + "px)";
        howBig = updatedSize;
        const loaderUpdate = (counter / 1.25 );
        loaderSpan.style.width = loaderUpdate + "px";
    }
    if(howBig > 400){
        cube.style.transitionDuration = ".3s";
        cube.style.position = "fixed";
        cube.style.height = "100vh";
        cube.style.width = "100vw";
        cube.style.zIndex = "10";
        isBig = true;
        isItBig = true;
        ishold = false;
        cubeLoader.style.display = "none";
        loaderSpan.style.width = "0px";
        fullFaceView();
    }
}
function resetSize(){
    if(howBig < 400 && isBig == false){
        console.log(isBig);
        cube.style.background = "transparent";
        cube.style.width = "198px";
        cube.style.height = "198px";
        cube.style.transform = "translateX( 0px )";
        cubeLoader.style.display = "none";
        loaderSpan.style.width = "0px";
    }
}
function fullFaceView(){
    cubeRotator.style.width = "100vw";
    cubeRotator.style.height = "100vh";
    cubeRotator.style.display = "grid";
    cubeRotator.style.gridTemplateColumns = "repeat(auto-fit, minmax(50% , 1fr)";
    cubeRotator.style.gridTemplateRows = "repeat(auto-fit, minmax(50% , 1fr)";
    cubeRotator.style.transformStyle = "none";
    cubeRotator.style.position = "fixed";
    cubeRotator.style.top = "36px";
    cubeRotator.style.left = "33px";
    cubeRotator.style.transform = "rotateY(0deg)";
    for(let i = 0 ; i < 4 ; i++){
        faces[i].style.position = "relative";
        faces[i].style.transform = "rotateY(0deg) translateZ(0px)";
        faces[i].style.gridColumn = + i%2 + 1 + " / span 1";
        console.log( i % 2 + " / span 1");
        faces[i].style.gridRow = "span 1";
        faces[i].style.width = "100%";
        faces[i].style.height = "100%";
    }
}        








// ---------------hsla(50, 100%, 50%, 1)------------------------ 1-2 -------------------------//


const cubeOneTwo = document.querySelector(".cube-container-1-2");
const cubeOneTwoRotator = document.querySelector(".cube-1-2");
const facesOneTwo = document.querySelectorAll(".cube__face-1-2");
const cubeLoaderOneTwo = document.querySelector(".cube-loader-1-2");
const loaderSpanOneTwo = document.querySelector(".cube-span-1-2");


var counterOneTwo = 0 ; 
let isholdOneTwo = false;
let isItBigOneTwo = false;
var howBigOneTwo;
let startXOneTwo;
var anglesOneTwo = [0, 90, 180 , 270];


//-----------------------------------------
//    calling functions
//------------------------------------------
cubeOneTwo.addEventListener('mousedown',   onMousedownOneTwo,   false);
cubeOneTwo.addEventListener('mouseup',   onMouseUpOneTwo,   false);
cubeOneTwo.addEventListener('mousemove',   onMousemoveOneTwo,   false);
cubeOneTwo.addEventListener('mouseleave',   onMouseleaveOneTwo,   false);
//                     for mobile 
cubeOneTwo.addEventListener('touchstart',   onMousedownOneTwo,   false);
cubeOneTwo.addEventListener('touchend',   onMouseUpOneTwo,   false);
cubeOneTwo.addEventListener('touchmove',   onMousemoveOneTwo,   false);

//-----------------------------------------
//    on mouse down
//------------------------------------------

function onMousedownOneTwo(e) {
    if(! isItBigOneTwo){
        isholdOneTwo = true;
        const pos = e.pageX || e.touches[0].pageX; 
        cubeOneTwo.classList.add('active');
        startXOneTwo = pos - cubeOneTwo.offsetLeft;
        counterOptimizeOneTwo();
    }
    cubeOneTwo.style.opacity = ".8";
    
};
 
//-----------------------------------------
//    on mouse leave
//------------------------------------------
function onMouseleaveOneTwo(e) {
    if(! isItBigOneTwo){
        isholdOneTwo = false;
        cubeOneTwo.classList.remove('active');
        
        anglesOneTwo = [0 , 90 , 180 , 270];
        cubeOneTwo.style.opacity = "1";
        isBigOneTwo = false;
        for(let i = 0 ;  facesOneTwo.length ; i++ ){
            facesOneTwo[i].style.transform = "rotateY(" + anglesOneTwo[i] + "deg) translateZ(160.5px)";
        }
    }
};

//-----------------------------------------
//    on mouse up
//------------------------------------------
function onMouseUpOneTwo(e){
    if(! isItBigOneTwo){
        isholdOneTwo = false;
        cubeOneTwo.classList.remove('active');
        
        anglesOneTwo = [0 , 90 , 180 , 270];
        cubeOneTwo.style.opacity = "1";
        isBigOneTwo = false;

        for(let i = 0 ;  facesOneTwo.length ; i++ ){
            facesOneTwo[i].style.transform = "rotateY(" + anglesOneTwo[i] + "deg) translateZ(160.5px)";
        }
    }
};

//-----------------------------------------
//    on mouse move
//------------------------------------------
cubeRotateAngleOneTwo = 0;
function onMousemoveOneTwo(e) {

    if(!isholdOneTwo || isItBigOneTwo) return; //stops function if clicke isnt hold
        cubeOneTwo.classList.add('active');
        e.preventDefault();
        const pos = e.pageX || e.touches[0].pageX;
        const x = pos - cubeOneTwo.offsetLeft;
        const walk =  (x - startXOneTwo) / 50 ;        
        var i,angle;
    
        if(walk < 2 && walk > -2){
            for(i = 0 ;  facesOneTwo.length ; i++ ){
                anglesOneTwo[i] += walk;
                angle =  anglesOneTwo[i];
                facesOneTwo[i].style.transform = "rotateY(" + angle + "deg) translateZ(160.5px)";
            }
            onMouseUpOneTwo();
        }
        
        
        else if(walk >= 2 ){
            cubeRotateAngleOneTwo += 90;         
            
            cubeOneTwoRotator.style.transform = "rotateY("+ cubeRotateAngleOneTwo + "deg)";
                
            anglesOneTwo = [ 0 , 90 , 180 , 270];
            for(let i = 0 ;  i < facesOneTwo.length ; i++){
                facesOneTwo[i].style.transform = "rotateY(" + anglesOneTwo[i] + "deg) translateZ(160.5px)";
            }
            onMouseUpOneTwo();
    
        }else if(walk <= -2 ){
            cubeRotateAngleOneTwo -= 90;         
    
            cubeOneTwoRotator.style.transform = "rotateY("+ cubeRotateAngleOneTwo + "deg)";
                
            anglesOneTwo = [ 0 , 90 , 180 , 270];
            for(let i = 0 ;  i < facesOneTwo.length ; i++){
                facesOneTwo[i].style.transform = "rotateY(" + anglesOneTwo[i] + "deg) translateZ(160.5px)";
            }
            onMouseUpOneTwo();
        }
    
    
};


//------------------------------------------------on hold functions------------------------------------------

// function counterOptimizeOneTwo(){
//     if(isholdOneTwo){
//         setUpSizeOneTwo();
//         counterOneTwo++;
        
//     }else{
//         resetSizeOneTwo();
//         counterOneTwo = 0;
//     }
//     requestAnimationFrame(counterOptimizeOneTwo);
// }
// counterOptimizeOneTwo();
// var curentwidth =  cubeOneTwo.clientWidth;
// var isBigOneTwo = false;
// function setUpSizeOneTwo(){
//     if(isBigOneTwo == false){
//         cubeLoaderOneTwo.style.display = "block";
//         const updatedSize= curentwidth + (counterOneTwo / 2);
//         cubeOneTwo.style.width = updatedSize * 1.5 + "px";
//         cubeOneTwo.style.height = updatedSize + "px";
//         cubeOneTwo.style.background = "hsla(0, 100%, 50%, 1)";
//         cubeOneTwo.style.transform = "translateX(" + counterOneTwo / 50  + "px)";
//         howBigOneTwo = updatedSize;
//         const loaderUpdate = (counterOneTwo / 1.25 );
//         loaderSpan.style.width = loaderUpdate + "px";
//     }
//     if(howBigOneTwo > 400){
//         cubeOneTwo.style.transitionDuration = ".3s";
//         cubeOneTwo.style.position = "fixed";
//         cubeOneTwo.style.height = "100vh";
//         cubeOneTwo.style.width = "100vw";
//         // cubeOneTwo.style.zIndex = "10";
//         isBigOneTwo = true;
//         isItBigOneTwo = true;
//         isholdOneTwo = false;
//         cubeOneTwoLoader.style.display = "none";
//         loaderSpan.style.width = "0px";
//         fullFaceView();
//     }
// }
// function resetSizeOneTwo(){
//     if(howBigOneTwo < 400 && isBigOneTwo == false){
//         owBigOneTwo = 0;
//         console.log(isBigOneTwo);
//         cubeOneTwo.style.background = "transparent";
//         cubeOneTwo.style.width = "321px";
//         cubeOneTwo.style.height = "157px";
//         cubeOneTwo.style.transform = "translateX( 0px )";
//         cubeOneTwoLoader.style.display = "none";
//         loaderSpan.style.width = "0px";
//     }
// }
// function fullFaceView(){
//     cubeOneTwoRotator.style.width = "100vw";
//     cubeOneTwoRotator.style.height = "100vh";
//     cubeOneTwoRotator.style.display = "grid";
//     cubeOneTwoRotator.style.gridTemplateColumns = "repeat(auto-fit, minmax(50% , 1fr)";
//     cubeOneTwoRotator.style.gridTemplateRows = "repeat(auto-fit, minmax(50% , 1fr)";
//     cubeOneTwoRotator.style.transformStyle = "none";
//     cubeOneTwoRotator.style.position = "fixed";
//     cubeOneTwoRotator.style.transform = "rotateY(0deg)";
//     for(let i = 0 ; i < 4 ; i++){
//         facesOneTwo[i].style.position = "relative";
//         facesOneTwo[i].style.transform = "rotateY(0deg) translateZ(0px)";
//         facesOneTwo[i].style.gridColumn = + i % 2 + 1 + " / span 1";
//         facesOneTwo[i].style.gridRow = "span 1";
//         facesOneTwo[i].style.width = "100%";
//         facesOneTwo[i].style.height = "100%";
//     }
// }        







// --------------- hsla(50, 50%, 50%, 1)------------------------ 2-1 -------------------------//


// const cubeTwoOne = document.querySelector(".cube-container-2-1");
// const cubeTwoOneRotator = document.querySelector(".cube-2-1");
// const facesTwoOne = document.querySelectorAll(".cube__face-2-1");
// const cubeLoaderTwoOne = document.querySelector(".cube-loader-2-1");
// const loaderSpanTwoOne = document.querySelector(".cube-span-2-1");


// var counterTwoOne = 0 ; 
// let isholdTwoOne = false;
// let isItBigTwoOne = false;
// var howBigTwoOne;
// let startXTwoOne;
// var anglesTwoOne = [0, 90, 180 , 270];


// //-----------------------------------------
// //    calling functions
// //------------------------------------------
// cubeTwoOne.addEventListener('mousedown',   onMousedownTwoOne,   false);
// cubeTwoOne.addEventListener('mouseup',   onMouseUpTwoOne,   false);
// cubeTwoOne.addEventListener('mousemove',   onMousemoveTwoOne,   false);
// cubeTwoOne.addEventListener('mouseleave',   onMouseleaveTwoOne,   false);
// //                     for mobile 
// cubeTwoOne.addEventListener('touchstart',   onMousedownTwoOne,   false);
// cubeTwoOne.addEventListener('touchend',   onMouseUpTwoOne,   false);
// cubeTwoOne.addEventListener('touchmove',   onMousemoveTwoOne,   false);

// //-----------------------------------------
// //    on mouse down
// //------------------------------------------

// function onMousedownTwoOne(e) {
//     if(! isItBigTwoOne){
//         isholdTwoOne = true;
//         const pos = e.pageX || e.touches[0].pageX; 
//         cubeTwoOne.classList.add('active');
//         startXTwoOne = pos - cubeTwoOne.offsetLeft;
//     }
//     cubeTwoOne.style.opacity = ".8";
    
// };
 
// //-----------------------------------------
// //    on mouse leave
// //------------------------------------------
// function onMouseleaveTwoOne(e) {
//     if(! isItBigTwoOne){
//         isholdTwoOne = false;
//         cubeTwoOne.classList.remove('active');
        
//         anglesTwoOne = [0 , 90 , 180 , 270];
//         cubeTwoOne.style.opacity = "1";

//         for(let i = 0 ;  facesTwoOne.length ; i++ ){
//             facesTwoOne[i].style.transform = "rotateY(" + anglesTwoOne[i] + "deg) translateZ(99px)";
//         }
//     }
// };

// //-----------------------------------------
// //    on mouse up
// //------------------------------------------
// function onMouseUpTwoOne(e){
//     if(! isItBigTwoOne){
//         isholdTwoOne = false;
//         cubeTwoOne.classList.remove('active');
        
//         anglesTwoOne = [0 , 90 , 180 , 270];
//         cubeTwoOne.style.opacity = "1";

//         for(let i = 0 ;  facesTwoOne.length ; i++ ){
//             facesTwoOne[i].style.transform = "rotateY(" + anglesTwoOne[i] + "deg) translateZ(99px)";
//         }
//     }
// };

// //-----------------------------------------
// //    on mouse move
// //------------------------------------------
// cubeRotateAngleTwoOne = 0;
// function onMousemoveTwoOne(e) {

//     if(!isholdTwoOne || isItBigTwoOne) return; //stops function if clicke isnt hold
//         cubeTwoOne.classList.add('active');
//         e.preventDefault();
//         const pos = e.pageX || e.touches[0].pageX;
//         const x = pos - cubeTwoOne.offsetLeft;
//         const walk =  (x - startXTwoOne) / 10 ;        
//         var i,angle;
    
//         if(walk < 10 && walk > -10){
//             for(i = 0 ;  facesTwoOne.length ; i++ ){
//                 anglesTwoOne[i] += walk;
//                 angle =  anglesTwoOne[i];
//                 facesTwoOne[i].style.transform = "rotateY(" + angle + "deg) translateZ(99px)";
//             }
//             onMouseUpTwoOne();
//         }
        
        
//         else if(walk >= 10 ){
//             cubeRotateAngleTwoOne += 90;         
            
//             cubeTwoOneRotator.style.transform = "rotateY("+ cubeRotateAngleTwoOne + "deg)";
                
//             anglesTwoOne = [ 0 , 90 , 180 , 270];
//             for(let i = 0 ;  i < facesTwoOne.length ; i++){
//                 facesTwoOne[i].style.transform = "rotateY(" + anglesTwoOne[i] + "deg) translateZ(99px)";
//             }
//             onMouseUpTwoOne();
    
//         }else if(walk <= -10 ){
//             cubeRotateAngleTwoOne -= 90;         
    
//             cubeTwoOneRotator.style.transform = "rotateY("+ cubeRotateAngleTwoOne + "deg)";
                
//             anglesTwoOne = [ 0 , 90 , 180 , 270];
//             for(let i = 0 ;  i < facesTwoOne.length ; i++){
//                 facesTwoOne[i].style.transform = "rotateY(" + anglesTwoOne[i] + "deg) translateZ(99px)";
//             }
//             onMouseUpTwoOne();
//         }
    
    
// };


// //------------------------------------------------on hold functions------------------------------------------

// function counterOptimizeTwoOne(){
//     if(isholdTwoOne){
//         setUpSize();
//         counterTwoOne++;
//     }else{
//         resetSize();
//         counterTwoOne = 0;
//     }
//     requestAnimationFrame(counterOptimize);
// }
// counterOptimizeTwoOne();
// var curentwidth =  cubeTwoOne.clientWidth;
// var isBig = false;
// function setUpSize(){
//     if(isBig == false){
//         cubeTwoOneLoader.style.display = "block";
//         const updatedSize= curentwidth + (counterTwoOne / 2);
//         cubeTwoOne.style.width = updatedSize + "px";
//         cubeTwoOne.style.height = updatedSize + "px";
//         cubeTwoOne.style.background = "hsla(0, 100%, 50%, 1)";
//         cubeTwoOne.style.transform = "translateX(" + counterTwoOne / 50  + "px)";
//         howBigTwoOne = updatedSize;
//         const loaderUpdate = (counterTwoOne / 1.25 );
//         loaderSpan.style.width = loaderUpdate + "px";
//     }
//     if(howBigTwoOne > 400){
//         cubeTwoOne.style.transitionDuration = ".3s";
//         cubeTwoOne.style.position = "fixed";
//         cubeTwoOne.style.height = "100vh";
//         cubeTwoOne.style.width = "100vw";
//         // cubeTwoOne.style.zIndex = "10";
//         isBig = true;
//         isItBigTwoOne = true;
//         isholdTwoOne = false;
//         cubeTwoOneLoader.style.display = "none";
//         loaderSpan.style.width = "0px";
//         fullFaceView();
//     }
// }
// function resetSize(){
//     if(howBigTwoOne < 400 && isBig == false){
//         console.log(isBig);
//         cubeTwoOne.style.background = "transparent";
//         cubeTwoOne.style.width = "198px";
//         cubeTwoOne.style.height = "404px";
//         cubeTwoOne.style.transform = "translateX( 0px )";
//         cubeTwoOneLoader.style.display = "none";
//         loaderSpan.style.width = "0px";
//     }
// }
// function fullFaceView(){
//     cubeTwoOneRotator.style.width = "100vw";
//     cubeTwoOneRotator.style.height = "100vh";
//     cubeTwoOneRotator.style.display = "grid";
//     cubeTwoOneRotator.style.gridTemplateColumns = "repeat(auto-fit, minmax(50% , 1fr)";
//     cubeTwoOneRotator.style.gridTemplateRows = "repeat(auto-fit, minmax(50% , 1fr)";
//     cubeTwoOneRotator.style.transformStyle = "none";
//     cubeTwoOneRotator.style.position = "fixed";
//     cubeTwoOneRotator.style.top = "36px";
//     cubeTwoOneRotator.style.left = "33px";
//     cubeTwoOneRotator.style.transform = "rotateY(0deg)";
//     for(let i = 0 ; i < 4 ; i++){
//         facesTwoOne[i].style.position = "relative";
//         facesTwoOne[i].style.transform = "rotateY(0deg) translateZ(0px)";
//         facesTwoOne[i].style.gridColumn = + i % 2 + 1 + " / span 1";
//         facesTwoOne[i].style.gridRow = "span 1";
//         facesTwoOne[i].style.width = "100%";
//         facesTwoOne[i].style.height = "100%";
//     }
// }       


        






//--------------------- changes------------------
//setUpSize 912 