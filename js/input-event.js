function customEventHandler() {
	var CLEAR_ALL_TIMEOUT = 8000;
	var INTERVAL_TIME = 200;

	var CUSTOM_CLASS = {
		DISABLED: "INPUT-DISABLED",
		PROTECTED: "INPUT-PROTECTED",
		MANDATORY: "INPUT-MANDATORY",
		MUSTKEYIN: "INPUT-MUSTKEYIN",
		TAB_DISABLED: "TAB-DISABLED",
		BTN_DISABLED: "MENU-BTN-DISABLED",
		NAV_BTN_DISABLED: "NAVBTN-DISABLED",
	};

	for (var k in CUSTOM_CLASS) {
		inputEvent(CUSTOM_CLASS[k]);
	}

	function inputEventAction(e, className) {
		//e.removeAttribute("required");
		e.removeAttribute("disabled");

		if ([CUSTOM_CLASS.DISABLED, CUSTOM_CLASS.PROTECTED, CUSTOM_CLASS.TAB_DISABLED, CUSTOM_CLASS.BTN_DISABLED, CUSTOM_CLASS.NAV_BTN_DISABLED].indexOf(className) >= 0) {
			e.setAttribute("disabled", "");
		} else if ([CUSTOM_CLASS.MANDATORY, CUSTOM_CLASS.MUSTKEYIN].indexOf(className) >= 0) {
			//e.setAttribute("required", "");
		}
	}

	/*
	var intervals = {};
	intervals[CUSTOM_CLASS.DISABLED] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.DISABLED);
	}, INTERVAL_TIME);

	intervals[CUSTOM_CLASS.PROTECTED] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.PROTECTED);
	}, INTERVAL_TIME);

	intervals[CUSTOM_CLASS.MANDATORY] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.MANDATORY);
	}, INTERVAL_TIME);

	intervals[CUSTOM_CLASS.MUSTKEYIN] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.MUSTKEYIN);
	}, INTERVAL_TIME);

	intervals[CUSTOM_CLASS.TAB_DISABLED] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.TAB_DISABLED);
	}, INTERVAL_TIME);

	intervals[CUSTOM_CLASS.BTN_DISABLED] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.TAB_DISABLED);
	}, INTERVAL_TIME);

	intervals[CUSTOM_CLASS.NAV_BTN_DISABLED] = setInterval(function () {
	inputEvent(CUSTOM_CLASS.NAV_BTN_DISABLED);
	}, INTERVAL_TIME);
	 */

	/*
	setTimeout(function () {
	for (var i in intervals) {
	clearInterval(intervals[i]);
	}
	}, CLEAR_ALL_TIMEOUT);
	 */

	/*
	function clearIntervalByClass(className) {
	clearInterval(intervals[className]);
	}
	 */

	function inputEvent(className) {
		var namedInput = document.getElementsByClassName(className);
		//var success = false;
		//console.log("trying ... ", className);
		for (var i in namedInput) {
			try {
				i = Number.parseInt(i);
				if (Number.isNaN(i)) {
					continue;
				}

				var e = namedInput[i];
				inputEventAction(e, className);
				addClassObserver(e);
				//success = true;
			} catch (err) {
				console.log(err);
			}
		}

		//if (success) {
		//	clearIntervalByClass(className);
		//}

	}

	function addClassObserver(e) {
		var observer = new MutationObserver(function (event) {
				inputEventAction(e, e.className);
			})

			observer.observe(e, {
				attributes: true,
				attributeFilter: ['class'],
				childList: false,
				characterData: false
			});
	}
}

$(document).ready(function () {
	setInterval(function () {
		customEventHandler();
	}, 500);
});
