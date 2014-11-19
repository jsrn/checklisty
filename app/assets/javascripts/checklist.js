$(function(){
	$(document).on("click", "#checklist li", persistChecklist);
});

function persistChecklist() {
	var checklistJSON = getChecklistJSON();

	var currentToken = window.location.href.split("/").pop();

	$.ajax({
		type:    "PATCH",
		url:     "/checklist/" + currentToken,
		data:    { list_json: checklistJSON },
		success: function(response) {

		}
	})
}

function getChecklistJSON() {
	var array = jQuery('#checklist li').map(function(){
		return $(this).text();
	}).get();

	return JSON.stringify(array);
}