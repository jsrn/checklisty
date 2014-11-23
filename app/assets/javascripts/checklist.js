$(function(){
	$(document).on("blur", "#checklist li", persistChecklist);

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
		data:    { list_json: checklistJSON }
	})
}

function getChecklistJSON() {
	var array = jQuery('#checklist li').map(function(){
		return $(this).text();
	}).get();

	return JSON.stringify(array);
}

function addNewItem() {
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
		if ($("li").length != 1) {
			item.remove();
		}
	}
}