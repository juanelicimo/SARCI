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
	perCirc($('#sellPerCirc'),70);

	function perCirc($el, end, i) {
		if (end < 0)
			end = 0;
		else if (end > 100)
			end = 100;
		if (typeof i === 'undefined')
			i = 0;
		var curr = (100 * i) / 360;
		$el.find(".perCircStat").html(Math.round(curr) + "%");
		if (i <= 180) {
			$el.css('background-image', 'linear-gradient(' + (90 + i) + 'deg, transparent 50%, #4FC3F7 50%),linear-gradient(90deg, #4FC3F7 50%, transparent 50%)');
		} else {
			$el.css('background-image', 'linear-gradient(' + (i - 90) + 'deg, transparent 50%, #0277BD 50%),linear-gradient(90deg, #4FC3F7 50%, transparent 50%)');
		}
		if (curr < end) {
			setTimeout(function () {
				perCirc($el, end, i=i+3);
			}, 1);
		}
	}
})




$(document).ready(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    Highcharts.chart('container', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                return data;
            }())
        }]
    });
});