
// global in ca html text
/*
<script>
	PRINTING_FIELD = {
	PRINT_382050_1: ["T1_EF_no_permohonan"],
	PRINT_382050_2: ["T1_EF_no_permohonan"]
	}
</script>
 */

if (typeof PRINTING_FIELD === "undefined") {
	PRINTING_FIELD = {
		DUMMY: [],
		PRINT_382050_1: ["T1_EF_no_permohonan"]
	};
}
var AppPrintingClass = function () {
	this.TRIGGER_ID = "printing_trigger";
	//this.API = "/Printing/printAction.do";
	this.registerTrigger();
};

AppPrintingClass.prototype.registerTrigger = function () {
	var trigger = $("#" + this.TRIGGER_ID);
	trigger = trigger[0];

	var obj = this;
	AppUtil.addClassObserver(trigger, function () {
		console.log(className);
		var className = trigger.className;
		if (className == "") {
			return;
		}
		obj.start(className);
		trigger.className = "";
	});
};

AppPrintingClass.prototype.start = function (reportName) {
	console.log("Asda");
	var form = this.getForm(reportName);
	this.openCustomPopup(reportName);
	//return;
	document.body.appendChild(form);
	this.openPrintPopup(form);
	document.body.removeChild(form);
}

AppPrintingClass.prototype.openCustomPopup = function (reportName) {
	CUSTOM_POPUP.open("aaa","a'sda00");
	
};

AppPrintingClass.prototype.openPrintPopup = function (form) {
	var target = "printingPopup_" + ((new Date()).getTime());
	var config = "width=500,height=600,left=300,top=100";
	window.open('about:blank', target, config);
	form.target = target;
	form.submit();
};

AppPrintingClass.prototype.createField = function (name, value, parent) {
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", name);
	hiddenField.setAttribute("value", value);
	parent.appendChild(hiddenField);
}

AppPrintingClass.prototype.getForm = function (reportName) {
	var fieldName = PRINTING_FIELD[reportName];

	if (typeof fieldName === "undefined") {
		alert("Invalid printing report name '" + reportName + "'. Data for this report printing is not specified.");
		return;
	}
	//console.log("start printing", reportName, fieldName);

	// create form
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", this.API);

	//set report name
	this.createField("ReportName", reportName, form);

	//set the rest of the field
	for (var x in fieldName) {
		var fld = fieldName[x].toString();
		var fldValue = document.getElementsByName(fld)[0].value;
		this.createField(fieldName[x], fldValue, form);
	}

	return form;
}



var AppPrinting = null;
$(document).ready(function () {
	console.log("Asd");
	AppPrinting = new AppPrintingClass();
});
