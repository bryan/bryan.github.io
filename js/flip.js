var text = ["a wonderful", "an excellent","a fabulous","a terrific", "an amazing", "a positive", "a marvelous", "a spectacular", "an exceptional", "an astounding", "a phenomenal", "a superb", "a remarkable", "an awesome"];
var index = 0;

$("#flip").hide();

setInterval(function(){
    $("#flip").stop().slideUp(1000,function(){
    	$(this).html(text[index]);
        index++;

    	if (index == text.length) {
        	index = 0;
    	};

        $(this).slideDown(1000);
    });
},3000);