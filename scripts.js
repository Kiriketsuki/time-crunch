var startingMinutes = 25;
var time = startingMinutes * 60;
var phase = 0;
var minutes = Math.floor(time / 60);
var seconds = Math.floor(time % 60);
var counterInterval;
var breakMinutes = 5;
var breakTime = breakMinutes * 60;
var breakSeconds = Math.floor(breakTime%60);

//phases: 0: work 1: break

const counterElement = document.getElementById("counter");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const increaseWork = document.getElementById("increaseWork");
const decreaseWork = document.getElementById("decreaseWork");
const increaseBreak = document.getElementById("increaseBreak");
const decreaseBreak = document.getElementById("decreaseBreak"); 
const workDisplay = document.getElementById("work");
const breakDisplay = document.getElementById("break");
const phaseDisplay = document.getElementById("phase");
const resetButton = document.getElementById("reset");

updateCounter();
updateWork();
updateBreak();
setInterval(checkPhase,500);

function updateTime() {
    minutes = Math.floor(time/60);
    seconds = Math.floor(time%60);
}

function updateBreakTime() {
    breakMinutes = Math.floor(breakTime/60);
    breakSeconds = Math.floor(breakTime%60);
}

function updateCounter() { 
    if(phase == 0){
        updateTime();      
        if (seconds < 10) {
            seconds = "0" + seconds;        
        }
        counterElement.innerHTML = `${minutes}:${seconds}`;
    } else if (phase == 1) {
        updateBreakTime();
        if (breakSeconds < 10) {
            breakSeconds = "0" + breakSeconds;
        }
        counterElement.innerHTML = `${breakMinutes}:${breakSeconds}`;
    }
}


function updateWork() {
    
    workDisplay.innerHTML = `Work Time: ${minutes}:${seconds}`;
}

function updateBreak() {
    if (breakSeconds < 10) {
        breakSeconds = "0" + breakSeconds;
        }
    breakDisplay.innerHTML = `Break Time: ${breakMinutes}:${breakSeconds}`
}

function countdown() {
    updateCounter();
    
    if(phase == 0) {
        if (time != 0) {
            time--;
        }
    } else if (phase == 1) {
        if (breakTime != 0) {
            breakTime --;
        }
    }
}

function startCounter() {
   counterInterval = setInterval(countdown,1000);
}

function pauseCounter() {
    clearInterval(counterInterval);
}

function increaseMinutes () {
    startingMinutes ++;
    time = startingMinutes * 60;
    
    if(phase == 0){
        updateCounter();
    } else {
        updateTime();      
        if (seconds < 10) {
            seconds = "0" + seconds;        
        }
    }
    updateTime();
    if (seconds < 10) {
        seconds = "0" + seconds;        
    }
    updateWork();
}

function increaseBreakMinutes () {
    breakMinutes ++;
    breakTime = breakMinutes * 60;
    if (phase == 1) {
        updateCounter();
    }
    updateBreakTime();

    // if (breakSeconds < 10) {
        // breakSeconds = "0" + breakSeconds;
    // }
    updateBreak();
}

function decreaseMinutes() {
    if(startingMinutes == 0) {
        startingMinutes = 1;
    }

    if(phase == 0){
        updateCounter();
    } else {
        updateTime();      
        if (seconds < 10) {
            seconds = "0" + seconds;        
        }
    }

    startingMinutes --;
    time = startingMinutes * 60;
    
    updateCounter();
    updateWork();
}

function decreaseBreakMinutes() {
    if(breakMinutes == 0) {
        breakMinutes = 1;
    }

    breakMinutes --;
    breakTime = breakMinutes * 60;

    if (phase == 1) {
        updateCounter();
    }

    updateBreakTime();

    // if (breakSeconds < 10) {
        // breakSeconds = "0" + breakSeconds;
    // }
    
    updateBreak();
}


function resetCounter() {
    time = startingMinutes * 60;
    updateCounter();
    pauseCounter();
}

function checkPhase() {
    if(phase == 0) {
        if(time == 0) {
            time = startingMinutes * 60;
            phase = 1;
            updateCounter();
            phaseDisplay.innerHTML = `Time to take a break!`;
        }
        phaseDisplay.innerHTML = `Time to work!`;
    } else if (phase == 1) {
        if (breakTime == 0) {
            breakTime = breakMinutes * 60;
            phase = 0;
            updateCounter();
            phaseDisplay.innerHTML = `Time to work!`;
        }
        phaseDisplay.innerHTML = `Time to take a break!`;
    }
}

startButton.addEventListener("click", function(e) {
    startCounter();
})  

pauseButton.addEventListener("click", function(e) {
    pauseCounter();
})

stopButton.addEventListener("click", function(e) {
    resetCounter();
})

increaseWork.addEventListener("click", function(e) {
    increaseMinutes();
    pauseCounter();
})

decreaseWork.addEventListener("click", function(e) {
    decreaseMinutes();
    pauseCounter();
})

increaseBreak.addEventListener("click", function(e) {
    increaseBreakMinutes();
    pauseCounter();
})

decreaseBreak.addEventListener("click", function(e) {
    decreaseBreakMinutes();
    pauseCounter();
})

resetButton.addEventListener("click", function (e) {
    startingMinutes = 25;
    time = startingMinutes * 60;
    phase = 0;
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time % 60);
    counterInterval;
    breakMinutes = 5;
    breakTime = breakMinutes * 60;
    breakSeconds = Math.floor(breakTime%60);
    pauseCounter();
    updateBreak();
    updateCounter();
    updateWork();
    
})