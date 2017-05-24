#pragma strict

var timeDelay = 50;
var timer = 0;
var life = 0;
var ignoreLength = false;

function Start () {
	timeDelay = GameObject.Find("gameManager").GetComponent.<GameManager>().FrameDelay;
	if(!ignoreLength){life = GameObject.Find("snakeHead").GetComponent.<Snake>().currentLength;}
}

function Update () {
if(Time.timeScale != 0){
	timer++;
}

	if(timer > timeDelay){
		life --;
		timer = 0;
		//Debug.Log("next Frame");
	};

if(life == 0){
	GameObject.Find("snakeHead").GetComponent.<Snake>().bodyArray.Remove(this.gameObject);
	GameObject.Find("gameManager").GetComponent.<GameManager>().bodyPositionArray.RemoveAt(0);
	GameObject.Destroy(this.gameObject);
}

	
}
