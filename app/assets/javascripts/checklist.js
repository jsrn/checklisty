$(function(){
	$(document).on("click", "#checklist li", persistChecklist);

	$(document).on("keypress", "#checklist li", function(e) {
		if (e.which == 13) {
			addNewItem();
		}
		if (e.which == 8) {
			checkDelete();
		}
	});
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

function addNewItem() {
	var currentItem = $("li:focus");
	//$("<li/>")
	//	.prop("contenteditable", true)
	//	.appendTo("#checklist")
	//	.focus();

	$("<li/>")
		.prop("contenteditable", true)
		.insertAfter("li:focus")
		.focus();

	removeAllNewLines();
	removeEmpties();
}

function removeAllNewLines() {
	$("li").each(function(){
		var text = $(this).text();
		text = text.replace("\n", "");
		$(this).text(text);
	});
}

function removeEmpties() {
	$("li").each(function(){
		var text = $(this).text();
		if (text == "" && !$(this).is(":focus")) {
			$(this).remove();
		}
	});
}

function checkDelete() {
	var item = $("li:focus");
	if (item.text() == "") {
		console.log(item);
		item.prev("li").focus();
		item.remove();
	}
}