$(function(){

//Set Variables
	var player;
	var detectiveImage = '<img id="detectiveIcon" src="http://www.clker.com/cliparts/1/y/f/S/A/q/male-detective-hi.png">';
	var thiefImage = '<img id="thiefIcon" src="http://www.clker.com/cliparts/f/E/g/Y/O/w/travis-md.png">';
	var thiefLocation;
	var detectiveLocation;
	var tubeSigns = [($('#waterlooIcon')), ($('#bakerlooIcon')), ($('#victoriaIcon')), ($('#hammersmithlooIcon')), ($('#metropolitanlooIcon'))];
	var checkDetective = $('#currentDetective');
	var checkThief = $('#currentThief');
	var lines = {'bakerloo': 'rgb(137,78,36)', 'hammersmith': 'rgb(215,153,175)', 'metropolitan': 'rgb(117,16,86)', 'victoria': 'rgb(0,160,226)', 'waterloo': 'rgb(118,208,189)'};

//Intro Directions
	$(window).load(function(){
		$('#welcome').typed({
        strings: ['Thief! You were caught in the act.',
        'The police are on your tail.',
        'Can you escape on the underground?',
        'Elude the detective for two minutes to win the game!', 
        "Detective, you've lost your map.", 
        'Use your knowledge of the London underground to head off the thief and win the game!',
        'To travel, make sure you are on the right line.',
        'Then select the where you want to go.',
        'Start Game'],
   		typeSpeed: 7,
        backDelay: 1000,
        contentType: 'text'
		})
	});

//Start Game	
	$('#welcome').on('click', function(){
		$('#intro').hide();
		$('#tubelines').show();
		$('#gameboard').show();
		detectiveLocation = $('#yeOldCheshireCheese');
		thiefLocation = $('#bigBen');
		$('#currentDetective').text(detectiveLocation.text());
		$('#currentThief').text(thiefLocation.text());
		detectiveLocation.hide();
		thiefLocation.hide();
		detectiveLocation.parent().append(detectiveImage);
		thiefLocation.parent().append(thiefImage);
		player = 'detective';
		$('#gametimer').timer({
				    duration: '2m00s',
				    callback: function() {
						$('#tubelines').hide();
						$('#gameboard').hide();
						$('#gameover').show();
						$('#winner').typed({
					        strings: ['Congratulations Thief, you got away!',
					        'New Game?'],
					   		typeSpeed: 7,
					        backDelay: 1000,
					        contentType: 'text'
						});
					}
				});
		$('#currentThief').addClass('notactive');
	});

// Mouseover Change Color
	var changeColor = function(line,color){
		$('.middle.'+line).css('background-color', color);
		$('.left.'+line).css('border-right', '30px solid ' + color);
		$('.right.'+line).css('border-left', '30px solid ' + color);
	}

	$('#tubelines h1').on('mouseover', function(){
		for (var key in lines){
				var obj = lines[key];
				if ($(this).hasClass(key)){
					changeColor(key, obj)
				}
			}
	});
	$('#tubelines h1').on('mouseout', function(){
		for (var key in lines){
			var obj = lines[key];
			if ($(this).hasClass(key)){
				changeColor(key, 'black')
			}
		}
	});

//To Change Line & Make Player Location Color Match Line
	var changeLine = function(line){
		if (player === 'thief' && thiefLocation.hasClass(line)){
			thiefLine = line;
			for (var key in lines){
				var obj = lines[key];
				if (thiefLine === key){
					$('#currentThief').css('color', obj);
					$('#location').text("That line doesn't stop here!").css('color', 'white');
				};
			};
		} else if (player === 'detective' && detectiveLocation.hasClass(line)){
			detectiveLine = line;
			for (var key in lines){
				var obj = lines[key];
				if (detectiveLine === key){
					$('#currentDetective').css('color', obj);
					$('#location').text("That line doesn't stop here!").css('color', 'white');
				};
			};
		} else {
				$('#location').css('color', 'black');
			};
	};
	$('#tubelines h1').on('click', function(){
		for (var key in lines){
			var obj = lines[key];
			if ($(this).hasClass(key)){
				changeLine(key)
			}
		}
	});

//Show Location Of Mouseover Hex In Player Info
	$('.middle p').on('mouseover', function(){
		$('#location').text($(this).text()).css('color', 'black');
	});
	$('.middle').on('mouseout', function(){
		$('#location').text("That line doesn't stop here!").css('color', 'white');
	});

//Check If the Detective Caught the Thief
	var thiefCaught = function(){
		if (checkDetective.text() === checkThief.text()){
			$('#tubelines').hide();
			$('#gameboard').hide();
			$('#gameover').show();
			$('#winner').typed({
		        strings: ['Congratulations Detective, you caught the thief!',
		        'New Game?'],
		   		typeSpeed: 7,
		        backDelay: 1000,
		        contentType: 'text'
				});
		};
	};

//Player Moves
	$('.middle').on('click', function(){
		if (player === 'thief'){
			if ($(this).children().hasClass(thiefLine) && thiefLocation.hasClass(thiefLine)){
				thiefLocation.siblings().remove();
				thiefLocation.show();
				thiefLocation = $(this).children();
				$('#currentThief').text($(this).text());
				thiefCaught();
				thiefLocation.hide();
				$(this).append(thiefImage);
				player = 'detective';
				$('#currentThief').addClass('notactive');
				$('#currentDetective').removeClass('notactive');
				$('#gametimer').timer('resume');
			}
		} else if (player === 'detective'){
			$('#gametimer').timer('resume');
			$('#currentDetective').addClass
			if ($(this).children().hasClass(detectiveLine) && detectiveLocation.hasClass(detectiveLine)){
				detectiveLocation.siblings().remove();
				detectiveLocation.show();
				detectiveLocation = $(this).children();
				$('#currentDetective').text($(this).text());
				thiefCaught();
				detectiveLocation.hide();
				$(this).append(detectiveImage);
				player = 'thief';
				$('#currentThief').removeClass('notactive');
				$('#currentDetective').addClass('notactive');
				$('#gametimer').timer('pause');
			}
		}
	});

//New Game
	$('#winner').on('click', function(){
		location.reload();
	});

}); //End of Document Listen
