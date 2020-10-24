$("ul").on("click","li" ,function() {
$(this).toggleClass("completed");
});

$("ul").on("click","span",function(e) {
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	e.stopPropagation();
});
function appendTaskToList(todoText) {
      $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText+ "</li>")
};
if (localStorage['todos']) {
    var todos = JSON.parse(localStorage['todos']);
}else {
    var todos = [];
}

for(var i=0;i<todos.length;i++) {
    appendTaskToList(todos[i]);
}

var addTask = function(){
    // get value from #name input
    var todoText = $('#name').val();
    
    // add the task to the array
    todos.push(todoText);
    
    // save to local storage
    localStorage["todos"] = JSON.stringify(todos);
    
    // append the name to the list
    appendTaskToList(todoText);
    
    // reset the input field and focus it.
    $('#name').val("");
}
$('#name').keyup(function(e){
    if (e.keyCode === 13) {
        addTask();
    }
});
$(".fa-plus").click(function() {
	$("input[type='text']").fadeToggle()
});
