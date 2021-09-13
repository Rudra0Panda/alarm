//!clock

function time_update() {
  const d = new Date();
  Rawhours = d.getHours();
  Rawminutes = d.getMinutes();
  seconds = d.getSeconds();
  hours = Rawhours < 10 ? "0" + Rawhours : Rawhours;
  minutes = Rawminutes < 10 ? "0" + Rawminutes : Rawminutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.querySelector("#clock").innerHTML =
    hours + ":" + minutes + ":" + seconds;
  let t = setTimeout(function () {
    time_update();
  }, 1000);
}
timeout = 1000;
ten =  60000
//!alarm-set
time_update();
document.querySelector("#submit").addEventListener("click", setAlarm);

function setAlarm() {
  setHour = document.querySelector("#hour").value;
  setMinutes = document.querySelector("#minutes").value;
  if (setHour == Rawhours) {
    if (setMinutes == Rawminutes) {
      console.log("true");
      play();
    }
  }
  //!play
  function play() {
    audio = new Audio("beep-01a.wav");
    audio.play();

  }
  //!pause
  $("#stop").click(function (e) { 
    e.preventDefault();
    timeout =+ 600000;
  });
  let z = setTimeout(function () {
    setAlarm();
  }, timeout);

}


//!not my code