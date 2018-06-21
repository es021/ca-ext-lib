function customLocalStorage() {
	var LS_AUTH = "JPN-LOCAL-STORAGE-AUTH";
	var INTERVAL_TIME = 100;

	function setLocalStorage() {
		var tempLS = localStorage.getItem(LS_AUTH);
		if (tempLS == null || typeof tempLS === "undefined" || tempLS == "{}") {
			var a = `{"login_time":1526865746,"authenticated":true,"user":{"BRANCH_CODE":"16011011","PC_ID":"031","OPER_ID":"TEST"}}`;
			localStorage.setItem(LS_AUTH, a);
		}
	}

	function setDefaultValue(obj) {
		// only in amira's page
		if (IS_LOCATION.P38_50101_1 || IS_LOCATION.P38_48501_1) {
			var inputPejabat = "";
			var inputNoPerm = "";

			if (IS_LOCATION.P38_50101_1) {
				inputNoPerm = "t1_ef_no_permohonan";
				inputPejabat = "t1_lb_pej_daftar";
			}

			if (IS_LOCATION.P38_48501_1) {
				inputNoPerm = "no_permohonan_urusniaga";
				inputPejabat = "Pejabat_Kutipan";
			}

			try {
				setNewApplicationNo(inputNoPerm, obj.user.BRANCH_CODE, obj.user.PC_ID);
			} catch (err) {
				console.log("setNewApplicationNo err", err);
			}

			try {
				setPejabatPendaftaran(inputPejabat, obj.user.BRANCH_CODE);
			} catch (err) {
				console.log("setPejabatPendaftaran err", err);
			}
		}
	}

	function getLocalStorage() {
		var obj = localStorage.getItem(LS_AUTH);
		if (obj !== null) {
			obj = JSON.parse(obj);

			setValue('PC_ID', obj.user.PC_ID);
			setValue('BRANCH_CODE', obj.user.BRANCH_CODE);
			setValue('OPER_ID', obj.user.OPER_ID);

			setDefaultValue(obj);
		}
	}


	function setNewApplicationNo(elemId, cawangan, pcid) {
		console.log("setNewApplicationNo", cawangan, pcid);
		var d = new Date();
		var noPermohonan = cawangan + '-' + d.getFullYear() + '' + ('0' + (d.getMonth() + 1)).slice(-2) + '' + ('0' + d.getDate()).slice(-2)
			+ '-' + ('0' + d.getHours()).slice(-2) + '' + ('0' + d.getMinutes()).slice(-2) + '' + ('0' + d.getSeconds()).slice(-2) + '-' + pcid.slice(-2);
		setValue(elemId, noPermohonan);
	}


	function setValueAction(el, elemVal) {
		el.value = elemVal;
		el.setAttribute("disabled", "");
		el.setAttribute("value", elemVal);
	}

	function setValue(elemId, elemVal) {
		var interval = setInterval(function () {
			try {
				var el = document.getElementById(elemId);
				//var el = document.getElementsByClassName(elemId)[0];
				if (el != null && typeof el !== "undefined") {
					setValueAction(el, elemVal);
					//clearInterval(interval)
				}
			} catch (err) {
				console.log("setValue err", err);
			}

		}, INTERVAL_TIME);
	}

	var cawanganSelectIndex = null;
	function setPejabatPendaftaran(elemId, cawangan) {
		console.log("setPejabatPendaftaran", elemId, cawangan);
		var interval = setInterval(function () {
			try {
				var el = document.getElementById(elemId);
				if (el != null && typeof el !== "undefined") {

					if (cawanganSelectIndex == null) {
						for (var i = 0; i < el.length; i++) {
							var val = el[i].text;
							valArr = val.split("-");

							if (typeof valArr[0] === "string") {
								var cawanganCode = valArr[0].trim();
								if (cawangan == cawanganCode) {
									cawanganSelectIndex = i;
								}
							}
						}
					}

					if (cawanganSelectIndex != null) {
						el.selectedIndex = cawanganSelectIndex;
					}

					clearInterval(interval);
				}
			} catch (err) {
				console.log("setValue setPejabatPendaftaran err", err);
			}
		}, INTERVAL_TIME);
	}

	try {
		setLocalStorage();
	} catch (err) {
		console.log("error setLocalStorage", err);
	}
	try {
		getLocalStorage();
	} catch (err) {
		console.log("error getLocalStorage", err);
	}
}

$(document).ready(customLocalStorage);

