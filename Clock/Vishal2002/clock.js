setInterval(setclock,1000)
const hourHand=document.querySelector('[data-hour-hand]')
const minuteHand=document.querySelector('[data-minute-hand]')
const secondHand=document.querySelector('[data-second-hand]')
function setclock(){
   const currentDate=new Date() 
   const secondratio=currentDate. getSeconds()/60;
   const minuteratio=(secondratio + currentDate.getMinutes())/60;
   const hourratio=(minuteratio + currentDate.getHours())/12;
   setRotation(secondHand,secondratio)
   setRotation(minuteHand,minuteratio)
   setRotation(hourHand,hourratio)
}
 

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation',rotationRatio*360)
}

setclock()