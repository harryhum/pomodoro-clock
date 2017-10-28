var mode = 'work';
var time;

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
    timer(mode);
    countdown(fromTime);
};

/*
* Starts the countdown of the clock.
* @param {number} [fromTime] The number to start counting down from.
*/
function countdown(fromTime) {
  console.log(fromTime);
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
      switchMode(startTime);
    }
  }, 1000);

  $('#pause').on('click', function() {
    clearInterval(startTime);
  });
  $('#stop').on('click', function() {
    clearInterval(startTime);
    clockDisplay(mode);
  });
  $('#reset').on('click', function() {
    clearInterval(startTime);
    $('#work').text('25');
    $('#rest').text('5');
    clockDisplay(mode);
  });
};

function modeChooser() {
  if (mode == 'work') {
    time = $('#work').text() * 1000 * 60;
  } else {
    time = $('#rest').text() * 1000 * 60;
  }
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
    if (workTime > 0) {
      workTime = workTime - 1;
    } else {
      workTime = 0
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
    if (restTime > 0) {
      restTime = restTime - 1;
    } else {
      restTime = 0
    };
    $('#rest').text(restTime.toString());
    clockDisplay(mode);
  });
};
