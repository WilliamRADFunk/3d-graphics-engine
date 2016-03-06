var canvas;
var context;


var color = function(r, g, b)
{
	return (r.toString(16) + "" + g.toString(16) + "" + b.toString(16));
};
function init()
{
	canvas = document.getElementById('engine-wrapper');
	context = canvas.getContext('2d');
	makeLine(100, 100, 200, 200);
}
function makeLine(x1, y1, x2, y2)
{
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}