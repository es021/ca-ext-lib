
var CustomPopupClass = function () {
	this.TYPE_ERR = "error";
	this.TYPE_INFO = "info";
	this.TYPE_SUCCESS = "success";

	this.closeable = true;

	this.closeHandler = function () { };

	this.elem = document.createElement('div');
	this.elem.id = "custom-popup";
	this.elem.style.display = "none";

	this.background = document.createElement('div');
	this.background.id = "cp-background";

	this.content = document.createElement('div');
	this.content.id = "cp-content";

	this.header = document.createElement('div');
	this.header.id = "cp-header";

	this.close = document.createElement('div');
	this.close.id = "cp-close";
	this.close.innerHTML = "X";

	this.body = document.createElement('div');
	this.body.id = "cp-body";

	this.content.appendChild(this.close);
	this.content.appendChild(this.header);
	this.content.appendChild(this.body);

	this.elem.appendChild(this.background);
	this.elem.appendChild(this.content);
	document.body.appendChild(this.elem);

	this.registerEvent();
};


CustomPopupClass.prototype.setCloseable = function (closeable) {
	this.closeable = closeable;
}

CustomPopupClass.prototype.openPopup = function (title, content, type) {

	if (!this.closeable) {
		this.close.style.opacity = 0;
	} else {
		this.close.style.opacity = 1;
	}

	console.log("CustomPopupClass", title, content, type);
	this.content.className = "cp-" + type;
	this.header.innerHTML = title;

	if (typeof content === "string") {
		this.body.innerHTML = content;
	} else {
		this.body.innerHTML = "";
		this.body.appendChild(content);
	}

	this.elem.style.display = "flex";
};

CustomPopupClass.prototype.closePopup = function () {
	if (!this.closeable) {
		return;
	}

	this.elem.style.display = "none";
	this.closeHandler();
}

CustomPopupClass.prototype.registerEvent = function () {
	var obj = this;

	this.close.addEventListener("click", function () {
		obj.closePopup();
	});

	this.background.addEventListener("click", function () {
		//console.log("here");
		obj.closePopup();
	});
};

var CUSTOM_POPUP = null;
$(document).ready(function () {
	CUSTOM_POPUP = new CustomPopupClass();
});

/*

//#############################################################################
//#############################################################################
// Custom Popup Modal- Show Content
function InitPopupModal() {
	var POPUP_MODAL = null;
	var CA_ID = 'GB_CUSTOM_POPUP';
	var HAS_POPUP = IS_LOCATION.P38_20501_1 || IS_LOCATION.P38_20501_8;
	var CA_CLASSES = [
		'CP_382050_T8_CETAKAN'
	];

	var CA_CLASS = null;
	var CA_ELEMENT = null;

	if (!HAS_POPUP) {
		console.log("does not have custom popup");
		return;
	}

	// generate modal content here
	function openModal(caClass) {
		var title = null;
		var content = null;
		var type = "info";

		switch (caClass) {
		case 'CP_382050_T8_CETAKAN':
			title = "CETAKAN";
			content = "this is cetakan popup content";
			break;

		default:
			title = "Invalid Popup";
			content = "Popup with className '" + caClass + "' not valid";
			type = "error";
			break;
		}
	
		POPUP_MODAL.openPopup(title, content, type);
	}

	// initialize	
	AppUtil.initAppElement("id", CA_ID, finishInitCaElement)

	function finishInitCaElement(el) {
		console.log("finishInitCaElement", el);
		CA_ELEMENT = el;
		CA_LEGEND = document.getElementById(CA_ID + "Legend");

		// initialize POPUP_MODAL CustomPopupClass
		var closeHandler = function () {
			CA_LEGEND.className = "CLOSED";
		};
		POPUP_MODAL = new CustomPopupClass(el, closeHandler);

		// add observer in legend
		var observer = new MutationObserver(function (event) {
				var caClass = CA_LEGEND.className;
				console.log("changed to ", caClass);

				if (caClass === "CLOSED") {
					return;
				}
				openModal(caClass);
			});

		observer.observe(CA_LEGEND, {
			attributes: true,
			attributeFilter: ['class'],
			childList: false,
			characterData: false
		});
	}
}

$(document).ready(InitPopupModal);
*/
//#############################################################################
//#############################################################################
// Custom Popup - To Replace alert
/*
var CUSTOM_POPUP = null;
// cannot override for alert
function alert(message) {

if (CUSTOM_POPUP == null) {
console.log("initializing Custom Popup from alert");
CUSTOM_POPUP = new CustomPopupClass();
}

var type = CUSTOM_POPUP.TYPE_ERR;
CUSTOM_POPUP.openPopup(type, message);
return;
}

window.alert = function (message) {
if (CUSTOM_POPUP == null) {
console.log("initializing Custom Popup from window.alert");
CUSTOM_POPUP = new CustomPopupClass();
}

var type = CUSTOM_POPUP.TYPE_ERR;
CUSTOM_POPUP.openPopup(type, message);
return;
}
*/
