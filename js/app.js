var AppUtilClass = function () {
	this.BODY = null;

	var obj = this;
	this.initAppElement("id", WINDOW_NAME, function (el) {
		obj.BODY = el;
	});
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
		console.log("undefined in addClassObserver",e);
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
	var closeEl = null;
	var appWidth = null;
	var obj = this;

	this.initAppElement("id", WINDOW_NAME + "CLOSE", function (el) {
		closeEl = el;
		finishInitEl();
	});

	function finishInitEl() {
		if (obj.BODY !== null && closeEl !== null) {

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
			obj.BODY.style.position = "relative";
			obj.BODY.style.marginLeft = marginLeft + "px";
		}
	}

	window.addEventListener("resize", function () {
		doRecenter(appWidth);
	});
}

var AppUtil = new AppUtilClass();
console.log(document);
$(document).ready(function () {
	AppUtil.recenterApp()
});
