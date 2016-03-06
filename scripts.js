var FPS = 60;
var context;
var centerX;
var centerY;
var counter = 0;
var col;
var line;
var line2;
var line3;

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
Engine.Line = function(x1, y1, z1, x2, y2, z2, c)
{
	var lenX = Math.abs(x2 - x1);
	var lenY = Math.abs(y2 - y1);
	var lenZ = Math.abs(z2 - z1);
	return {
		x1: x1 + centerX,
		y1: y1 + centerY,
		z1: z1,
		x2: x2 + centerX,
		y2: y2 + centerY,
		z2: z2,
		lengthX: lenX,
		lengthY: lenY,
		lengthZ: lenZ,
		rX: 0,
		rY: 0,
		rZ: 0,
		rDegX: 0,
		rDegY: 0,
		rDegZ: 0,
		tX: 0,
		tY: 0,
		tZ: 0,
		color: c,
		render: function()
		{
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
			var alpha = this.rDegZ * (Math.PI/180);
			var beta = this.rDegY * (Math.PI/180);
			var gamma = this.rDegX * (Math.PI/180);
			var xDiff = this.x2 - this.x1;
			var yDiff = this.y2 - this.y1;
			var zDiff = this.z2 - this.z1;
			// Rotates end node around z-axis.
			if(alpha !== 0)
			{
				this.x2 = (Math.cos(alpha) * this.lengthX) - (Math.sin(alpha) * this.lengthY) + this.x1;
				this.y2 = (Math.cos(alpha) * this.lengthY) + (Math.sin(alpha) * this.lengthX) + this.y1;
			}
			// Rotates end node around y-axis.
			if(beta !== 0)
			{
				this.x2 = (Math.cos(beta) * this.lengthX) - (Math.sin(beta) * this.lengthZ) + this.x1;
				this.z2 = (Math.cos(beta) * this.lengthZ) + (Math.sin(beta) * this.lengthX) + this.z1;
			}
			// Rotates end node around x-axis.
			if(gamma !== 0)
			{
				this.y2 = (Math.cos(gamma) * this.lengthY) - (Math.sin(gamma) * this.lengthZ) + this.y1;
				this.z2 = (Math.cos(gamma) * this.lengthZ) + (Math.sin(gamma) * this.lengthY) + this.z1;
			}
			// Draws the new line.
			context.beginPath();
			context.moveTo(this.x1, this.y1);
			context.lineTo(this.x2, this.y2);
			context.strokeStyle = this.color.value;
			context.stroke();
		},
		rotate: function(x, y, z)
		{
			this.rX = x;
			this.rY = y;
			this.rZ = z;
		},
		rotateX: function(x) { this.rX = x; },
		rotateY: function(y) { this.rY = y; },
		rotateZ: function(z) { this.rZ = z;	},
		translate: function(x, y, z)
		{
			this.tX = x;
			this.tY = y;
			this.tZ = z;
		},
		translateX: function(x) { this.tX = x; },
		translateY: function(y) { this.tY = y; },
		translateZ: function(z) { this.tZ = z; }
	};
};
// Engine's update cycle
Engine.update = function(i)
{
	context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
	line.render();
	line2.render();
	line3.render();
};
// Engine's initiating function.
Engine.run = function()
{
	Engine.update(counter);
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
	line = (new Engine.Line(0, 0, 0, 200, 0, 0, new Engine.Color(255, 0, 0)));
	line2 = (new Engine.Line(0, 0, 0, 0, 200, 0, new Engine.Color(0, 0, 255)));
	line3 = (new Engine.Line(0, 0, 0, 0, 0, 200, new Engine.Color(0, 255, 0)));
	line.rotateZ(0.1);
	line2.rotateX(0.1);
	line3.rotateY(0.1);
	setInterval(Engine.run, (1000/FPS));
}