/**
 * Created by Daniel on 30.04.2016.
 */
function drawRect(ctx, x , y, color){
    ctx.fillStyle = color;
    ctx.fillRect (x, y, 55, 50);
};
window.onload = function () {
    //document.getElementById("drawCanvasOne").onclick = catchClick;

};
var oneLastX = 0;
var oneLasty= 0;
var metroColors = ["#99b433","#00a300","#1e7145","#ff0097","#9f00a7","#7e3878","#603cba","#1d1d1d","#00aba9","#eff4ff","#2d89ef","#2b5797","#ffc40d","#e3a21a","#da532c","#ee1111","#b91d47"];
function catchClick(event, context){
    var x = (event.pageX - $("#"+context.id).offset().left);
    var y = (event.pageY - $("#"+context.id).offset().top);
    var canvas = document.getElementById(context.id);
    var ctx = canvas.getContext("2d");
    var color = metroColors[Math.floor((Math.random() * 16) + 1)];
    drawRect(ctx, x, y, color);
}