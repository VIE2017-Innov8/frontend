/**
 * Created by jorrikklijnsma on 11/11/2017.
 */


$(".input").each(function(){
	var answers = $(this).find(".answer");
	var questionId = $(this).data('number');
	var questionText = $(this).data('question');
	
	
	//set click event
	answers.each(function(){
		$(this).click(function () {
			console.log($(".hiddenForm").find("input[name='"+questionId+"']"))
			var fieldVal = $(this).data('value');
			
			//update hidden field
			$(".hiddenForm").find("input[name='"+questionId+"']").val(fieldVal);
		});
	});
});
