let scalar = .75,
	width = 610 * scalar,
	height = 273 * scalar,
	pSystemSize = 20,
	speed = 99,
	pathString = '',
	pathLength;

const tau = Math.PI * 2,
	  repaint = 'rgba(0,0,8,.08)',
	  shadowPath = document.createElementNS('http://www.w3.org/2000/svg','path'),
	  canvas = document.querySelector('canvas'),
	  ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

pathString = 'M264 97 l11 -82, 10 33, 41 0, 9 -33, 10 82 q72 32, 83 -70 c205 50, 205 155, 39 210 c-5 -60, -72 -60, -81 -12, -10 -42, -70 -32, -81 33 c-11 -72, -70 -72, -80 -33 c-9 -48, -76 -48, -81 12 c-168 -55, -168 -160, 40 -210 q9 102, 80 69 m40 -95 c405 0, 405 270, 0 270 c-405 0, -405 -270, 0 -270';
shadowPath.setAttribute('d', pathString);
pathLength = shadowPath.getTotalLength();

const ParticleSystem = function(num){
	this.colour = '#eee';
	this.numParticles = num;
	this.allParticles = [];
	this.generate();
}
ParticleSystem.prototype.generate = function(){
	for(let i=0; i<this.numParticles; i++){
		let vo = {};
		vo.colour = i === 0 ? '#ffdc73' : '#a67c00';
		vo.position = pathLength/this.numParticles * i;
		vo.id = i;
		vo.parent = this;
		vo.scalar = scalar;
		vo.size = i === 0 ? 1.2 : 1;
		vo.speed = speed;
		vo.vx = 0;
		vo.vy = 0;
		this.allParticles.push(new Particle(vo));
	}
}
ParticleSystem.prototype.update = function(){
	for(let i=0; i<this.allParticles.length; i++){
		this.allParticles[i].update();
	}
}
ParticleSystem.prototype.getPointAtLength = function(id){
	return shadowPath.getPointAtLength(id);
}

const Particle = function(vo){
	this.colour = vo.colour;
	this.id = vo.id;
	this.position = vo.position;
	this.parent = vo.parent;
	this.scalar = vo.scalar;
	this.size = vo.size;
	this.speed = vo.speed;
	this.pt = this.parent.getPointAtLength(this.position);
	this.x = this.pt.x * this.scalar;
	this.y = this.pt.y * this.scalar;
	this.vx = 0;
	this.vy = 0;
}
Particle.prototype.update = function(){
	this.position += this.speed;
	if(this.position >= pathLength){
		this.position = this.position - pathLength;
	}
	this.pt = this.parent.getPointAtLength(this.position);
	this.x = this.pt.x * this.scalar;
	this.y = this.pt.y * this.scalar;
}

function update(){
	system.update();
}

function draw(){
	ctx.fillStyle = repaint;
	ctx.fillRect(0, 0, width, height);
	for(let i=0; i<system.numParticles; i++){
		let p = system.allParticles[i];
		ctx.fillStyle = p.colour;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.size, 0, tau, false);
		ctx.fill();
	}
}
function animate(){
	update();
	draw();
	requestAnimationFrame(animate);
}
let system = new ParticleSystem(pSystemSize);
animate();


/* UI */
const speedSelect = document.querySelector('#speed');
speedSelect.oninput = function(e) {
	system.speed = e.target.valueAsNumber;
	for(let i=0; i<system.allParticles.length; i++){
		system.allParticles[i].speed = system.speed;
		setSpeedLabel(system.speed);
	}
}
function setSpeedLabel(val){
	document.querySelector('#speed-label').innerHTML = 'Change phasing (' + val + ')';
}
speedSelect.value = speed;
setSpeedLabel(speed);



const mediaQuery = window.matchMedia('(max-width: 600px)')
// Check if the media query is true

function x() {
    if (mediaQuery.matches) {
        // Then trigger an alert
        canvas.style.width = "90%";
        canvas.style.height = "auto";
      }else{
        //do nothing

      }    
}
x();
