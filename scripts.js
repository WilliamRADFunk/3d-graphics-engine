var FPS = 1;
var context;
var centerX;
var centerY;
var col;
var line;
var line2;
var line3;
var scene;
var cube;

// Canvas setup and Engine instigation.
function init()
{
	Engine.canvas = document.getElementById('engine-wrapper');
	Engine.canvas.width = Engine.canvas.clientWidth;
	Engine.canvas.height = Engine.canvas.clientHeight;
	centerX = Engine.canvas.width/2;
	centerY = Engine.canvas.height/2;
	context = Engine.canvas.getContext('2d');
	//line = (new Engine.Line(0, 0, 0, 200, 0, 0, new Engine.Color(255, 0, 0)));
	//line2 = (new Engine.Line(0, 0, 0, 0, 200, 0, new Engine.Color(0, 0, 255)));
	//line3 = (new Engine.Line(0, 0, 0, 0, 0, 200, new Engine.Color(0, 255, 0)));
	//line.setRotation(0,0,0.1);
	//line2.setRotation(0.1,0,0);
	//line3.setRotation(0,0.1,0);
	cube = (new Engine.Cube(0, 0, 0, 50, 50, 50, new Engine.Color(255, 0, 0)));
	cube.setRotation(0,0,0.1);
	scene = new Engine.Scene();
	//scene.add(line);
	//scene.add(line2);
	//scene.add(line3);
	scene.add(cube);
	setInterval(Engine.run, (1000/FPS));
}