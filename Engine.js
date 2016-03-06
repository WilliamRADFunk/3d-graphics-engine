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
// Engine's Node object.
Engine.Node = function(x, y, z, size, c)
{
	return {
		position: {
			x: x,
			y: y,
			z: z
		},
		color: c,
		size: size,
		render: function()
		{
			context.beginPath();
			context.moveTo(this.position.x, this.position.y - this.size/2);
			context.bezierCurveTo(
			this.position.x + this.size/2, this.position.y - this.size/2,
			this.position.x + this.size/2, this.position.y + this.size/2,
			this.position.x, this.position.y + this.size/2);
			context.bezierCurveTo(
			this.position.x - this.size/2, this.position.y + this.size/2,
			this.position.x - this.size/2, this.position.y - this.size/2,
			this.position.x, this.position.y - this.size/2);
			context.fillStyle = c.value;
			context.fill();
  			context.closePath();	
		}
	};
};
// Engine's Line object.
Engine.Line = function(x1, y1, z1, x2, y2, z2, c)
{
	var lenX = Math.abs(x2 - x1);
	var lenY = Math.abs(y2 - y1);
	var lenZ = Math.abs(z2 - z1);
	return {
		// First and second points along each axis
		position:
		{
			x: [x1 + centerX, x2 + centerX],
			y: [y1 + centerY, y2 + centerY],
			z: [z1, z2]
		},
		// Original length of line along each axes
		length:
		{
			x: lenX,
			y: lenY,
			z: lenZ
		},
		// The amount of change to the axis angle each update.
		rotation:
		{
			x: 0,
			y: 0,
			z: 0
		},
		// The actual degrees btwn line and each axes
		angle:
		{
			x: 0,
			y: 0,
			z: 0
		},
		// The amount of linear movement of line along each axis
		translation:
		{
			x: 0,
			y: 0,
			z: 0,
		},
		// Color of the line.
		color: c,
		render: function()
		{
			// Applies the rotation and translation scalars.
			this.angle.x += this.rotation.x;
			if(this.angle.x >= 360) this.angle.x = 0;
			this.angle.y += this.rotation.y;
			if(this.angle.y >= 360) this.angle.y = 0;
			this.angle.z += this.rotation.z;
			if(this.angle.z >= 360) this.angle.z = 0;
			this.position.x[0] += this.translation.x;
			this.position.y[0] += this.translation.y;
			this.position.z[0] += this.translation.z;
			this.position.x[1] += this.translation.x;
			this.position.y[1] += this.translation.y;
			this.position.z[1] += this.translation.z;
			// Converts from degrees to radians.
			var alpha = this.angle.z * (Math.PI/180);
			var beta = this.angle.y * (Math.PI/180);
			var gamma = this.angle.x * (Math.PI/180);
			// Rotates end node around z-axis.
			if(alpha !== 0)
			{
				this.position.x[1] = (Math.cos(alpha) * this.length.x) - (Math.sin(alpha) * this.length.y) + this.position.x[0];
				this.position.y[1] = (Math.cos(alpha) * this.length.y) + (Math.sin(alpha) * this.length.x) + this.position.y[0];
			}
			// Rotates end node around y-axis.
			if(beta !== 0)
			{
				this.position.x[1] = (Math.cos(beta) * this.length.x) - (Math.sin(beta) * this.length.z) + this.position.x[0];
				this.position.z[1] = (Math.cos(beta) * this.length.z) + (Math.sin(beta) * this.length.x) + this.position.z[0];
			}
			// Rotates end node around x-axis.
			if(gamma !== 0)
			{
				this.position.y[1] = (Math.cos(gamma) * this.length.y) - (Math.sin(gamma) * this.length.z) + this.position.y[0];
				this.position.z[1] = (Math.cos(gamma) * this.length.z) + (Math.sin(gamma) * this.length.y) + this.position.z[0];
			}
			// Draws the new line.
			context.beginPath();
			context.moveTo(this.position.x[0], this.position.y[0]);
			context.lineTo(this.position.x[1], this.position.y[1]);
			context.strokeStyle = this.color.value;
			context.stroke();
		},
		setRotation: function(x, y, z)
		{
			this.rotation.x = x;
			this.rotation.y = y;
			this.rotation.z = z;
		},
		setRotationX: function(x) { this.rotation.x = x; },
		setRotationY: function(y) { this.rotation.y = y; },
		setRotationZ: function(z) { this.rotation.z = z; },
		setAngle: function(x, y, z)
		{
			this.angle.x = x;
			this.angle.y = y;
			this.angle.z = z;
		},
		setAngleX: function(x) { this.angle.x = x; },
		setAngleY: function(y) { this.angle.y = y; },
		setAngleZ: function(z) { this.angle.z = z; },
		translate: function(x, y, z)
		{
			this.translation.x = x;
			this.translation.y = y;
			this.translation.z = z;
		}
	};
};
Engine.Cube = function(x1, y1, z1, w, h, d, c)
{
	var center = [(x1 + centerX), (y1 + centerY), z1];
	// Establishing the cube's 8 nodes.
	var node0 = [(center[0] - w/2), (center[1] + h/2), (center[2] - d/2)];
	var node1 = [(center[0] + w/2), (center[1] + h/2), (center[2] - d/2)];
	var node2 = [(center[0] - w/2), (center[1] - h/2), (center[2] - d/2)];
	var node3 = [(center[0] + w/2), (center[1] - h/2), (center[2] - d/2)];
	var node4 = [(center[0] - w/2), (center[1] + h/2), (center[2] + d/2)];
	var node5 = [(center[0] + w/2), (center[1] + h/2), (center[2] + d/2)];
	var node6 = [(center[0] - w/2), (center[1] - h/2), (center[2] + d/2)];
	var node7 = [(center[0] + w/2), (center[1] - h/2), (center[2] + d/2)];
	var nodes = [node0,node1,node2,node3,node4,node5,node6,node7];
	// Establishing the cube's 12 edges.
	var edges = [[0,1],[1,3],[3,2],[2,0],
				 [0,4],[4,6],[6,2],[1,5],
				 [3,7],[7,5],[5,4],[6,7]];
	return {
		// First and second points along each axis
		position:
		{
			x: center[0],
			y: center[1],
			z: center[2]
		},
		// Original length of line along each axes
		len: [
				[-w/2,h/2,-d/2], [w/2,h/2,-d/2], [-w/2,-h/2,-d/2], [w/2,-h/2,-d/2],
				[-w/2,h/2,d/2], [w/2,h/2,d/2], [-w/2,-h/2,d/2], [w/2,-h/2,d/2],
			],
		// The amount of change to the axis angle each update.
		rotation:
		{
			x: 0,
			y: 0,
			z: 0
		},
		// The actual degrees btwn line and each axes
		angle:
		{
			x: 0,
			y: 0,
			z: 0
		},
		// The amount of linear movement of line along each axis
		translation:
		{
			x: 0,
			y: 0,
			z: 0,
		},
		// Color of the line.
		color: c,
		render: function()
		{
			// Applies the rotation and translation scalars.
			this.angle.x += this.rotation.x;
			if(this.angle.x >= 360) this.angle.x = 0;
			this.angle.y += this.rotation.y;
			if(this.angle.y >= 360) this.angle.y = 0;
			this.angle.z += this.rotation.z;
			if(this.angle.z >= 360) this.angle.z = 0;
			// Converts from degrees to radians.
			var alpha = this.angle.z * (Math.PI/180);
			var beta = this.angle.y * (Math.PI/180);
			var gamma = this.angle.x * (Math.PI/180);
			for(var i = 0; i < nodes.length; i++)
			{
				nodes[i][0] += this.translation.x;
				nodes[i][1] += this.translation.y;
				nodes[i][2] += this.translation.z;
				// Rotates end node around z-axis.
				if(alpha !== 0)
				{
					var cosA = Math.cos(alpha);
					var sinA = Math.sin(alpha);
					nodes[i][0] = (cosA * this.len[i][0]) - (sinA * this.len[i][1]) + this.position.x;
					nodes[i][1] = (cosA * this.len[i][1]) + (sinA * this.len[i][0]) + this.position.y;
				}
				// Rotates end node around y-axis.
				if(beta !== 0)
				{
					var cosB = Math.cos(beta);
					var sinB = Math.sin(beta);
					nodes[i][0] = (cosB * this.len[i][0]) - (sinB * this.len[i][2]) + this.position.x;
					nodes[i][2] = (cosB * this.len[i][2]) + (sinB * this.len[i][0]) + this.position.z;
				}
				// Rotates end node around x-axis.
				if(gamma !== 0)
				{
					var cosG = Math.cos(gamma);
					var sinG = Math.sin(gamma);
					nodes[i][1] = (cosG * this.len[i][1]) - (sinG * this.len[i][2]) + this.position.y;
					nodes[i][2] = (cosG * this.len[i][2]) + (sinG * this.len[i][1]) + this.position.z;
				}
			}
			// Draws the center node of the cube.
			var node = new Engine.Node(this.position.x, this.position.y, this.position.z, 10, new Engine.Color(32, 32, 32));
			node.render();
			// Draws the new line.
			for(var j = 0; j < edges.length; j++)
			{
				var n0 = edges[j][0];
				var n1 = edges[j][1];
				var node0 = nodes[n0];
				var node1 = nodes[n1];
				context.beginPath();
				context.moveTo(node0[0], node0[1]);
				context.lineTo(node1[0], node1[1]);
				context.strokeStyle = this.color.value;
				context.stroke();
			}
		},
		setRotation: function(x, y, z)
		{
			this.rotation.x = x;
			this.rotation.y = y;
			this.rotation.z = z;
		},
		setRotationX: function(x) { this.rotation.x = x; },
		setRotationY: function(y) { this.rotation.y = y; },
		setRotationZ: function(z) { this.rotation.z = z; },
		setAngle: function(x, y, z)
		{
			this.angle.x = x;
			this.angle.y = y;
			this.angle.z = z;
		},
		setAngleX: function(x) { this.angle.x = x; },
		setAngleY: function(y) { this.angle.y = y; },
		setAngleZ: function(z) { this.angle.z = z; },
		translate: function(x, y, z)
		{
			this.translation.x = x;
			this.translation.y = y;
			this.translation.z = z;
		}
	};
};
Engine.Scene = function()
{
	var objects = [];
	return {
		add: function(obj)
		{
			objects.push(obj);
		},
		remove: function(obj)
		{
			var index = objects.indexOf(obj);
			if(index > -1) objects.splice(index, 1);
		},
		render: function()
		{
			for(var i = 0; i < objects.length; i++) { objects[i].render(); }
		}
	};
};
// Engine's update cycle
Engine.update = function()
{
	context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
	scene.render();
};
// Engine's initiating function.
Engine.run = function()
{
	Engine.update();
};