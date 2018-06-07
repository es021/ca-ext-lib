var AppUtilClass = function () {
	this.BODY = null;
}
AppUtilClass.prototype.pxOperation = function (first, oper, second) {
	var res = null;
	try {
		first = Number.parseInt(first.replace("px", ""));
		second = Number.parseInt(second.replace("px", ""));
		if (oper == "+") {
			res = first + second;
		}
		if (oper == "-") {
			res = first - second;
		}
	} catch (err) {
		console.log("appOperationPx err", err);
	}

	return res;
}

AppUtilClass.prototype.initAppElement = function (key, val, successHandler) {
	console.log("initAppElement", key, val);
	var interval = setInterval(function () {
		try {
			var el = null;
			if (key.toUpperCase() == "ID") {
				el = document.getElementById(val);
			}
			if (el != null && typeof el !== "undefined") {
				clearInterval(interval);
				successHandler(el);
			}
		} catch (err) {
			console.log("initAppElement err", err, key, val);
			clearInterval(interval);
		}
	}, 500);
}

AppUtilClass.prototype.addClassObserver = function (e, handler) {
	//console.log(e);
	if(typeof e === "undefined" || e === null){
		return;
	}
	var observer = new MutationObserver(function (event) {
		handler();
	})

	observer.observe(e, {
		attributes: true,
		attributeFilter: ['class'],
		childList: false,
		characterData: false
	});
}

AppUtilClass.prototype.recenterApp = function () {
	var bodyEl = null;
	var closeEl = null;
	var appWidth = null;

	this.initAppElement("id", WINDOW_NAME, function (el) {
		bodyEl = el;
		finishInitEl();
	});
	this.initAppElement("id", WINDOW_NAME + "CLOSE", function (el) {
		closeEl = el;
		finishInitEl();
	});

	function finishInitEl() {
		if (bodyEl !== null && closeEl !== null) {

			var left = closeEl.style.left;
			var width = closeEl.style.width;

			appWidth = AppUtil.pxOperation(left, "+", width);
			doRecenter(appWidth);
		}
	}

	function doRecenter(appWidth) {
		if (appWidth !== null) {
			var windowMax = window.innerWidth;
			if (windowMax < appWidth) {
				return;
			}

			var marginLeft = (windowMax - appWidth) / 2;
			bodyEl.style.position = "relative";
			bodyEl.style.marginLeft = marginLeft + "px";

			AppUtil.BODY = bodyEl;
		}
	}

	window.addEventListener("resize", function () {
		doRecenter(appWidth);
	});
}

var AppUtil = new AppUtilClass();
$(document).ready(function () {
	AppUtil.recenterApp()
});
