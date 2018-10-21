

function isNode(){
	return !isClient();
}


function isClient(){
	return typeof module == 'undefined';
}

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


	collide(r){
		var happend = (this.x < r.x + r.width && this.x + this.width > r.x && this.y < r.y + r.height && this.y + this.height > r.y);

		var a = this;
		var b = r;

		var x = Math.max(a.x, b.x);
	  	var num1 = Math.min(a.x + a.width, b.x + b.width);
	  	var y = Math.max(a.y, b.y);
	  	var num2 = Math.min(a.y + a.height, b.y + b.height);


		if(happend){
			 return {
				overlapX : num1 - x,
				overlapY: num2 - y,
			}
		}else{
			return false;
		}

	}

	onCollision(callback){
		for(var i=0; i<gameObjects.length;i++){
			if(gameObjects[i]!=this){
				var collision = this.collide(gameObjects[i]);
				if(collision != false){
					callback(gameObjects[i], collision);
				}
			}
		}
	}

	
	//server
	handleCollision(){
		this.x += this.xVel;
		

		this.onCollision((obj, collision)=>{
			if(this.xVel > 0){


				if(obj.moveable && isNode()){
					obj.xVel += collision.overlapX;
					obj.tick();
					//obj.handleCollision();

				}

				if(!obj.moveable){
					this.x -= collision.overlapX
				}


			}else if(this.xVel < 0){
				
				if(obj.moveable && isNode()){
					obj.xVel -= collision.overlapX;
					//obj.networkUpdate();
				}

				if(!obj.moveable){
					this.x += collision.overlapX
				}
			}
		});



		this.y += this.yVel;

		this.onCollision((obj, collision) => {
			if(this.yVel > 0){
				if(obj.moveable && isNode()){
					obj.yVel += collision.overlapY;
				}
				this.y -= collision.overlapY
			}else if(this.yVel < 0){
				if(obj.moveable && isNode()){
					obj.yVel -= collision.overlapY;
				}
				this.y += collision.overlapY
			}

		});

		


	}


	handleVelocity(){
		if( Math.abs(this.xVel)<1){
			this.xVel = 0;
		}else if(this.xVel>0){
	  		this.xVel--;
	  	}else if(this.xVel<0){
	  		this.xVel++;
	  	}

	  	if( Math.abs(this.yVel)<1){
			this.yVel = 0;
		}else if(this.yVel>0){
	  		this.yVel--;
	  	}else if(this.yVel<0){
	  		this.yVel++;
	  	}



	  	if(this.xVel > 10 ){
	  		this.xVel = 10;
	  	}else if (this.xVel < -10 ){
	  		this.xVel = -10;
	  	}

		if(this.yVel > 10 ){
	  		this.yVel = 10;
	  	}else if(this.yVel < -10 ){
	  		this.yVel = -10;
	  	} 
	}


	networkUpdate(){
		if(isNode()){	
	  		io.emit("gameroom1",this);
	  	}
	}


	tick(){


	  	this.oldX = this.x;
	  	this.oldY = this.y;

		

		
			this.handleCollision();
		
			this.handleVelocity();
		


	  	if( (this.oldX != this.x || this.oldY != this.y) ){
	  		this.networkUpdate();
	  	}
	  	

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
