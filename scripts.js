
var context;
var centerX;
var centerY;
var counter = 0;
var col;
var line;

// Engine object
var Engine = { };
// Engine's Color object. Returns a hex value string.
Engine.Color = function(r, g, b)
{
	r = (r >= 16) ? r.toString(16) : (r.toString(16) + "0");
	g = (g >= 16) ? g.toString(16) : (g.toString(16) + "0");
	b = (b >= 16) ? b.toString(16) : (b.toString(16) + "0");
	var colorString = "#" + r + g + b + "";

	return {value:colorString};
};
// Engine's Line object.
Engine.Line = function(x1, y1, x2, y2, c)
{
	return {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2,
		rX: 0,
		rY: 0,
		rZ: 1,
		rDegX: 0,
		rDegY: 0,
		rDegZ: 0,
		tX: 0,
		tY: 0,
		tZ: 0,
		color: c,
		render: function() {
			// Applies the rotation and translation scalars.
			this.rDegX += this.rX;
			if(this.rDegX >= 360) this.rDegX = 0;
			this.rDegY += this.rY;
			if(this.rDegY >= 360) this.rDegY = 0;
			this.rDegZ += this.rZ;
			if(this.rDegZ >= 360) this.rDegZ = 0;
			this.tX += this.tX;
			this.tY += this.tY;
			this.tZ += this.tZ;
			// Converts from degrees to radians, and gets the difference btwn points.
			var rads = this.rDegZ * (Math.PI/180);
			var xDiff = this.x2 - this.x1;
			var yDiff = this.y2 - this.y1;
			// Finds new position of x1, y1, x2, y2.
			this.x2 = (Math.cos(rads) * 200) - (Math.sin(rads) * 0) + centerX;
			this.y2 = (Math.sin(rads) * 200) - (Math.cos(rads) * 0) + centerY;
			// Draws the new line.
			context.beginPath();
			context.moveTo(this.x1, this.y1);
			context.lineTo(this.x2, this.y2);
			context.strokeStyle = this.color.value;
			context.stroke();
		},
		rotate: function(x, y, z) {
			this.rX = x;
			this.rY = y;
			this.rZ = z;
		},
		rotateX: function(x) {
			this.rX = x;
		},
		rotateY: function(y) {
			this.rY = y;
		},
		rotateZ: function(z) {
			this.rZ = z;
		},
		translate: function(x, y, z) {
			this.tX = x;
			this.tY = y;
			this.tZ = z;
		},
		translateX: function(x) {
			this.tX = x;
		},
		translateY: function(y) {
			this.tY = y;
		},
		translateZ: function(z) {
			this.tZ = z;
		}
	};
};
// Engine's update cycle
Engine.update = function(i)
{
	context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
	line.render();
};
// Engine's initiating function.
Engine.run = function()
{
	Engine.update(counter);
	counter++;
	if(counter >= 360) counter = 0;
};
// Canvas setup and Engine instigation.
function init()
{
	Engine.canvas = document.getElementById('engine-wrapper');
	Engine.canvas.width = Engine.canvas.clientWidth;
	Engine.canvas.height = Engine.canvas.clientHeight;
	centerX = Engine.canvas.width/2;
	centerY = Engine.canvas.height/2;
	context = Engine.canvas.getContext('2d');
	col = (new Engine.Color(255, 100, 15));
	line = (new Engine.Line(centerX, centerY, centerX + 200, centerY, col));
	setInterval(Engine.run, 1000);
}