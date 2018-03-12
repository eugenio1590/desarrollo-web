// JavaScript Document
var num;

$(function(){
	num = $("#num");
	
	num.parent().draggable({revert: "invalid",  helper:"clone"});
	
	num.droppable({
		accept: ".value-memory",
		drop: function(event, ui) {
			var draggable = ui.draggable;
			num.val(+draggable.html());
			draggable.remove();
		}
	});
	
	$("#memory").droppable({
		accept: ".box",
		drop: function(event, ui) {
			var draggable = ui.draggable.children(".form-control");
			addValue(draggable.val());
		}
	});
});

function onValueSaved(div){
	$(div).draggable({revert: "invalid",  helper:"clone"});
}