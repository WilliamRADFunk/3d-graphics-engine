var canvas;
var context;
var centerX;
var centerY;
var counter = 0;
var start = (new Date()).getTime();

var render = { };
render.stopped = false;
render.update = function(i)
{
	console.log("i = ", i);
	var initX = 200;
	var initY = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);
	var rads = i * (Math.PI/180);
	var newX = (Math.cos(rads) * initX) - (Math.sin(rads) * initY) + centerX;
	var newY = (Math.sin(rads) * initX) - (Math.cos(rads) * initY) + centerY;
	makeLine(centerX, centerY, newX, newY);
};
render.run = function()
{
	render.update(counter);
	counter++;
	if(counter >= 360) counter = 0;
};
var color = function(r, g, b)
{
	return (r.toString(16) + "" + g.toString(16) + "" + b.toString(16));
};
function init()
{
	canvas = document.getElementById('engine-wrapper');
	canvas.width = document.getElementById('engine-wrapper').clientWidth;
	canvas.height = document.getElementById('engine-wrapper').clientHeight;
	centerX = canvas.width/2;
	centerY = canvas.height/2;
	context = canvas.getContext('2d');
	setInterval(render.run, 1000);
}
function makeLine(x1, y1, x2, y2)
{
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}