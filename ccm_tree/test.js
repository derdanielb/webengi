/**
 * Created by Daniel on 27.05.2016.
 */
var dragoptions = {
    cursor: 'move',

    helper: 'original',
    revert: "invalid",
    snap:".droppable",
    connectToSortable: "#sort"
};
$( document ).ready(function() {

    $('#1,#2,#3,#4,#5,#6').sortable({
        connectWith: "sort0, .sort1, .sort2, .sort3",
        revert: "invalid",
        containment : '#border',

        over: function( event, ui){
            //event.preventDefault();
            //event.stopPropagation();
            $('#'+event.target.id).addClass('overhover');
        },
        out: function(event,ui){
            //event.preventDefault();
            //event.stopPropagation();
            $('#'+event.target.id).removeClass('overhover');
        }
    }).disableSelection();
    //$('#3').draggable(dragoptions
    //
    //
    //
    //);
    //$('#1').droppable({
    //    drop: handleDropEvent,
    //    hoverClass: "drop-hover",
    //    greedy: 'true'
    //
    //});
    //$('#2').droppable({
    //    drop: handleDropEvent,
    //    hoverClass: "drop-hover",
    //    greedy: 'true'
    //});
    //$('.sort').sortable({
    //    revert: true
    //});

});
function handleDropEvent(event, ui){
    event.preventDefault();
    event.stopPropagation();
    var draggable = ui.draggable;
    console.log(event);
    console.log(ui);
    draggable.insertAfter($('#'+event.target.id).children()[0]);
    //ui.draggable.position( { of: $(this), my: 'top', at: 'bottom' } );
    //ui.draggable.removeAttr('position');
    //draggable.draggable({
    //    cursor: 'move',
    //    containment: '#1',
    //    helper: 'original'
    //});
    $('#3').draggable(dragoptions);
}
//$(function() {
//    $(".sort").sortable();
//    $(".sort").disableSelection();
//});
