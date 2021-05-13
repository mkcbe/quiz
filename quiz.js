function EnableDisable(txtPassportNumber) {
        var btnSubmit = document.getElementById("save");
        if (txtPassportNumber.value.trim() != "") {
            btnSubmit.disabled = false;
			$('#save').css('cursor','pointer');
        }
		else {
            btnSubmit.disabled = true;
			$('#save').css('cursor','not-allowed');
        }
    };
function next(){
	$('#next').trigger('click');
}

(function() {
  var allQuestions = [{
    question: "The tree sends downroots from its branches to the soil is know as:",
    options: ["Oak", "Pine", "Banyan", "Palm"],
    answer: 2
  }, {
    question: "Electric bulb filament is made of",
    options: ["Copper", "Aluminum", "lead", "Tungsten"],
    answer: 3
  }, {
    question: "Non Metal that remains liquid at room temprature is",
    options: ["Phophorous", "Bromine", "Clorine","Helium"],
    answer: 1
  }];
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
  var quizSpace1 = $('#quiz1');
 // var scoreSpace = $('#score1');
  var user = [];
  //localStorage.setItem("Scores", JSON.stringify(user));
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question ' + (index + 1) + '/' +(allQuestions.length)+':<br>'+
			'<progress value="'+(index+1)+'" max="'+(allQuestions.length)+'"></progress><h2>');
        element.append(header);

        var question = $('<h3><p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li id="'+i+'">');
          input = '<input type="radio" name="answer" value=' + i + ' onclick="next()"/>';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
	}
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    if(quesCounter === 1)
                    {
						$('#score').show();
						$('#score1').show();
                    } 
                    else if(quesCounter === 0)
                    {
						$('#score').show();
						$('#score1').show();
                    }
                }
              else 
                {
                    var scoreRslt = "<h1>"+displayResult1()+"</h1>";
                    quizSpace.append(scoreRslt).fadeIn();
					$('#score').hide();
					$('#score1').hide();
					$('#user').show();
					$('#save').show();
                    $('#home').show();
					$('#reattempt').show();
                }
        });
    }
  $('#start').click(function(){  
		nextQuestion();
		$('#head').hide();
		$('#score').show();
		$('#score1').show();
		$('#start').hide();
		$('#leader').hide();
		var res = displayResult1();
		document.getElementById("score1").innerHTML = '<a href="#">'+res+'</a>';
	});  
  $('#next').click(function () {
	  chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
			var x1 = '#'+selectOptions[quesCounter];
			var x2 = '#'+allQuestions[quesCounter].answer;
			if(selectOptions[quesCounter] === allQuestions[quesCounter].answer){
				$(x1).css('background','green');
				$(x1).css('color','#fff');
			}else{
				$(x1).css('background','red');
				$(x1).css('color','#fff');
				$(x2).css('background','green');
				$(x2).css('color','#fff');
			}
          quesCounter++;
		  setTimeout(function(){
			nextQuestion();
		  },500);
		  var res = displayResult1();
		  document.getElementById("score1").innerHTML = '<a href="#">'+res+'</a>';
        }
	});
  $('#leader').click(function(){
		displayLeaderBoard();
	});
  $('#save').click(function(){
		var username = document.getElementById("user").value;
		var score = displayResult1();
		updateData("Scores",user);
		var flag = 0;
		for(var i=0;i<user.length;i++){
			if(user[i][0] === username){
				if(user[i][0]<score)
					user[i][1] = score;
				flag = 1;
				break;
			}
		}
		if(flag===0)
			user.push([username,score]);
		localStorage.setItem("Scores", JSON.stringify(user));
		displayLeaderBoard();
	});
  function updateData(key,arr)
	{
		var data = JSON.parse(localStorage.getItem(key));
		for(var i = 0 ; i<data.length ; i++)
			arr.push(data[i]);
	}
  function displayLeaderBoard()
	{
		$('#head').hide();
		$('#board').show();
		$('#question').remove();
		$('#quiz').hide();
		$('#user').hide();
		$('#save').hide()
		$('#start').hide();
		$('#leader').hide();
		$('#reattempt').hide();
        $('#home').show();
		var scoreRslt = displayResult();
		quizSpace1.append(scoreRslt).fadeIn();
		
	}
  function displayResult() 
    {
		var user1 = JSON.parse(localStorage.getItem("Scores"));
		user1.sort((a,b) => a[1] - b[1]); 
		var to_show = "<h4>";
		for(var i = 0 ; i<user1.length && i<5; i++)
			to_show += user1[i][0] + ' : ' + user1[i][1] + "<br>";
		to_show +="</h4>";
		return to_show;
	}
  function displayResult1() 
    {
		var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
          if (selectOptions[i] === allQuestions[i].answer) 
            correct+=10;
		return correct;
	}
})();
