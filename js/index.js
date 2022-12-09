// html 상속
window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});


$(document).ready(function(){
	$("#view_button_01").click(function(){
		if($("#main_view_content_01").is(":visible")){
			$("#main_view_content_01").css("display", "none");
		}else{
			$("#main_view_content_01").css("display", "flex");
		}
	});
});
