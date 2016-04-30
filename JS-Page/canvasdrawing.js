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
    ctx.moveTo(oneLastX,oneLastY);
    ctx.lineTo(x,y);
    ctx.stroke();
    oneLastX = x;
    oneLastY = y;
};
window.onload = function () {
    //document.getElementById("drawCanvasOne").onclick = catchClickRect;
    //setInterval(function () {
    //    catchClickRect(document.getElementById("drawCanvasOne"),null)
    //}, 3000);
    setInterval(catchClickRect,2000,document.getElementById("drawCanvasOne"),null);
    setInterval(catchClickLine,2000,document.getElementById("drawCanvasTwo"),null);

};
var oneLastX = 0;
var oneLastY = 0;
var metroColors = ["#99b433", "#00a300", "#1e7145", "#ff0097", "#9f00a7", "#7e3878", "#603cba", "#1d1d1d", "#00aba9", "#2d89ef", "#2b5797", "#ffc40d", "#e3a21a", "#da532c", "#ee1111", "#b91d47"];
function catchClickRect(context, event) {
    var canvas = document.getElementById(context.id);
    var ctx = canvas.getContext("2d");
    var color = metroColors[Math.floor((Math.random() * 15) )];
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
    var color = metroColors[Math.floor((Math.random() * 16) )];
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