$(window).resize(function() {

});
function lluvia(){

	var c = document.getElementById("c"),
			ctx = c.getContext("2d");

	var h = document.getElementById('c').clientHeight;

	c.width = innerWidth;
	c.height = h;

	var lines = [],
			maxSpeed = 5,
			spacing = 5,
			xSpacing = 0,
			n = innerWidth / spacing,
			colors = ["#3B8686", "#79BD9A", "#A8DBA8", "#0B486B"],
			i;

	for (i = 0; i < n; i++){
		xSpacing += spacing;
		lines.push({
			x: xSpacing,
			y: Math.round(Math.random()*c.height),
			width: 2,
			height: Math.round(Math.random()*(innerHeight/10)),
			speed: Math.random()*maxSpeed + 1,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}


	function draw(){
		var i;
		ctx.clearRect(0,0,c.width,c.height);

		for (i = 0; i < n; i++){
			ctx.fillStyle = lines[i].color;
			ctx.fillRect(lines[i].x, lines[i].y, lines[i].width, lines[i].height);
			lines[i].y += lines[i].speed;

			if (lines[i].y > c.height)
				lines[i].y = 0 - lines[i].height;
		}

		requestAnimationFrame(draw);

	}

	draw();

}

function soleado(){

	var c = document.getElementById("c2"),
			ctx = c.getContext("2d");

	c.width = innerWidth;
	c.height = innerHeight;

}


/*---------------pro-bar--------------------------*/

$(function() {
	var socket = io.connect('192.168.0.13', { 'forceNew': true });
	socket.on('temperatureUpdate', function (time, data) {
			perCirc($('#sellPerCirc'), data);
	});


	function perCirc($el, end, i) {
		console.log(i);
		if (end < 0)
			end = 0;
		else if (end > 100)
			end = 100;
		if (typeof i === 'undefined')
			i = 0;
		var curr = (100 * i) / 360;
		$el.find(".perCircStat").html(Math.round(curr) + "%");
		if (i <= 180) {
			$el.css('background-image', 'linear-gradient(' + (90 + i) + 'deg, transparent 50%, #ccc 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
		} else{
			$el.css('background-image', 'linear-gradient(' + (i - 90) + 'deg, transparent 50%, #000099 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
		}
		if (curr < end) {
			setTimeout(function () {
				perCirc($el, end, i=i+2);
			}, 1);
		}
	}
});
