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

// BEST 부분 온/오프
$(document).ready(function(){
	$("#view_button_01").click(function(){
		if($("#main_view_content_01").is(":visible")){
			$("#main_view_content_01").css("display", "none");
		}else{
			$("#main_view_content_01").css("display", "flex");
		}
	});
});


// 품목, 브랜드 온/오프
function brandOn(){
    console.log("brandOn 클릭")
    if($("#nav_main_brand_right").is(":visible")){
        // 브랜드 오프
        $("#nav_main_brand_right").css("display", "none");
        $("#nav_main_bt_right").css("background-color", "#ffffff");
        $("#nav_main_bt_right").css("color", "#000000");

        $("#nav_main_category_left").css("display", "flex");
        $("#nav_main_bt_left").css("background-color", "#000000");
        $("#nav_main_bt_left").css("color", "#ffffff");
    }else{
        // 브랜드 온
        $("#nav_main_brand_right").css("display", "flex");
        $("#nav_main_bt_right").css("background-color", "#000000");
        $("#nav_main_bt_right").css("color", "#ffffff");

        $("#nav_main_category_left").css("display", "none");
        $("#nav_main_bt_left").css("background-color", "#ffffff");
        $("#nav_main_bt_left").css("color", "#000000");
    }
}

// 품목, 브랜드 온/오프
function categoryOn(){
    console.log("categoryOn 클릭")
    if($("#nav_main_category_left").is(":visible")){
        // 카테고리 오프
        $("#nav_main_category_left").css("display", "none");
        $("#nav_main_bt_left").css("background-color", "#ffffff");
        $("#nav_main_bt_left").css("color", "#000000");

        $("#nav_main_brand_right").css("display", "flex");
        $("#nav_main_bt_right").css("background-color", "#000000");
        $("#nav_main_bt_right").css("color", "#ffffff");
    }else{
        // 카테고리 온
        $("#nav_main_category_left").css("display", "flex");
        $("#nav_main_bt_left").css("background-color", "#000000");
        $("#nav_main_bt_left").css("color", "#ffffff");

        $("#nav_main_brand_right").css("display", "none");
        $("#nav_main_bt_right").css("background-color", "#ffffff");
        $("#nav_main_bt_right").css("color", "#000000");
    }
}