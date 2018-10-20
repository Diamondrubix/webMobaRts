class Drawable {

	constructor(x,y,width,height,color) {
		this.x = x; 
	  	this.y = y;

	  	this.width = width;
	  	this.height = height;

	  	this.color = color;

	  	this.xVel = 0;
	  	this.yVel = 0;

	  	this.speed = 1;

	  	this.moveable = false;
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

	handleKeys(){

  	
	  	if(keys.indexOf("d")!=-1){
		  	this.xVel += this.speed;
		}

		if(keys.indexOf("a")!=-1){
		  	this.xVel -= this.speed;
		}


		if(keys.indexOf("w")!=-1){
		  	this.yVel -= this.speed;
		}

		if(keys.indexOf("s")!=-1){
		  	this.yVel += this.speed;
		}
	}

	tick(){

  		if(this.keys){

  			this.handleKeys();

			//this.color = "red";

			this.x += this.xVel;

			this.onCollision((obj, collision)=>{

				if(this.xVel > 0){
					if(obj.moveable)obj.x += collision.overlapX;
					this.x -= collision.overlapX

				}else if(this.xVel < 0){
					if(obj.moveable)obj.x -= collision.overlapX;
					this.x += collision.overlapX
				}
			});


			this.y += this.yVel;

			this.onCollision((obj, collision) => {
				if(this.yVel > 0){
					if(obj.moveable)things[i].y += collision.overlapY;
					this.y -= collision.overlapY
				}else if(this.yVel < 0){
					if(obj.moveable)things[i].y -= collision.overlapY;
					this.y += collision.overlapY
				}

			});
		}


  	

	  	if(this.xVel>0){
	  		this.xVel--;
	  	}else if(this.xVel<0){
	  		this.xVel++;
	  	}

	  	if(this.yVel>0){
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

  paint(){

  	cx.beginPath();
  	cx.strokeStyle = this.color;
  	cx.rect(this.x,this.y,this.width,this.height);
  	cx.stroke();

	

  }


}
