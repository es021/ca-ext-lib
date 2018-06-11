function initCustomCalendar() {
	console.log("initCustomCalendar");
	var calEl = $("input[id^=tarikh]");
	//console.log(calEl);
	$.each(calEl, function (i, e) {
		addCalendar(e);
	});

	/*
	// amira's
	if (IS_LOCATION.P38_50101_1) {
	addCalendar("t1_ef_tarikh_permohonan");
	addCalendar("t1_ef_tarikh_perintah");
	}

	if (IS_LOCATION.P38_50101_3) {
	addCalendar("t3_ef_mk_TARIKH_MULA_DIPELIHARA");
	addCalendar("t3_ef_mk_TARIKH_LAHIR");
	}
	*/
	// jubli's
	/*
	if (IS_LOCATION.P38_20501_1) {
		addCalendar("tab1_ef_tarikh_permohonan");
		addCalendar("tab1_ef_tarikh_perintah");
	}*/


	function addCalendar(el) {
		try {
			//var el = document.getElementById(elemId);
			if (el != null && typeof el !== "undefined") {
				var isDisabled = el.className.indexOf("DISABLED") >= 0 || el.className.indexOf("PROTECTED") >= 0;
				// create calendar
				var width = 20;
				var left = el.style.left;

				left = AppUtil.pxOperation(el.style.width, "+", el.style.left);
				left -= width;

				var calendar = document.createElement("span");
				//calendar.setAttribute("type","date");
				//calendar.id = el.id + "_calendar";
				calendar.innerHTML = "<i class='fa fa-calendar'></i>";
				calendar.style.backgroundColor = !isDisabled ? "#1549ab" : "rgb(103, 146, 227)";
				calendar.style.color = "white";
				calendar.style.fontWeight = "bold";
				calendar.style.cursor = "pointer";
				calendar.style.zIndex = "10";
				calendar.style.width = width + "px";
				calendar.style.height = el.style.height;
				calendar.style.position = "absolute";
				calendar.style.left = left + "px";
				calendar.style.right = el.style.right;
				calendar.style.top = el.style.top;
				calendar.style.bottom = el.style.bottom;

				calendar.style.display = 'flex';
				calendar.style.alignItems = 'center';
				calendar.style.justifyContent = 'center';

				var cInput = document.createElement("input");
				//cInput.setAttribute("type","date");
				cInput.setAttribute("parentId", el.id);
				cInput.id = el.id + "_calendar";
				cInput.style.position = "absolute";
				cInput.style.cursor = "pointer";
				cInput.style.opacity = "0";
				cInput.style.left = "0px";
				cInput.style.width = width + "px";

				var picker = new Pikaday({
					field: cInput,
					format: 'D MMM YYYY',
					onOpen: function () {
						var top = AppUtil.pxOperation(picker.el.style.top, "-", "9px");
						var left = AppUtil.pxOperation(picker.el.style.left, "-", AppUtil.BODY.style.marginLeft);
						picker.el.style.left = (left + 10) + "px";
						picker.el.style.top = top + "px";
					},
					onSelect: function () {
						var parent = document.getElementById(cInput.getAttribute("parentId"));
						if (parent != null && typeof parent !== "undefined") {

							var isDisabledParent = el.className.indexOf("DISABLED") >= 0 || el.className.indexOf("PROTECTED") >= 0;
							calendar.style.backgroundColor = !isDisabledParent ? "#1549ab" : "rgb(103, 146, 227)";

							if (isDisabledParent) {
								return;
							}

							// generate date
							var date = this._d;
							var d = date.getDate();
							var m = date.getMonth() + 1;
							var y = date.getFullYear();

							if (m < 10) {
								m = "0" + m;
							}

							if (d < 10) {
								d = "0" + d;
							}

							parent.value = d + "/" + m + "/" + y;
						}
					}
				});

				/*
				cInput.addEventListener("change", function(){
				var parent = document.getElementById(cInput.getAttribute("parentId"));
				if (parent != null && typeof parent !== "undefined") {
				var isDisabledParent = el.className.indexOf("DISABLED") >= 0;
				calendar.style.backgroundColor = !isDisabledParent ? "#1549ab" : "rgb(103, 146, 227)";

				var val = this.value;	//2018-06-14
				if(val == "" || isDisabledParent){
				parent.value = "";
				return;
				}

				var valArr = val.split("-");
				var newDate = valArr[2]+"/"+valArr[1]+"/"+valArr[0];
				parent.value = newDate;
				}
				});
				 */

				calendar.appendChild(cInput);
				el.parentElement.appendChild(calendar);
			}
		} catch (err) {
			console.log("addCalendar err", err);
		}

	}
}
$(document).ready(initCustomCalendar);
//initCustomCalendar();
