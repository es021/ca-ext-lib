function loadAll() {
	var WAR = "ca-ext-lib";
	var VER = "v2";
	//return;
	console.log("initializing importer from " + WAR + " | version " + VER);

	var jsFile = ['jquery.min', 'pick-a-day', 'constant', 'app', 'popup', 'calendar', 'input-event', 'local-storage', 'printing'];
	var cssFile = ['app', 'font-awesome.min'];

	for (var i in jsFile) {
		var src = '/' + WAR + '/js/' + jsFile[i] + '.js?v=' + VER;
		document.write('<script type = "text/javascript" src = "' + src + '"><\/script> ');
	}

	document.write("<style>");
	for (var i in cssFile) {
		var url = '/' + WAR + '/css/' + cssFile[i] + '.css?v=' + VER;
		document.write('@import url("' + url + '"); ');
	}
	document.write("</style>")
}

loadAll();
