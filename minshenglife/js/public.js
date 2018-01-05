(function() {
			size();
			window.onresize = function() {
				size();
			}

			function size() {
				var winW = document.documentElement.clientWidth || document.body.clientWidth;
				document.documentElement.style.fontSize = winW / 10 + 'px';
			}
		})()