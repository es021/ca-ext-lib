
// global in ca html text
/*
PRINTING_FIELD = {
PRINT_382050_1: ["T1_EF_no_permohonan"],
PRINT_382050_2: ["T1_EF_no_permohonan"]
}
 */

PRINTING_FIELD = {
	PRINT_382050_1: ["T1_EF_no_permohonan"],
	PRINT_382050_2: ["T1_EF_no_permohonan"]
};

var AppPrintingClass = function () {
	this.TRIGGER_ID = "printing_trigger";
	this.registerTrigger();
};

AppPrintingClass.prototype.registerTrigger = function () {
	var trigger = $("#" + this.TRIGGER_ID);
	trigger = trigger[0];

	var obj = this;
	AppUtil.addClassObserver(trigger, function () {
		
		var className = trigger.className;
		
		if (className == "NOTHING") {
			return;
		}
		console.log(className);
		//obj.currentClass = className;
		
		obj.start(className);
		trigger.className = "NOTHING";

	});
};

AppPrintingClass.prototype.createField = function (name, value, parent) {
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", name);
	hiddenField.setAttribute("value", value);
	parent.appendChild(hiddenField);
}

AppPrintingClass.prototype.start = function (reportName) {
	var fieldName = PRINTING_FIELD[reportName];

	if (typeof fieldName === "undefined") {
		alert("Invalid printing report name '" + reportName + "'");
		return;
	}
	//console.log("start printing", reportName, fieldName);

	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "http://localhost:8080/Printing/printAction.do");
	form.setAttribute("target", "_blank");

	//set report name
	this.createField("ReportName", reportName, form);

	//set the rest of the field
	for (var x in fieldName) {
		var fld = fieldName[x].toString();
		var fldValue = document.getElementsByName(fld)[0].value;
		this.createField(fieldName[x], fldValue, form);
	}
	console.log(form);
	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);

}

var AppPrinting = null;
$(document).ready(function () {
	AppPrinting = new AppPrintingClass();
});
