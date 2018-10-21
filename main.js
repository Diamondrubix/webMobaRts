
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
	canvas.addEventListener("mousedown", onClick, false);
	canvas.addEventListener("mouseup", onClickUp, false);
	canvas.addEventListener("mousemove", onmove, false);
	canvas.addEventListener("mousewheel", wheelMove, false);

	guy = new Drawable(10,10,30,30,"red");
	guy.keys = true;
	gameObjects.push(guy);


	net.receive(function(msg) {

        if (msg.id != guy.id) {
            for (var i = 0; i < gameObjects.length; i++) {
                var obj = gameObjects[i];
                if (obj.id == msg.id) {
                    gameObjects[i].x = msg.x;
                    gameObjects[i].y = msg.y;
                    return;
                }
            }
            x = new Drawable(msg.x, msg.y, msg.width, msg.height, msg.color);
            x.id = msg.id;
            x.moveable = msg.moveable;
            gameObjects.push(x)
        }
    });
	/*
	.recive(function(msg){
		//console.log(msg);
		if(guy.id !== msg.id) {

            //console.log(JSON.stringify(msg));
            var exists = false;
            for (var i = 0; i < gameObjects.length; i++) {
                if (gameObjects[i].id === msg.id) {
                    gameObjects[i].x = msg.x;
                    gameObjects[i].y = msg.y;
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                if (msg.class === "drawable") {
                    n = new Drawable(msg.x, msg.y, msg.width, msg.height, msg.color);
                    n.id = msg.id;
                    n.moveable = msg.moveable;
                    gameObjects.push(n);
                }
            }
        }
	});
	//*/


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


function place(e){
	var clickX;
    var clickY;

    if (e.pageX || e.pageY) { 
        clickX = e.pageX;
        clickY = e.pageY;
    }else { 
        clickX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        clickY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 

    clickX -= canvas.offsetLeft;
    clickY -= canvas.offsetTop;


    var x = (clickX/camera.zoom) - (camera.x+camera.xOff);

    var y = (clickY/camera.zoom) - (camera.y+camera.yOff);



   gameObjects.push(new Drawable(x, y, 40, 40, "blue"));
}


function mouseChordsToWolrdChords(e){
	var clickX;
    var clickY;

    if (e.pageX || e.pageY) { 
        clickX = e.pageX;
        clickY = e.pageY;
    }else { 
        clickX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
        clickY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 

    clickX -= canvas.offsetLeft;
    clickY -= canvas.offsetTop;

    var x = (clickX/camera.zoom) - (camera.x+camera.xOff);

    var y = (clickY/camera.zoom) - (camera.y+camera.yOff);


    return {x: x, y: y}
   //gameObjects.push(new Drawable(x, y, 40, 40, "blue"));
} 

function onClick(e) {

	chords = mouseChordsToWolrdChords(e);

	if(e.button == 0){
		mouseDown = true;
		
		oldMouseX = chords.x;
		oldMouseY = chords.y;
	}else if(e.button == 2){
		f = new Drawable(chords.x, chords.y, 40, 40, "blue");
		f.moveable = true;
		//net.send(f);
		gameObjects.push(f);
	}

}



function onClickUp(e) {


	
	mouseDown = false;

    
}

function wheelMove(e){
	e.preventDefault();
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	scrollSpeed = 0.2

	if(delta>0){

		if(camera.zoom-scrollSpeed < 0.2){
			return;
		}

		camera.zoom -= scrollSpeed;



	}else if(delta < 0){

		if(camera.zoom-scrollSpeed > 9){
			return;
		}

		camera.zoom += scrollSpeed;	
	}

	

	camera.x = centerX/camera.zoom;
	camera.y = centerY/camera.zoom;



	console.log(camera.zoom);
}


function onmove(e){
	if(mouseDown){
		//console.log("fewfew")
		chords = mouseChordsToWolrdChords(e);
		mx = chords.x;
		my = chords.y;

		camera.xOff += mx - oldMouseX;
		camera.yOff += my - oldMouseY;

	}
}


function draw(){

	cx.beginPath();
  	cx.fillStyle = "green";
  	cx.fillRect(0,0,canvas.width,canvas.height);
  	cx.fill();

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