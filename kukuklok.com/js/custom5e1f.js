
$(function(){

    console.log( "ready!" );

	alarmHours = 0;
	alarmMinutes = 0;


	var index = 0;
	var audios = [ 'cock', 'clock', 'electronic', 'guitar', 'military', 'alien' ];
	var numberOfSounds = audios.length;
	var audioDurations = [ 7900, 5500, 3600, 4500, 8200, 13245 ];

	var buttonPressCounter = 0;
	var soundPlaying = false;
	var alarmActive = false;
	var alarmSet = false;
	var previewPlaying = false;
	var keyPressActiveDigit = "hoursFirst"; //init set alarm by entering number keys

function clearButtonInterval(){
	if (typeof buttonPressInterval !== 'undefined') {
		clearInterval(buttonPressInterval);
	}	
}		

$('#button_plus_hour').mousedown(function() {
	buttonPressCounter = 0;
	hourPlus();
	buttonPressInterval = setInterval(function(){ hourPlus() }, 80);
});
function hourPlus(){
	if(buttonPressCounter>3 || buttonPressCounter==0){
		alarmHours++;
		if (alarmHours > 23) alarmHours = 0;
		updateAlarmTimeDisplay();
		console.log( "alarm Hours:" + alarmHours);
	}
	buttonPressCounter++;
}
$('#button_plus_hour').mouseup(function() {
	clearButtonInterval();
});
$('#button_plus_hour').mouseleave(function() {
	clearButtonInterval();
});

$('#button_minus_hour').mousedown(function() {
	buttonPressCounter = 0;
	hourMinus();
	buttonPressInterval = setInterval(function(){ hourMinus() }, 80);
});
function hourMinus(){
	if(buttonPressCounter>3 || buttonPressCounter==0){
		alarmHours--;
		if (alarmHours < 0)	alarmHours = 23;
		console.log( "alarm Hours:" + alarmHours);
		updateAlarmTimeDisplay();
	}
	buttonPressCounter++;
}
$('#button_minus_hour').mouseup(function() {
	clearButtonInterval();
});
$('#button_minus_hour').mouseleave(function() {
	clearButtonInterval();
});

$('#button_plus_min').mousedown(function() {
	buttonPressCounter = 0;
	minPlus();
	buttonPressInterval = setInterval(function(){ minPlus() }, 80);
});
function minPlus(){
	if(buttonPressCounter>3 || buttonPressCounter==0){
		alarmMinutes++;
		if (alarmMinutes > 59) alarmMinutes = 0;
		updateAlarmTimeDisplay();
	}
	buttonPressCounter++;
}
$('#button_plus_min').mouseup(function() {
	clearButtonInterval();
});
$('#button_plus_min').mouseleave(function() {
	clearButtonInterval();
});

$('#button_minus_min').mousedown(function() {
	buttonPressCounter = 0;
	minMinus();
	buttonPressInterval = setInterval(function(){ minMinus() }, 80);
});
function minMinus(){
	if(buttonPressCounter>3 || buttonPressCounter==0){
		alarmMinutes--;
		if (alarmMinutes < 0) alarmMinutes = 59;
		updateAlarmTimeDisplay();

	}
	buttonPressCounter++;
}
$('#button_minus_min').mouseup(function() {
	clearButtonInterval();
});
$('#button_minus_min').mouseleave(function() {
	clearButtonInterval();
});



function updateAlarmTimeDisplay() {
		//update digits. if digit is number 1, move container to the left because the font is fucked up.
		dateChar=Math.floor(alarmHours/10);
		$('#hours_one').text(dateChar);
		if(dateChar == "1") $('#hours_one').css({left:50 });
		else $('#hours_one').css({left:42 });
		dateChar=alarmHours%10;
		$('#hours_two').text(dateChar);
		if(dateChar == "1") $('#hours_two').css({left:94 });
		else $('#hours_two').css({left:86 });
		dateChar=Math.floor(alarmMinutes/10);
		$('#minutes_one').text(dateChar);
		if(dateChar == "1") $('#minutes_one').css({left:158 });
		else $('#minutes_one').css({left:150 });
		dateChar=alarmMinutes%10;
		$('#minutes_two').text(dateChar);
		if(dateChar == "1") $('#minutes_two').css({left:204 });
		else $('#minutes_two').css({left:196 });
		
}

mainDeviceInterval = setInterval(function(){ mainClockInterval() }, 1000);
function mainClockInterval(){
	var d = new Date();
	var timeHours = d.getHours();
	var timeMinutes = d.getMinutes();
	var timeSeconds = d.getSeconds();
	$('#current_time span').text(timeToString(timeHours)+ ":" + timeToString(timeMinutes) + ":" + timeToString(timeSeconds));
}
function timeToString(number){
	if(number<10){
		numberString = "0" + number.toString();
	}
	else{
		numberString = number.toString();
	}
	return numberString;
	//return 10;
}

function setAlarm(){
	alarmSet = true;
	checkAlarmInterval = setInterval(function(){ alarmInterval() }, 1000);
	
	$('#set_alarm_button').fadeOut('fast', function() {
		$('#alarm_start').fadeOut('fast', function () {
			$('#alarm_set').fadeIn('fast', function () {
			});
		});
	});
	$('#button_preview_stop').trigger( "click" );
	$('#button_theme_night').trigger( "click" );
	//stopAudio();	
	//disable all buttons using these invisible overlay boxes over both panels
	$("#select_time_overlay").show();
	$("#select_sound_overlay").show();
	
	// play sound very shortly just to enable sound on mobile browsers
	// mobile browsers require click at the same time as audio play to work (only first time)
	playShortly();
	
}

function alarmInterval(){
	var checkTime = new Date();
	var hours = checkTime.getHours();
	var minutes = checkTime.getMinutes();
	console.log( "hoursNow:" + hours);
	console.log( "minutesNow:" + minutes);
	if ((hours == alarmHours) && (minutes == alarmMinutes)){
		//time for alarm!!
		alarmActive = true;
		$('#alarm_set').fadeOut('fast', function() {
			$('#alarm_start').fadeIn('fast', function () {
			});
		});
		$('#button_theme_day').trigger( "click" );
		startAudio();
		clearInterval(checkAlarmInterval);
	}
}

	$('#set_alarm_button').click(function(){
		setAlarm();
		setCookie("hours", alarmHours, 365);
		setCookie("minutes", alarmMinutes, 365);
		setCookie("index", index, 365);
	});

	$('#cancel_button').click(function(){
		alarmSet = false;
		clearInterval(checkAlarmInterval);
		stopAudio();

		$('#alarm_set').fadeOut('fast', function() {
			$('#alarm_start').fadeOut('fast', function () {
				$('#set_alarm_button').fadeIn('fast', function () {				
				});
			});
		});
		$('#button_theme_day').trigger( "click" );
		$("#select_time_overlay").hide();
		$("#select_sound_overlay").hide();

	});
	$('#stop_alarm_button').click(function(){
		alarmSet = false;
		alarmActive = false;
		stopAudio();

		$('#alarm_set').fadeOut('fast', function() {
			$('#alarm_start').fadeOut('fast', function () {
				$('#set_alarm_button').fadeIn('fast', function () {				
				});
			});
		});
		
		$("#select_time_overlay").hide();
		$("#select_sound_overlay").hide();

	});


	$('#snooze_button').click(function(){
		alarmActive = false;
		//find out what the time is, add 10 mins more and set alarm
		var timeNow = new Date();
		var hours = timeNow.getHours();
		var minutes = timeNow.getMinutes();
		alarmHours = hours;
		alarmMinutes = minutes+10;
		if (alarmMinutes>59){
			alarmMinutes = alarmMinutes-60;
			alarmHours = alarmHours+1;
			if(alarmHours>23){
				alarmHours=0;
			}
		}

		setAlarm();
		stopAudio();
		updateAlarmTimeDisplay();
	});



	$('#choose_sound_left').click(function() {
		stopAudio();
		if (index <= 0) {
	    	index = numberOfSounds - 1; // cycle backwards to the last image
	  	} else {
	    	index--;
	  	}
	  	console.log( index );
		$('.sound_container').hide();
		$('#sound_' + audios[index]).show();
		$('#preview_sound').show();
		$('#preview_stop').hide();
	});

	$('#choose_sound_right').click(function() {
		stopAudio();
		if (index == numberOfSounds-1) {
	    	index = 0; // cycle backwards to the last image
	  	} else {
	    	index++;
	  	}
	  	console.log( index );
		$('.sound_container').hide();
		$('#sound_' + audios[index]).show();
		$('#preview_sound').show();
		$('#preview_stop').hide();
	});



	$('#button_preview_sound').click(function(e) {
		previewPlaying = true;
		e.preventDefault();
		$('#preview_sound').hide();
		$('#preview_stop').show();
		startAudio();
		return false;
	});

	$('#button_preview_stop').click(function(e) {
		previewPlaying = false;
		e.preventDefault();
		$('#preview_sound').show();
		$('#preview_stop').hide();
		stopAudio();
		return false;
	});

	function stopAudio() {
		if(soundPlaying){
			document.getElementById('audio_' + audios[index]).pause();
			document.getElementById('audio_' + audios[index]).currentTime = 0;
			soundPlaying = false;
		}
	}

	function startAudio() {
		 if(!soundPlaying){
			document.getElementById('audio_' + audios[index]).play();
			soundPlaying = true;
		}
	}
	function playShortly(){
		document.getElementById('audio_' + audios[index]).play();
		setTimeout(function(){ 
			document.getElementById('audio_' + audios[index]).pause();
			document.getElementById('audio_' + audios[index]).currentTime = 0; 
		}, 10);
	}

	function preload(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	        $('<img/>')[0].src = this;
	    });
	}

	preload([
	    'images/sound_cock.png',
	    'images/sound_classic.png',
	    'images/sound_electronic.png',
	    'images/sound_guitar.png',
	    'images/sound_military.png',
	    'images/sound_alien.png'
	]);

	function isiOS(){
	    return (
	        (navigator.platform.indexOf("iPhone") != -1) ||
	        (navigator.platform.indexOf("iPad") != -1) ||
	        (navigator.platform.indexOf("iPod") != -1)
	    );
	}
	if(isiOS()){
	   //alert('iOS detected');
	   //$('#iosdisclaimer').show();
	   //$('#application').hide();
	}

	$('#button_theme_night').click(function() {
		$('#nightwrapper').animate({opacity: 1}, "slow");
		$('#wake_me_up_text').animate({color: '#aaa'});
		$('#with_sound_text').animate({color: '#aaa'});
		$('#title').animate({color: '#aaa'});
		$('#alarm_set_text').animate({color: '#aaa'});
		$('#wakeup').animate({color: '#aaa'});
		$('#or').animate({color: '#aaa'});
		$('.fbheadline').animate({color: '#aaa'});
		$('#button_theme_night').hide();
		$('#button_theme_day').show();
	});
	$('#button_theme_day').click(function() {
		$('#nightwrapper').animate({opacity: 0}, "slow");
		$('#wake_me_up_text').animate({color: '#333'});
		$('#with_sound_text').animate({color: '#333'});
		$('#title').animate({color: '#434343'});
		$('#alarm_set_text').animate({color: '#333'});
		$('#wakeup').animate({color: '#333'});
		$('#or').animate({color: '#333'});
		$('.fbheadline').animate({color: '#aaa'});
		$('#button_theme_night').show();
		$('#button_theme_day').hide();
	});
	//use number keys to set the alarm
	$(document).keypress(function(e) {
		if(alarmSet == false){
	   		if (( e.which >= 48 && e.which <=57) || ( e.which >= 96 && e.which <=105) ){
	   		 	var numberPress = Number(String.fromCharCode(e.which));

	        	//if key pressed is between 0 and 9 (either regular or numpad) then check other stuff
	        	if(keyPressActiveDigit == "hoursFirst"){
	        		if (numberPress <= 2){
	        			//set the alarm to 00:00 first
	        			alarmHours = 0;
	   		 			alarmMinutes = 0;
	   		 			updateAlarmTimeDisplay();
	   		 			//now set the digit
	   		 			alarmHours = numberPress*10;
	   		 			updateAlarmTimeDisplay();
	   		 			keyPressActiveDigit = "hoursSecond";

	        		}
	        	}
	        	else if(keyPressActiveDigit == "hoursSecond"){
	        		var firstChar=Math.floor(alarmHours/10);
	        		if(firstChar == 1 || firstChar == 0){
	        			alarmHours = 10*firstChar + numberPress;
	        		}
	        		if(firstChar == 2){
	        			if(numberPress<=3){
	        				alarmHours = 10*firstChar + numberPress;
	        			}
	        		}

	        		updateAlarmTimeDisplay();
	   		 		keyPressActiveDigit = "minutesFirst";
	        	}
	        	else if(keyPressActiveDigit == "minutesFirst"){
	        		if(numberPress<=5){
	        			alarmMinutes = numberPress*10;
	   		 			updateAlarmTimeDisplay();
	   		 			keyPressActiveDigit = "minutesSecond";

	        		}
	        	}
	        	else if(keyPressActiveDigit == "minutesSecond"){
	        		var firstChar=Math.floor(alarmMinutes/10);
	        		alarmMinutes = 10*firstChar + numberPress;
	        		updateAlarmTimeDisplay();
	        		keyPressActiveDigit = "hoursFirst";
	        	}
	        }

        }
	});
	$(document).keypress(function(e) {
		// use enter to set alarm
		if(alarmSet == false && e.which == 13){
			$('#set_alarm_button').trigger( "click" );
		}
	});
	$(document).keypress(function(e) {
		// use space to snooze alarm
   		 if ( e.which == 32 && alarmActive == true){
        	$('#snooze_button').trigger( "click" );
        }
	});

	$(document).keydown(function(e) {
		// use escape to cancel alarm. escpe works only with keydown
		if(alarmSet == true && e.which == 27){
			$('#cancel_button').trigger( "click" );
		}
	});

	$(document).keydown(function(e) {
		// use S to stop alarm. 
		if(alarmActive == true && e.which == 83){
			$('#stop_alarm_button').trigger( "click" );
		}
	});

	$(document).keydown(function(e) {
		// use right arrow to browse sounds
		if(alarmSet == false && e.which == 39){
			$('#choose_sound_right').trigger( "click" );
		}
	});
	$(document).keydown(function(e) {
		// use left arrow to browse sounds
		if(alarmSet == false && e.which == 37){
			$('#choose_sound_left').trigger( "click" );
		}
	});
	$(document).keydown(function(e) {
		// use P to preview a sound
		if(alarmSet == false && e.which == 80){
			if(previewPlaying == false){
				$('#button_preview_sound').trigger( "click" );
			}
			else if(previewPlaying == true){
				$('#button_preview_stop').trigger( "click" );
			}
		}
	});

	//JS cookie functions
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}
	// if there is hours and minutes in the cookie, get it and put them on screen
	var memoryMinutes = getCookie("minutes");
	var memoryHours = getCookie("hours");
	var memoryIndex = getCookie("index");
    if (memoryMinutes != "") {
        alarmMinutes = memoryMinutes;
		alarmHours = memoryHours;
		index = memoryIndex;
		$('.sound_container').hide();
		$('#sound_' + audios[index]).show();
		updateAlarmTimeDisplay();
    }

});
