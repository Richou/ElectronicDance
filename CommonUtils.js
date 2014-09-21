function CommonUtils() {
	
}

CommonUtils.println = function(message) {
	this.console = document.getElementById('console');
	this.console.innerHTML += message + "<br />";
}

CommonUtils.print = function(message) {
	this.console = document.getElementById('console');
	this.console.innerHTML += message;
}