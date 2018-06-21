function customEventHandler() {
	var CUSTOM_CLASS = {
		DISABLED: "INPUT-DISABLED",
		PROTECTED: "INPUT-PROTECTED",
		MANDATORY: "INPUT-MANDATORY",
		MUSTKEYIN: "INPUT-MUSTKEYIN",
		TAB_DISABLED: "TAB-DISABLED",
		TAB_ENABLE: "TAB-ENABLE",
		BTN_DISABLED: "MENU-BTN-DISABLED",
		BTN_ENABLE: "MENU-BTN-ENABLE",
		NAV_BTN_DISABLED: "NAVBTN-DISABLED",
		NAV_BTN_ENABLED: "NAVBTN-ENABLE"
	};

	for (var k in CUSTOM_CLASS) {
		inputEvent(CUSTOM_CLASS[k]);
	}

	function getInputChild(e) {
		var child = $(e).find("input");
		var type = child.attr("type");

		if (type == "RADIO" || type == "CHECKBOX") {
			return child;
		}

		return false;
	}

	function inputEventAction(e, className) {
		var inputChild = getInputChild(e);
		var hasInputChild = inputChild !== false;

		e.removeAttribute("disabled");
		if (hasInputChild) {
			inputChild.removeAttr("disabled");
		}

		if ([CUSTOM_CLASS.DISABLED, CUSTOM_CLASS.PROTECTED, CUSTOM_CLASS.TAB_DISABLED, CUSTOM_CLASS.BTN_DISABLED, CUSTOM_CLASS.NAV_BTN_DISABLED].indexOf(className) >= 0) {
			e.setAttribute("disabled", "");
			if (hasInputChild) {
				inputChild.attr("disabled", "");
			}
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
				// AppUtil.addClassObserver(e, function (el) {
				// 	//console.log("hey there",el.id);
				// 	inputEventAction(el, el.className);
				// });

			} catch (err) {
				console.log(err);
			}
		}
	}
}

$(document).ready(function () {
	//$("#RadioButtonGroup1_3").attr("class", "INPUT-PROTECTED");
	//$("#CheckBox1Span").attr("class", "INPUT-PROTECTED");
	// customEventHandler();

	// return;
	setInterval(function () {
		customEventHandler();
	}, 100);
});
