function time_update() {

    const d = new Date;
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    document.querySelector("#clock").innerHTML = hours + ":" + minutes + ":" + seconds;
    let t = setTimeout(function() { time_update() }, 1000);


}
time_update();
document.querySelector("#submit").addEventListener('click', setAlarm);

function setAlarm() {

    setHour = document.querySelector("#hour").value;
    setMinutes = document.querySelector("#minutes").value;
    console.log(setHour + setMinutes)
    if (setHour == hours) {
        if (setMinutes == minutes) {

            play();

        }
        let z = setTimeout(function() { setAlarm() }, 1000);
    }
}

function play() {
    var audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3');
    audio.play();

}
