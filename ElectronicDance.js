function ElectronicDance(canvasName) {

	CommonUtils.println("Started ElectronicDance !");
	this.canvas = document.getElementById('elec-container');
	this.context = this.canvas.getContext('2d');
	this.circuit = null;
	
	var myInterval = null;
	var that = this;
	var intervalTime = 1000 / 30;
	
	this.checkCanvasAndContext();
	this.initCanvas();
	this.readCircuitTypon();

	myInterval = setInterval(function() {that.loop();}, intervalTime);
}

ElectronicDance.prototype.readCircuitTypon = function() {
	var that = this;
	var jsonReader = new JSONReader("Circuit.json", function() {
		ElectronicDance.prototype.readCircuitTyponHandler.apply(that, arguments)
	});
}

ElectronicDance.prototype.readCircuitTyponHandler = function(methodName, request) {
	CommonUtils.println("Reading Circuit Typon terminated with exit code : " + request.status);
	this.drawElectronicTypon(JSON.parse(request.response));
}

ElectronicDance.prototype.checkCanvasAndContext = function() {
	if(!this.canvas) {
		alert("Impossible de récupérer le canvas");
        return;
	}

	if(!this.context) {
		alert("Impossible de récupérer le context");
		return;
	}
}

ElectronicDance.prototype.initCanvas = function() {
	CommonUtils.print("Initialize canvas ...");
	this.canvas.width  = 800;
	this.canvas.height = 500;
	this.canvas.style.border = "1px solid #c3c3c3";
	this.canvas.style.margin = "0 auto";
	this.canvas.display = "block";
	this.canvas.style.background = "#fff";
	CommonUtils.println(" Ok");
}

ElectronicDance.prototype.drawElectronicTypon = function(circuitTypon) {
	CommonUtils.print("Drawing Electronic Typon ['" + circuitTypon.Name + "']... ");
	var circuit = circuitTypon.Circuit;
	this.setLineWidth(circuitTypon.LineWidth);
	circuit.forEach(function(circuitPart) {
		this.draw(circuitPart);
	}, this);

	CommonUtils.println("Ok");
}

ElectronicDance.prototype.draw = function(circuitPart) {
	switch(circuitPart.Shape) {
		case 'Circle':
			this.drawCircle(circuitPart.Center, circuitPart.Radius);
			break;
		case 'Line':
			this.drawLine(circuitPart.From, circuitPart.To, 'false');
			break;
		case 'Rectangle':
			this.drawRectangle(circuitPart.Start, circuitPart.Dimensions, circuitPart.Fill);
			break;
	}
}

ElectronicDance.prototype.loop = function() {
	
		
}

ElectronicDance.prototype.drawLine = function(from, to) {
	this.context.beginPath();
	this.context.moveTo(from.x, from.y);
	this.context.lineTo(to.x, to.y);
	this.context.stroke();
}

ElectronicDance.prototype.drawCircle = function(center, radius, fill) {
	this.context.beginPath();
	this.context.arc(center.x, center.y, radius,0,2*Math.PI);
	if(fill == 'true') {
		this.context.fill();
	} else {
		this.context.stroke();
	}
}

ElectronicDance.prototype.drawRectangle = function(start, dimensions, fill) {
	this.context.beginPath();
	this.context.rect(start.x, start.y, dimensions.Width, dimensions.Height);
	if(fill == 'true') {
		this.context.fill();
	} else {
		this.context.stroke();
	}
}

ElectronicDance.prototype.setLineWidth = function(width) {
	this.context.lineWidth = width;
}