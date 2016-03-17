var FPS = 60;
var context;
var centerX;
var centerY;
var col;
var line;
var line2;
var line3;
var scene;
var cube;
var block;
var cameraZoom = 20;

// Canvas setup and Engine instigation.
function init()
{	// Set up the Engine
	Engine.canvas = document.getElementById('engine-wrapper');
	Engine.canvas.width = Engine.canvas.clientWidth;
	Engine.canvas.height = Engine.canvas.clientHeight;
	centerX = Engine.canvas.width/2;
	centerY = Engine.canvas.height/2;
	context = Engine.canvas.getContext('2d');

	// Create the objects, give them rotation, and add them to the scene.
	/* To test three lines rotating around 3 separate axis
	//line = (new Engine.Line(0, 0, 0, 200, 0, 0, new Engine.Color(255, 0, 0)));
	//line2 = (new Engine.Line(0, 0, 0, 0, 200, 0, new Engine.Color(0, 0, 255)));
	//line3 = (new Engine.Line(0, 0, 0, 0, 0, 200, new Engine.Color(0, 255, 0)));
	//line.setRotation(0,0,0.1);
	//line2.setRotation(0.1,0,0);
	//line3.setRotation(0,0.1,0);
	scene.add(line);
	scene.add(line2);
	scene.add(line3);
	*/
	
	// To test the Euler transforms for rotation over multiple axis at the same time.
	cube = (new Engine.Cube(25, 25, 50, 50, 50, 50, new Engine.Color(255, 0, 0)));
	cube.setRotation(1,1,1);
	scene = new Engine.Scene();
	scene.add(cube);
	

	// Instigate the rendering loop.
	setInterval(Engine.run, (1000/FPS)); //Change FPS at top to alter speed. Lower is slower.
}