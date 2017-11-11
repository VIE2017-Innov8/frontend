/**
 * Created by jorrikklijnsma on 11/11/2017.
 */


$(".input").each(function(){
	var answers = $(this).find(".answer");
	var questionId = $(this).data('number');


	//set click event
	answers.each(function(){
		$(this).click(function () {
			var fieldVal = $(this).data('value');

			saveAnswer(questionId, fieldVal);

			//updateClass
			answers.each(function(){
				$(this).removeClass("active");
			});
			$(this).addClass("active");

			//set Hash
			setTimeout(function(){
				window.location.hash = "#question"+(questionId+1);
			}, 250);

		});
	});
});

var session;

function saveAnswer(questionId, fieldVal) {
    var params = {}, data = {};
    if (session) {
        params.session = session;
    }

    data[questionId] = fieldVal;

    jQuery.post("http://cerberus.hackedd.nl/vie2017/?" + jQuery.param(params), data, function (response) {
        session = response.session;
    });
}

$(window).on('hashchange',function(){
	onloadHashFunction();
});

$(document).ready(function(){
	onloadHashFunction();
});


function onloadHashFunction() {
	var currentHash = location.hash.slice(1);

	if (!currentHash) return;

	var currentId = currentHash.match(/\d+/); // 123456


	//remove current input  scale trans off by remove class active. + timeout 150ms for display:none;
	var elem = $(".input.active");
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

}
