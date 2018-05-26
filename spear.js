function displayCanvas(){
    var canvasHTML = document.getElementById('myCanvas');
    var contextHTML = canvasHTML.getContext('2d');

    //Расчет координат центра и радиуса
    var radiusClock = canvasHTML.width/2 - 10;
    var xCenterClock = canvasHTML.width/2;
    var yCenterClock = canvasHTML.height/2;

    //Очистка экрана
    contextHTML.fillStyle = "rgba(0,0,0,0)";
    contextHTML.clearRect(0, 0, canvasHTML.width, canvasHTML.height);
    contextHTML.fillRect(0, 0, canvasHTML.width,canvasHTML.height);

    //Рисуем стрелки
    var lengthSeconds = radiusClock;
    var d = new Date();                //Получаем экземпляр даты
    var t_sec = 6*d.getSeconds();      //Определяем угол для секунд

    //Рисуем секунды
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.moveTo(xCenterClock, yCenterClock);
    contextHTML.lineTo(xCenterClock + lengthSeconds*Math.cos(Math.PI/2 - t_sec*(Math.PI/180)),
				yCenterClock - lengthSeconds*Math.sin(Math.PI/2 - t_sec*(Math.PI/180)));
    contextHTML.stroke();
    contextHTML.closePath();

    //Рисуем центр
    contextHTML.beginPath();
    contextHTML.strokeStyle =  "#000000";
    contextHTML.fillStyle = "#ffffff";
    contextHTML.lineWidth = 3;
    contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2*Math.PI, true);
    contextHTML.stroke();
    contextHTML.fill();
    contextHTML.closePath();

    return; // ?
}


window.onload = function(){
    window.setInterval(
	function(){
		displayCanvas();
	}
    , 1000);
}
