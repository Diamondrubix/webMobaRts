
function setup(){
	vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
	if (typeof (canvas.getContext) !== undefined) {
    	cx = canvas.getContext('2d');
    	gameLoop();
	}

	window.addEventListener('keydown',keydown,false);
	window.addEventListener('keyup',keyup,false);
	canvas.addEventListener("click", onClick, false);

	guy = new Drawable(10,10,30,30,"red");
	guy.keys = true;
	gameObjects.push(guy);

}

function keyup(e) {
	index = keys.indexOf(e.key);
	if (index > -1) {
  		keys.splice(index, 1);
	}
}

function keydown(e) {
	index = keys.indexOf(e.key);
	if (index == -1) {
  		keys.push(e.key);
	}
}

function onClick(e) {
    var clickX;
    var clickY;

    //console.log(document.body.scrollLeft);
    //console.log(e.clientX )
   //console.log(offsetLeft);

    if (e.pageX || e.pageY) { 
        clickX = e.pageX;
        clickY = e.pageY;
    }else { 
        clickX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        clickY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 

    clickX -= canvas.offsetLeft;
    clickY -= canvas.offsetTop;

    console.log(clickX);

    var x = clickX;
    var y = clickY;

   // console.log(x);
   // console.log(y);

   gameObjects.push(new Drawable(x, y, 40, 40, "blue"));


}

function draw(){
	for(var i=0; i < gameObjects.length; i++){
		gameObjects[i].tick();
		gameObjects[i].paint();
	}
}


function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime) / 1000;
    cx.clearRect(0, 0, cw, cw);
    
    draw();

    lastTime = currentTime;
}


setup();