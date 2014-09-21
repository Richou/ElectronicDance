function JSONReader(filename, readFunctionHandler) {

	var __callMethod;
	this.__callMethod = this.__createXmlHttpRequest();
	this.__readJsonFile(filename);
	this.func = readFunctionHandler;
}

JSONReader.prototype.__createXmlHttpRequest = function() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

JSONReader.prototype.__readJsonFile = function(jsonPath) {
	CommonUtils.print("Read file ['" + jsonPath + "'] started ... ")
	var that = this;
	this.__callMethod.open("GET", jsonPath, true);
	this.__callMethod.onreadystatechange = function(readyState, status) {
		JSONReader.prototype.__stateChangeCallback.apply(that, arguments);
	}
	this.__callMethod.send();
}

JSONReader.prototype.__stateChangeCallback = function(readyState, status) {
	var request = this.__callMethod;
	var that = this;
	if(request.readyState == 4) {
		if(request.status == 200) {
			CommonUtils.println("Ok");
			if(this.func != undefined) {
				this.func.call(that, "jsonReaderHandler", request);
			}
		} else {
			CommonUtils.println("Ko");
			CommonUtils.println("Read json file failed : " + request.statusText);
		}
	}
}