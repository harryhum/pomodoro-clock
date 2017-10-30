var mode = 'work';
var time;
var alarm = new Audio('sounds/alarm.mp3');

$(document).ready(function() {
  setWork();
  setRest();
  clockDisplay(mode);
  start();
});

function switchMode(startTime) {
    clearInterval(startTime);
    if (mode == 'rest') {
      mode = 'work';
      fromTime = $('#work').text() * 1000 * 60;
    } else {
      mode = 'rest';
      fromTime = $('#rest').text() * 1000 * 60;
    }
    clockDisplay(mode);
    countdown(fromTime);
};

function disableButton() {
  $('.setButton').attr('disabled', true);
};

function enableButton() {
  $('.setButton').attr('disabled', false);
}

// Starts the countdown of the clock.

function countdown(fromTime) {
  console.log(fromTime);
  disableButton();
  var startTime = setInterval(function() {
    fromTime = fromTime - 1000;
    var minutes = Math.floor((fromTime % (1000 * 60 *60)) / (1000 * 60));
    var seconds = Math.floor((fromTime % (1000* 60)) / 1000);
    if (seconds < 10) {
      timeDisplay = minutes.toString() + ':0' + seconds.toString();
    } else {
      var timeDisplay = minutes.toString() + ':' + seconds.toString();
    };
    $('#countdown').text(timeDisplay);
    if (fromTime == 0) {
      alarm.play();
      switchMode(startTime);
    }
  }, 1000);

  $('#pause').on('click', function() {
    clearInterval(startTime);
    enableButton();
  });
  $('#stop').on('click', function() {
    clearInterval(startTime);
    enableButton();
    alarm.pause();
    alarm.currentTime = 0;
    clockDisplay(mode);
  });
  $('#reset').on('click', function() {
    clearInterval(startTime);
    enableButton();
    alarm.pause();
    alarm.currentTime = 0;
    mode = 'work';
    $('#work').text('25');
    $('#rest').text('5');
    clockDisplay(mode);
    setWork();
    setRest();
  });
};

function modeChooser() {
  if (mode == 'work') {
    time = $('#work').text() * 1000 * 60;
  } else {
    time = $('#rest').text() * 1000 * 60;
  }
};

function colorChange() {
  if (mode == 'work') {
    $('#countdown').removeClass('red');
    $('#countdown').addClass('green');
  } else if (mode == 'rest') {
    $('#countdown').removeClass('green');
    $('#countdown').addClass('red');
  };
};

function clockDisplay(mode) {
  modeChooser();
  var minutes = Math.floor((time % (1000 * 60 *60)) / (1000 * 60));
  var seconds = 0;
  if (seconds < 10) {
    timeDisplay = minutes.toString() + ':0' + seconds.toString();
  } else {
    var timeDisplay = minutes.toString() + ':' + seconds.toString();
  };
  colorChange();
  $('#countdown').text(timeDisplay);
};

//Starts the countdown using the time currently displayed on the clock.
function start() {
  $('#start').on('click', function () {
    var min = $('#countdown').text().substr(0, $('#countdown').text().indexOf(':')) * 1000 * 60;
    var sec = $('#countdown').text().substr(($('#countdown').text().length - 2), $('#countdown').text().length) * 1000;
    var currentTime = min + sec;
    countdown(currentTime);
  });
};

function setWork() {
  var workTime = parseInt($('#work').text());
  $('#work').text(workTime.toString());
  $('#upWork').on('click', function() {
    workTime = workTime + 1;
    $('#work').text(workTime.toString());
    clockDisplay(mode);;
  });
  $('#downWork').on('click', function() {
    if (workTime > 1) {
      workTime = workTime - 1;
    } else {
      workTime = 1
    };
    $('#work').text(workTime.toString());
    clockDisplay(mode);;
  });
};

function setRest() {
  var restTime = parseInt($('#rest').text());
  $('#rest').text(restTime.toString());
  $('#upRest').on('click', function() {
    restTime = restTime + 1;
    $('#rest').text(restTime.toString());
    clockDisplay(mode);;
  });
  $('#downRest').on('click', function() {
    if (restTime > 1) {
      restTime = restTime - 1;
    } else {
      restTime = 1
    };
    $('#rest').text(restTime.toString());
    clockDisplay(mode);
  });
};
