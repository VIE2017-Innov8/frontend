/**
 * Created by jorrikklijnsma on 11/11/2017.
 */
var questions = $(".input[data-number]").map(function() {
	return parseInt($(this).data('number'), 10);
}).get();

var questionCount = Math.max.apply(Math, questions);

console.log(questionCount);

$(".input").each(function(){
	var answers = $(this).find(".answer");
	var questionId = $(this).data('number');
	
	
	//set click event
	answers.each(function(){
		$(this).click(function () {
			var fieldVal = $(this).data('value');
			
			//update hidden field
			$(".hiddenForm").find("input[name='"+questionId+"']").val(fieldVal);
			
			//updateClass
			answers.each(function(){
				$(this).removeClass("active");
			});
			$(this).addClass("active");
			
			//set Hash and check if is last.
			setTimeout(function(){
				if ((questionId+1) != questionCount) {
					window.location.hash = "#question"+(questionId+1);
				} else {
					//GO TO RESULT PAGE
				}
			}, 250);
			
		});
	});
});


$(window).on('hashchange',function(){
	onloadHashFunction();
});

$(document).ready(function(){
	onloadHashFunction();
});


function onloadHashFunction() {
	var currentHash = location.hash.slice(1);
	var currentId = currentHash.match(/\d+/); // 123456
	
	
	//remove current input  scale trans off by remove class active. + timeout 150ms for display:none;
	var elem = $(".input.active")
	if($(elem)) {
		$(elem).removeClass('active');
		setTimeout(function(){
			$(elem).css("display", "none");
		}, 150);
	}
	
	//set current input display:block; + timeout for scale trans. add class active
	setTimeout(function(){
		$(".input[data-number="+currentId+"]").css("display" , "block");
		setTimeout(function(){
			$(".input[data-number="+currentId+"]").addClass('active');
		}, 10);
	}, 160);
	
	//set question
	var questionText = $(".input[data-number="+currentId+"]").data('question');
	$(".question h1").text("Vraag "+currentId+": "+questionText);
	
	//set previous and next btns
	
	//set progressBar
	var progress = (100 * currentId) / questionCount;
	var progressBar = $('.progress-bar');
	progressBar.css("width", progress+"%");
	progressBar.attr("aria-valuenow", progress);
};


function squareThis (element, ratio, minLimit)
{
	// First of all, let's square the element
	square(ratio, minLimit);
	
	// Now we'll add an event listener so it happens automatically
	window.addEventListener('resize', function(event) {
		square(ratio, minLimit);
	});
	
	// This is just an inner function to help us keep DRY
	function square(ratio, minLimit)
	{
		if(typeof(ratio) === "undefined")
		{
			ratio = 1;
		}
		if(typeof(minLimit) === "undefined")
		{
			minLimit = 0;
		}
		var viewportWidth = window.innerWidth;
		
		if(viewportWidth >= minLimit)
		{
			var newElementHeight = $(element).width() * ratio;
			$(element).height(newElementHeight);
		}
		else
		{
			$(element).height('auto');
		}
	}
}

squareThis('.select');

squareThis('.imgHolder');

$(".leftIcon").click(function(){
	$(this).parent(".select").removeClass("positive");
	if ($(this).parent(".select").hasClass("negative")) {
		$(this).parent(".select").removeClass("negative");
	} else {
		$(this).parent(".select").addClass("negative");
	}
});

$(".rightIcon").click(function(){
	$(this).parent(".select").removeClass("negative");
	if ($(this).parent(".select").hasClass("positive")) {
		$(this).parent(".select").removeClass("positive");
	} else {
		$(this).parent(".select").addClass("positive");
	}
});