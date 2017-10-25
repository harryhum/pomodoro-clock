$(document).ready(function() {
  setWork();
  setRest();
//  timer();
//  start();
//  pause();
//  stop();
//  reset();
});

function setWork() {
  var workTime = parseInt($('#work').text());
  $('#work').text(workTime.toString());
  $('.upWork').on('click', function() {
    workTime = workTime + 1;
    $('#work').text(workTime.toString());
  });
  $('.downWork').on('click', function() {
    if (workTime > 0) {
      workTime = workTime - 1;
    } else {
      workTime = 0
    };
    $('#work').text(workTime.toString());
  });
};

function setRest() {
  var restTime = parseInt($('#rest').text());
  $('#rest').text(restTime.toString());
  $('.upRest').on('click', function() {
    restTime = restTime + 1;
    $('#rest').text(restTime.toString());
  });
  $('.downRest').on('click', function() {
    if (restTime > 0) {
      restTime = restTime - 1;
    } else {
      restTime = 0
    };
    $('#rest').text(restTime.toString());
  });
};

/* failed attempt to use DRY methodology
function iterateUp(id) {
  $('.up').on('click', function() {
    var time = parseInt($(this).closest('p'));
    time = time + 1;
    $('#' + id).text(time.toString());
  });
};

function iterateDown(id) {
  $('.down').on('click', function() {
    var time = parseInt($(this).closest('p'));
    if (time > 0) {
      time = time - 1;
    } else {
      time = 0;
    };
    $('#' + id).text(time.toString());
  });
};

function setWork() {
  iterateUp('work');
  iterateDown('work');
};

function setRest() {
  iterateUp('rest');
  iterateDown('rest');
}
*/
