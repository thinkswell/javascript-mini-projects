
const projectName = "mnk17arts' Pomodoro Clock";

$(document).ready(
function(){
  // incre.. decre  consts
  const brki = $("#break-increment");
  const brkd = $("#break-decrement");
  const sessi = $("#session-increment");
  const sessd = $("#session-decrement");
  // start pause reset 
  const stop = $("#stop");
  const start_stop = $("#start_stop");
  const reset = $("#reset");
  // labels
  const timel = $("#timer-label");
  // times
  const timeleft = $("#time-left");
  const brkp = $("#break-length");
  const sessp = $("#session-length");
  // alarm
  const beep =$("#beep")
  // time mode
  const timeMode = {
    SESSION : "Session Time",
    BREAK : "Break Time"
  } 
  // operation mode
  const opMode = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT"
  }
  // -------------------
  let currentMode = timeMode.SESSION;
  let countDownInterval = null;
  // -------------------
  // control zereos... 1-> 01 10-> 10 0-> 00
  const zeroes = (v)=> {
    const n = v.toString();
    return n.length === 1? `0${n}`: n;
  }
  // set timer...
  const setTimer = (m,s) => {
    let min = zeroes(m);
    let sec = zeroes(s);
    timeleft.text(`${min}:${sec}`);
  } 
  // set lengths..
  const setTimeLength = (element, mode) => {
    const currentValue = parseInt(element.text());

    if (clockStatus()) {
      return;
    }

    if (mode === opMode.INCREMENT && currentValue < 60) {
      element.text(currentValue + 1);
    } else if (mode === opMode.DECREMENT && currentValue > 1) {
      element.text(currentValue - 1);
    }
  }
  // clock status...
  const clockStatus = () => {
    return start_stop.hasClass("active");
  }
  // length control...
  brki.on('click',()=>{
    setTimeLength(brkp,opMode.INCREMENT);
  });
  brkd.on('click',()=>{
    setTimeLength(brkp,opMode.DECREMENT);
  });  
  sessi.on('click',()=>{
    setTimeLength(sessp,opMode.INCREMENT);
    if (clockStatus()) {
      return;
    }
    setTimer(sessp.text(), 0);  
  });
  sessd.on('click',()=>{
    setTimeLength(sessp,opMode.DECREMENT);
    if (clockStatus()) {
      return;
    }
    setTimer(sessp.text(), 0);      
  });   
  // RESET
  reset.on('click',()=>{
    if(clockStatus()){
      start_stop.removeClass('active');
      clearInterval(countDownInterval);
    }
    beep.trigger('pause');
    beep.prop("currentTime",0);
    
    currentMode = timeMode.SESSION;
    timel.text(timeMode.SESSION);
    brkp.text(5);
    sessp.text(25);
    setTimer(25,0);
  });
  // STOP
  stop.on('click',()=>{ // stop
    if(clockStatus()){
      start_stop.removeClass('active');
      clearInterval(countDownInterval);        
    }
    beep.trigger('pause');
    beep.prop("currentTime",0);
    
    if(currentMode === timeMode.BREAK){
      setTimer(brkp.text(),0);
    } else {
      setTimer(sessp.text(),0);
    }
  }); 
  // START - PAUSE
  start_stop.on('click', ()=>{
    if (clockStatus()) {
      clearInterval(countDownInterval);
      start_stop.removeClass("active");
      return;
    } 
    else {
      start_stop.addClass("active");
    }
    
    countDownInterval = setInterval(() =>
    {
      const time = timeleft.text().split(":")
      let min = parseInt(time[0]);
      let sec = parseInt(time[1]);

      if (sec === 0) {
        if (min === 0 && currentMode === timeMode.BREAK) {
          beep.trigger("play");
          currentMode = timeMode.SESSION;
          timel.text(timeMode.SESSION);
          setTimer(sessp.text(), 0);
          return
        } else if (min === 0 && currentMode === timeMode.SESSION) {
          beep.trigger("play");
          currentMode = timeMode.BREAK;
          timel.text(timeMode.BREAK);
          setTimer(brkp.text(), 0);
          return
        } else {
          sec = 59;
          min--
        }
      } else {
        sec--;
      }

      setTimer(min, sec);
    }, 1000);    
  });
  // initialize 
  setTimer(25, 0);
  brkp.text('5');
  sessp.text('25');   
  
}
);
