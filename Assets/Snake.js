#pragma strict

var currentDirection = 4;
var timeDelay = 50;
var timer = 0;
var currentLength = 3;
var directionLastFrame = 4;
var speed:float = 1;
var body:GameObject;
var bigBody:GameObject;
var angleArray = [0,0,0,0];
var eatenThisTurn:boolean = false;
var bodyArray = Array();
var gameBoundaryLeft = 0;
var gameBoundaryRight = 0;
var gameBoundaryUpper = 0;
var gameBoundaryDown = 0;
var boostAmount = 0;
var gameManager:GameObject;

function Start () {
	gameManager = GameObject.Find("gameManager");
	timeDelay = GameObject.Find("gameManager").GetComponent.<GameManager>().FrameDelay;
	bodyArray.Add(GameObject.Find("StartBody1"));
	GameObject.Find("gameManager").GetComponent.<GameManager>().bodyPositionArray.Add([GameObject.Find("StartBody1").transform.position.x,GameObject.Find("StartBody1").transform.position.y]);
	GameObject.Find("StartBody1").transform.position.y = this.transform.position.y - (speed * 1);
	bodyArray.Add(GameObject.Find("StartBody2"));
	GameObject.Find("gameManager").GetComponent.<GameManager>().bodyPositionArray.Add([GameObject.Find("StartBody2").transform.position.x,GameObject.Find("StartBody2").transform.position.y]);
	GameObject.Find("StartBody2").transform.position.y = this.transform.position.y - (speed * 2);
	bodyArray.Add(GameObject.Find("StartBody3"));
	GameObject.Find("gameManager").GetComponent.<GameManager>().bodyPositionArray.Add([GameObject.Find("StartBody3").transform.position.x,GameObject.Find("StartBody3").transform.position.y]);
	GameObject.Find("StartBody3").transform.position.y = this.transform.position.y - (speed * 3);

	gameBoundaryLeft = GameObject.Find("gameManager").GetComponent.<GameManager>().gameBoundaryArray[0][0];
	gameBoundaryRight = GameObject.Find("gameManager").GetComponent.<GameManager>().gameBoundaryArray[0][1];
	gameBoundaryDown = GameObject.Find("gameManager").GetComponent.<GameManager>().gameBoundaryArray[0][2];
	gameBoundaryUpper = GameObject.Find("gameManager").GetComponent.<GameManager>().gameBoundaryArray[0][3];

	boostAmount = timeDelay / 20;
}

function Update () {

if(Input.GetKeyDown("right") && directionLastFrame != 3){
	currentDirection = 1;
} else if(Input.GetKeyDown("down") && directionLastFrame!= 4){
	currentDirection = 2;
} else if(Input.GetKeyDown("left") && directionLastFrame != 1){
	currentDirection = 3;
} else if(Input.GetKeyDown("up") && directionLastFrame != 2){
	currentDirection = 4;
}

if(Input.GetKey("right") && directionLastFrame == 1 && currentDirection == 1){
	timer += boostAmount;
} else if(Input.GetKey("down") && directionLastFrame == 2 && currentDirection == 2){
	timer += boostAmount;
} else if(Input.GetKey("left") && directionLastFrame == 3 && currentDirection == 3){
	timer += boostAmount;
} else if(Input.GetKey("up") && directionLastFrame == 4 && currentDirection == 4){
	timer += boostAmount;
}

if(Time.timeScale != 0){
	timer++;
}
	if(timer > timeDelay){
		detectDirection(currentDirection);
		move();
		timer = 0;
		////Debug.Log("next Frame");
	};
}

function detectDirection(direction){

	if(direction == 1){
		right();
	} else if (direction == 2){
		down();
	} else if (direction == 3){
		left();
	} else if (direction == 4){
		up();
	}

}

function up() {
//Debug.Log(currentDirection);
directionLastFrame = currentDirection;
transform.rotation = Quaternion.Euler(0,180, angleArray[currentDirection-1]);
};
function down() {
directionLastFrame = currentDirection;
//Debug.Log(currentDirection);
transform.rotation = Quaternion.Euler(0,180, angleArray[currentDirection-1]);
};
function left() {
directionLastFrame = currentDirection;
//Debug.Log(currentDirection);
transform.rotation = Quaternion.Euler(0,180, angleArray[currentDirection-1]);
};
function right() {
directionLastFrame = currentDirection;
transform.rotation = Quaternion.Euler(0,180, angleArray[currentDirection-1]);
//Debug.Log(currentDirection);
};

function eat(){
eatenThisTurn = true;
currentLength += 1;
};



function move (){

// save last pos.
var tempPos = transform.position;

var tempBody:GameObject;
// move to next pos
if(eatenThisTurn){
	tempBody = Instantiate(bigBody , tempPos , Quaternion.Euler(0,0,0));
	eatenThisTurn = false;
} else {
	tempBody = Instantiate(body , tempPos , Quaternion.Euler(0,0,0));
};

gameManager.GetComponent.<GameManager>().bodyPositionArray.Push([tempBody.transform.position.x,tempBody.transform.position.y]);
bodyArray.Add(tempBody);


transform.Translate(0,speed,0);
if(this.transform.position.y > gameBoundaryUpper){
	this.transform.position.y = gameBoundaryDown + speed;
}
if(this.transform.position.y < gameBoundaryDown){
	this.transform.position.y = gameBoundaryUpper - speed;
}
if(this.transform.position.x > gameBoundaryRight){
	this.transform.position.x = gameBoundaryLeft + speed;
}
if(this.transform.position.x < gameBoundaryLeft){
	this.transform.position.x = gameBoundaryRight - speed;
}


};

function die (){
Debug.Log("im dead");
};


function OnCollisionEnter2D (coll : Collision2D){

    if(coll.gameObject.tag == "Fruit"){
      Destroy(coll.gameObject);
	  eat();
    } else if (coll.gameObject.tag == "Bad"){
		die();
	}
}
