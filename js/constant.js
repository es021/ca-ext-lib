$ = jQuery;
var IS_TESTING_WZS = location.pathname.indexOf("wzs21") >= 0;
var WINDOW_NAME = getWindowName();
var IS_LOCATION = {
	P38_50101_1: location.pathname.indexOf("P3850101_TAB1.html") >= 0 || IS_TESTING_WZS,
	P38_50101_2: location.pathname.indexOf("P3850101_TAB2.html") >= 0 || IS_TESTING_WZS,
	P38_50101_3: location.pathname.indexOf("P3850101_TAB3.html") >= 0 || IS_TESTING_WZS,
	P38_20501_1: location.pathname.indexOf("P3820501_REGISTER_ADOPTION.html") >= 0 || IS_TESTING_WZS,
	P38_20501_2: location.pathname.indexOf("P3820501_REGISTER_ADOPTION2.html") >= 0 || IS_TESTING_WZS,
	P38_20501_8: location.pathname.indexOf("P3820501_REGISTER_ADOPTION8.html") >= 0 || IS_TESTING_WZS
}



console.log("init constant",location.pathname);
console.log("IS_LOCATION =>", IS_LOCATION);
console.log("WINDOW_NAME => ",WINDOW_NAME);

function getWindowName() {
	var windowName = null;

	try {
		var temp = location.pathname.split(".html");
		temp = temp[0];
		temp = temp.split("/");
		windowName = temp[temp.length - 1];
	} catch (err) {
		console.log("getWindowName err", err);
	}

	return windowName;
}


