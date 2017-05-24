#pragma strict

var gridSizeX:float = 0;
var xDist:float = 0;
var gridSizeY:float = 0;
var yDist:float = 0;
var gridTile: GameObject;
var initialXPos:float = 0;
var initialYPos:float = 0;
var rotX:float = 0;
var rotY:float = 0;
var rotZ:float = 0;

var gridArray:Array = [];

function Start () {

	for (var i = 0; i < gridSizeX; i++) { 
		for (var j = 0; j < gridSizeY; j++) { 

			var gridPiece = Instantiate(gridTile, new Vector3(initialXPos + (i * xDist), initialYPos + (j * yDist), 0), Quaternion.Euler(rotX,rotY,rotZ));
					gridArray.push(gridPiece);
					Debug.Log (gridArray);
		}
	}
}

function Update () {
	
}
