function customEventHandler() {
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

	function inputEvent(className) {
		var namedInput = document.getElementsByClassName(className);
		//console.log("trying ... ", className);
		for (var i in namedInput) {
			try {
				i = Number.parseInt(i);
				if (Number.isNaN(i)) {
					continue;
				}

				var e = namedInput[i];
				inputEventAction(e, className);
				AppUtil.addClassObserver(e,function(){
					inputEventAction(e, e.className);
				});
	
			} catch (err) {
				console.log(err);
			}
		}
	}
}

$(document).ready(function () {
	setInterval(function () {
		customEventHandler();
	}, 500);
});
