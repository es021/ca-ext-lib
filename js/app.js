var AppUtilClass = function () {
	this.BODY = null;
	this.CLOSE = null;
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

AppUtilClass.prototype.showLoad = function (body) {
	if (this.LOADER == null) {
		this.LOADER = document.createElement("div");
		this.LOADER.setAttribute("id", "custom-app-load");
		this.LOADER.innerHTML = "<i class='fa fa-spinner fa-pulse fa-3x'></i><br>Loading Page";
		body.appendChild(this.LOADER);
	}
	this.LOADER.style.display = "flex";
	this.LOADER.style.opacity = "1";
}

AppUtilClass.prototype.closeApp = function () {
	var mes = "<i class='fa fa-spinner fa-pulse fa-3x'></i>";
	mes += "<br>Application Has Successfully Exit.";
	mes += "<br>Please Close Window To Continue";
	this.LOADER.innerHTML = mes;
	this.LOADER.style.display = "flex";
	this.LOADER.style.opacity = "1";
}

AppUtilClass.prototype.hideLoad = function () {
	this.LOADER.style.opacity = "0";
	var obj = this;
	setTimeout(function () {
		obj.LOADER.style.display = "none";
	}, 500);
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
	if (typeof e === "undefined" || e === null) {
		return;
	}
	var observer = new MutationObserver(function (event) {
		handler(e);
	})

	observer.observe(e, {
		attributes: true,
		attributeFilter: ['class'],
		childList: false,
		characterData: false
	});
}

AppUtilClass.prototype.registerEvent = function () {
	var obj = this;

	this.CLOSE.style.display = "none";
	// this.CLOSE.addEventListener("click", function () {
	// 	obj.closeApp();
	// });
}

AppUtilClass.prototype.recenterApp = function () {
	var bodyEl = null;
	var closeEl = null;
	var appWidth = null;
	var obj = this;

	this.initAppElement("id", WINDOW_NAME + "CLOSE", function (el) {
		closeEl = el;
		obj.CLOSE = closeEl;
		finishInitEl();
	});

	this.initAppElement("id", WINDOW_NAME, function (el) {
		bodyEl = el;
		obj.BODY = bodyEl;
		finishInitEl();
	});

	function finishInitEl() {
		if (bodyEl !== null && closeEl !== null) {
			var left = closeEl.style.left;
			var width = closeEl.style.width;
			appWidth = AppUtil.pxOperation(left, "+", width);
			doRecenter(appWidth);
			obj.registerEvent();
		} else if (bodyEl !== null && closeEl === null) {
			console.log("failed to recenter app");
			obj.hideLoad();
		}
	}

	function doRecenter(appWidth) {
		if (appWidth !== null) {
			obj.hideLoad();
			var windowMax = window.innerWidth;
			if (windowMax < appWidth) {
				return;
			}

			var marginLeft = (windowMax - appWidth) / 2;
			bodyEl.style.position = "relative";
			bodyEl.style.marginLeft = marginLeft + "px";
		} else {
			obj.hideLoad();
		}
	}

	window.addEventListener("resize", function () {
		doRecenter(appWidth);
	});
}

var AppUtil = new AppUtilClass();
$(document).ready(function () {
	AppUtil.showLoad(document.body);
	AppUtil.recenterApp()
});


