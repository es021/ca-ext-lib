
// global in ca html text
/*
<script>
	PRINTING_FIELD = {
		PRINT_382050_1: ["T1_EF_no_permohonan"],
		PRINT_382050_2: ["T1_EF_no_permohonan"]
	}

	PRINTING_NAME = {
		PRINT_382050_1: "Laporan 1",
		PRINT_382050_2: "Laporan 2"
	};
</script>
 */

if (typeof PRINTING_FIELD === "undefined") {
	PRINTING_FIELD = {
		385010: ["no_permohonan_urusniaga"],
		PRINT_382050_1: ["T1_EF_no_permohonan"],
		PRINT_382050_2: ["T1_EF_no_permohonan"]
	};
}

if (typeof PRINTING_NAME === "undefined") {
	PRINTING_NAME = {
		385010: "Laporan 385010",
		PRINT_382050_1: "Laporan 1",
		PRINT_382050_2: "Laporan 2"
	};
}

var AppPrintingClass = function () {
	this.TRIGGER_ID = "printing_trigger";
	this.URL = "/home-webservice/print/action";
	this.registerTrigger();
};

AppPrintingClass.prototype.registerTrigger = function () {
	var trigger = $("#" + this.TRIGGER_ID);
	trigger = trigger[0];

	var obj = this;
	AppUtil.addClassObserver(trigger, function () {
		var className = trigger.className;
		if (className == "") {
			return;
		}
		obj.start(className);
		trigger.className = "";
	});
};


AppPrintingClass.prototype.start = function () {
	this.openCustomPopup();
};

AppPrintingClass.prototype.openCustomPopup = function () {
	var popupBody = document.createElement('div');
	popupBody.style.textAlign = "center";
	var br = document.createElement('br');
	var obj = this;
	for (var i in PRINTING_FIELD) {
		var reportName = PRINTING_NAME[i];
		var btn = document.createElement('button');
		btn.setAttribute("id", "PB_btn_in_popup");
		btn.setAttribute("report_id", i);
		btn.innerHTML = reportName;
		btn.style.padding = "10px 20px";
		btn.style.marginBottom = "10px";
		btn.addEventListener("click", function () {
			obj.openPrintPopup(this.getAttribute("report_id"));
		});

		popupBody.appendChild(br);
		popupBody.appendChild(btn);
	}

	CUSTOM_POPUP.openPopup("CETAKAN", popupBody, "info");
};

AppPrintingClass.prototype.createUrl = function (reportName, reportData) {
	var url = null;
	try {
		url = this.URL + "?ReportName=" + reportName + "&ReportData=" + window.encodeURI(JSON.stringify(reportData));
	} catch (err) {
		console.log("AppPrintingClass.prototype.createUrl", err);
	}
	return url;
}

AppPrintingClass.prototype.openPrintPopup = function (reportId) {
	var fieldNames = PRINTING_FIELD[reportId];

	if (typeof fieldNames === "undefined") {
		alert("Invalid printing report name '" + reportId + "'. Data for this report printing is not specified.");
		return null;
	}
	var reportData = this.getReportData(fieldNames);
	console.log(reportData);

	var target = "printingPopup_" + ((new Date()).getTime());
	var config = "width=" + screen.width + ",height=" + screen.height + ",left=300,top=100";
	var url = this.createUrl(reportId, reportData);
	window.open(url, target, config);

};

AppPrintingClass.prototype.getReportData = function (fieldNames) {
	var data = {};
	for (var x in fieldNames) {
		var fld = fieldNames[x].toString();
		var el = document.getElementsByName(fld)[0];
		if (typeof el === "undefined") {
			console.log("Field Not Found => " + fld);
			continue;
		}
		var fldValue = el.value;
		data[fld] = fldValue;
	}

	return data;
}


// AppPrintingClass.prototype.createField = function (name, value, parent) {
// 	var hiddenField = document.createElement("input");
// 	hiddenField.setAttribute("type", "hidden");
// 	hiddenField.setAttribute("name", name);
// 	hiddenField.setAttribute("value", value);
// 	parent.appendChild(hiddenField);
// };

// AppPrintingClass.prototype.openPrintPopup = function (reportId) {
// 	var fieldNames = PRINTING_FIELD[reportId];

// 	if (typeof fieldNames === "undefined") {
// 		alert("Invalid printing report name '" + reportId + "'. Data for this report printing is not specified.");
// 		return null;
// 	}
// 	var form = this.getForm(reportId, fieldNames);
// 	console.log(form);
// 	if (form !== null) {
// 		document.body.appendChild(form);
// 		var target = "printingPopup_" + ((new Date()).getTime());
// 		var config = "width=500,height=600,left=300,top=100";
// 		window.open('about:blank', target, config);
// 		form.target = target;
// 		form.submit();

// 		document.body.removeChild(form);
// 	}
// };


// AppPrintingClass.prototype.getForm = function (reportId, fieldNames) {
// 	var form = document.createElement("form");
// 	form.setAttribute("method", "post");
// 	form.setAttribute("action", this.API);

// 	//set report name
// 	this.createField("ReportName", reportId, form);

// 	//set the rest of the field
// 	for (var x in fieldNames) {
// 		var fld = fieldNames[x].toString();
// 		var fldValue = document.getElementsByName(fld)[0].value;
// 		this.createField(fieldNames[x], fldValue, form);
// 	}

// 	return form;
// }

var AppPrinting = null;
$(document).ready(function () {
	AppPrinting = new AppPrintingClass();

	// setTimeout(function () {
	// 	AppPrinting.openPrintPopup("385010");
	// }, 1000)
});
