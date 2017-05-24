#pragma strict

var FrameDelay = 50;
var spawnMap = 0;
var map1:GameObject;
var gameMaps = [map1];
var fruit:GameObject;
var fruitPresent:boolean = true;
var gameBoundaryArray = [[-8,8,-5,5],[-5,5,-3,3]];
var bodyPositionArray = Array();

function Start () {

Instantiate(gameMaps[spawnMap], this.transform.position , Quaternion.Euler(0,0,0));
	
}

function Update () {
//Debug.Log(bodyPositionArray);
if(GameObject.Find("fruit") == null && GameObject.Find("fruit(Clone)") == null){
	fruitPresent = false;
} else {
	fruitPresent = true;
}

if(!fruitPresent) {
	var spawnPos = Vector2(Random.Range(gameBoundaryArray[spawnMap][0] , gameBoundaryArray[spawnMap][1]), Random.Range(gameBoundaryArray[spawnMap][2], gameBoundaryArray[spawnMap][3]));
	if(spawnPos in bodyPositionArray){
	Debug.Log("Hey,look, the same pos!");
	}
Instantiate(fruit ,spawnPos ,Quaternion.Euler(0,0,0)); 
};
	
}
