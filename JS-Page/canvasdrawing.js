/**
 * Created by Daniel on 30.04.2016.
 */
function drawRect(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 55, 50);
};
function drawLine(ctx, x, y, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(oneLastX, oneLastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    oneLastX = x;
    oneLastY = y;
};
window.onload = function () {
    //document.getElementById("drawCanvasOne").onclick = catchClickRect;
    //setInterval(function () {
    //    catchClickRect(document.getElementById("drawCanvasOne"),null)
    //}, 3000);
    setInterval(catchClickRect, 2000, document.getElementById("drawCanvasOne"), null);
    setInterval(catchClickLine, 2000, document.getElementById("drawCanvasTwo"), null);
    rectAutomation();
    drawCanvFour();
    drawCanvFive();
    //init();

};
var oneLastX = 0;
var oneLastY = 0;
var metroColors = ["#99b433", "#00a300", "#1e7145", "#ff0097", "#9f00a7", "#7e3878", "#603cba", "#1d1d1d", "#00aba9", "#2d89ef", "#2b5797", "#ffc40d", "#e3a21a", "#da532c", "#ee1111", "#b91d47"];
function catchClickRect(context, event) {
    var canvas = document.getElementById(context.id);
    var ctx = canvas.getContext("2d");
    var color = metroColors[Math.floor((Math.random() * 15))];
    var x, y;
    if (event) {
        x = (event.pageX - $("#" + context.id).offset().left);
        y = (event.pageY - $("#" + context.id).offset().top);
    }
    else {
        x = Math.floor((Math.random() * 280) + 1);
        y = Math.floor((Math.random() * 280) + 1);
    }
    drawRect(ctx, x, y, color);
}
function catchClickLine(context, event) {
    var canvas = document.getElementById(context.id);
    var ctx = canvas.getContext("2d");
    var color = metroColors[Math.floor((Math.random() * 16))];
    var x, y;
    if (event) {
        x = (event.pageX - $("#" + context.id).offset().left);
        y = (event.pageY - $("#" + context.id).offset().top);
    }
    else {
        x = Math.floor((Math.random() * 300) + 1);
        y = Math.floor((Math.random() * 300) + 1);
    }
    drawLine(ctx, x, y, color);
}
function rectAutomation() {
    console.log("asdf");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            setTimeout(drawz(i,j), 3000);
        }
    }

}
function drawz(i, j) {
    console.log("@@@@@");
    var canvas = document.getElementById('drawCanvasThree');

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    var x = 25 + j * 50; // x coordinate
    var y = 25 + i * 50; // y coordinate
    var radius = 20; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
    var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise

    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

    if (i > 1) {
        ctx.fill();
    } else {
        ctx.stroke();

    }
}
function drawCanvFour(){
    var ctx = document.getElementById('drawCanvasFour').getContext('2d');

    // Create gradients
    var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
    radgrad.addColorStop(1, 'rgba(1,159,98,0)');

    var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
    radgrad2.addColorStop(0, '#FF5F98');
    radgrad2.addColorStop(0.75, '#FF0188');
    radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

    var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
    radgrad3.addColorStop(0, '#00C9FF');
    radgrad3.addColorStop(0.8, '#00B5E2');
    radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

    var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
    radgrad4.addColorStop(0, '#F4F201');
    radgrad4.addColorStop(0.8, '#E4C700');
    radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

    // draw shapes
    ctx.fillStyle = radgrad4;
    ctx.fillRect(0,0,150,150);
    ctx.fillStyle = radgrad3;
    ctx.fillRect(0,0,150,150);
    ctx.fillStyle = radgrad2;
    ctx.fillRect(0,0,150,150);
    ctx.fillStyle = radgrad;
    ctx.fillRect(0,0,150,150);

}
//var sun = new Image();
//var moon = new Image();
//var earth = new Image();
//function init(){
//    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
//    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
//    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
//    window.requestAnimationFrame(drawCanvFive);
//}
//function drawCanvFive(){
//
//
//
//        var ctx = document.getElementById('drawCanvasFive').getContext('2d');
//
//        ctx.globalCompositeOperation = 'destination-over';
//        ctx.clearRect(0,0,300,300); // clear canvas
//
//        ctx.fillStyle = 'rgba(0,0,0,0.4)';
//        ctx.strokeStyle = 'rgba(0,153,255,0.4)';
//        ctx.save();
//        ctx.translate(150,150);
//
//        // Earth
//        var time = new Date();
//        ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
//        ctx.translate(105,0);
//        ctx.fillRect(0,-12,50,24); // Shadow
//        ctx.drawImage(earth,-12,-12);
//
//        // Moon
//        ctx.save();
//        ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
//        ctx.translate(0,28.5);
//        ctx.drawImage(moon,-3.5,-3.5);
//        ctx.restore();
//
//        ctx.restore();
//
//        ctx.beginPath();
//        ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
//        ctx.stroke();
//
//        ctx.drawImage(sun,0,0,300,300);
//
//        window.requestAnimationFrame(drawCanvFive);
//
//
//
//}