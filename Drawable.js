

class Drawable {

	constructor(x,y,width,height,color) {
		this.x = x; 
	  	this.y = y;

	  	this.width = width;
	  	this.height = height;

	  	this.color = color;

	  	this.xVel = 0;
	  	this.yVel = 0;

	  	this.moveable = true;

	  	this.id = Math.random();

	  	this.classType = "Drawable";

	}


	

	tick(){

		

  }

  paint(){

  	cx.beginPath();
  	cx.strokeStyle = this.color;
  	cx.rect((this.x+camera.x+camera.xOff)*camera.zoom,(this.y+camera.y+camera.yOff)*camera.zoom,this.width*camera.zoom,this.height*camera.zoom);
  	cx.stroke();

	

  }


}

if (typeof module !== 'undefined') {
	module.exports = Drawable;
}
