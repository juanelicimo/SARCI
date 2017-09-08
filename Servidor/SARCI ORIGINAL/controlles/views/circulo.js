$(function() {
	perCirc($('#sellPerCirc'), 50);

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
			$el.css('background-image', 'linear-gradient(' + (90 + i) + 'deg, transparent 50%, #ccc 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
		} else {
			$el.css('background-image', 'linear-gradient(' + (i - 90) + 'deg, transparent 50%, #000099 50%),linear-gradient(90deg, #ccc 50%, transparent 50%)');
		}
		if (curr < end) {
			setTimeout(function () {
				perCirc($el, end, i=i+3);
			}, 1);
		}
	}
});