
var pageStatus = null;
var progress = null;
var animationInterval = 33;

window.document.addEventListener("readystatechange", function(){

    if(document.readyState == "complete"){
        pageStatus = "complete";
    }else{
      updateProgress();
    }
}, false);


function updateProgress(){

    if(pageStatus == "complete"){
        document.getElementById("loader").innerHTML = 100+"%";
        setTimeout(function(){
            document.getElementById("loader").style.display = "none";    
        }, 700);
    }
    else{            
        if(progress == null){
            progress = 1;
        }
       
        progress = progress + 1;
        if(progress >= 0 && progress <= 30){
            animationInterval += 1;
            document.getElementById("loader").innerHTML = progress + "%";
        }
        else if(progress > 30 && progress <= 60){
            animationInterval += 2;
            document.getElementById("loader").innerHTML = progress + "%";
        }
        else if(progress > 60 && progress <= 80){
            animationInterval += 3;
            document.getElementById("loader").innerHTML = progress + "%";
        }
        else if(progress > 80 && progress <= 90){
            animationInterval += 4;
            document.getElementById("loader").innerHTML = progress + "%";
        }
        else if(progress > 90 && progress <= 95){
            animationInterval += 80;
            document.getElementById("loader").innerHTML = progress + "%";
        }
        else if(progress > 95 && progress <= 99){
            animationInterval += 150;
            document.getElementById("loader").innerHTML = progress + "%";
        }
        else if(progress >= 100){
            document.getElementById("loader").innerHTML = 99 + "%";
        }
        setTimeout(updateProgress, animationInterval);    
    }
}




const container = document.querySelector(".container");
const image = document.querySelector(".main-img");
container.style.background = "#e9e9e9"


container.addEventListener("mousedown", onMousedown);
container.addEventListener("mousemove", onMousemove);
container.addEventListener("mouseup", onMouseup);

container.addEventListener("touchstart", onMousedown);
container.addEventListener("touchmove", onTouchmove);
container.addEventListener("touchend", onMouseup);



let whichImage = 0;
let startX = 0;
let isHold = false;
let mobileSpeed = 0;


function onMousedown(e) {
    isHold = true;
    const pos = e.pageX || e.touches[0].pageX;
    startX = pos - container.offsetLeft;
}

function onTouchmove(eve) {
    eve.preventDefault();
    if(isHold){
        const pos = eve.pageX || eve.touches[0].pageX;;
        let x = pos - container.offsetLeft;
        let walk = x - startX;
        if(mobileSpeed === 2){
            if(walk < 0){
            
                whichImage++;
                if(whichImage === 24 || whichImage > 24){
                    whichImage = 0;
                }
                image.src = "./imgs/0_" + whichImage + ".jpg";
                startX = x;
            }else if(walk > 0){
                whichImage--;
                if(whichImage === 0 || whichImage === -1){
                    whichImage = 24;
                }
                image.src = "./imgs/0_" + whichImage + ".jpg";
                startX = x;
            }
            mobileSpeed = 0;
        }else{
            mobileSpeed++;
        }
        
    }
}
//-----------------------------------------
//    on mouse move
//------------------------------------------

function onMousemove(eve) {
    eve.preventDefault();
    if(isHold){
        const pos = eve.pageX;
        let x = pos - container.offsetLeft;
        let walk = x - startX;
        const changeSpeed = walk % 2;
        if(walk < 0 && changeSpeed === 0){
                whichImage++;
                if(whichImage === 24 || whichImage > 24){
                    whichImage = 0;
                }
                image.src = "./imgs/0_" + whichImage + ".jpg";
                startX = x;
        }else if(walk > 0 && changeSpeed === 0){
            whichImage--;
            if(whichImage === 0 || whichImage === -1){
                whichImage = 24;
            }
            image.src = "./imgs/0_" + whichImage + ".jpg";
            startX = x;
        }
    }
}
//-----------------------------------------
//    on mouse up
//------------------------------------------

function onMouseup(e) {
    isHold = false;
}

//----------------------------------------
//     on zoom thing
//----------------------------------------

const zoomDes = document.querySelector(".zoom-des");
const zoomInc = document.querySelector(".zoom-inc");
const zoomValue = document.querySelector(".zoom-value");

let zoomin = parseInt(zoomValue.value);
console.log(zoomin); 

const mainImg = document.querySelector(".main-img");


zoomDes.addEventListener("click" , function(){
	console.log("a thing");
    zoomValue.value = zoomin - 25 + "%";
    zoomin = parseInt(zoomValue.value);
    mainImg.style.transform = "scale("+ zoomin/100 +")";
    if(zoomin === 25){
        zoomDes.classList.add("button-disable");
    }
    if(zoomin !== 175){
        zoomInc.classList.remove("button-disable");
    }


} , false);


zoomInc.addEventListener("click" , function(){
    zoomValue.value = zoomin + 25 + "%";
    zoomin = parseInt(zoomValue.value)
    mainImg.style.transform = "scale("+ zoomin/100 +")";
    if(zoomin !== 25){
        zoomDes.classList.remove("button-disable");
    }
    if(zoomin === 175){
        zoomInc.classList.add("button-disable");
    }
} , false);