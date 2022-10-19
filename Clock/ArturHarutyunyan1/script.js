const clock = document.querySelector('.time')
const date  = document.querySelector('.date')

initClock()

function initClock(){
    let now = new Date()


    let hrs     = now.getHours()
    let min     = now.getMinutes()
    let sec     = now.getSeconds()
    let day     = now.getDate()
    let month   = now.getMonth() + 1
    let year    = now.getFullYear()
    let setMonth
    let session = 'AM'

    if(hrs < 10){
        hrs = `0${hrs}`
    }
    if(min < 10){
        min = `0${min}`
    }
    if(sec < 10){
        sec = `0${sec}`
    }

    if(hrs > 12){
        session = 'PM'
    }

    switch (month) {
        case 1:
            setMonth = 'Jan'
            break;
        case 2:
            setMonth = 'Feb'
            break;
        case 3:
            setMonth = 'Mar'
            break;
        case 4:
            setMonth = 'Apr'
            break;
        case 5:
            setMonth = 'May'
            break;
        case 6:
            setMonth = 'Jun'
            break;
        case 7:
            setMonth = 'Jul'
            break;
        case 8:
            setMonth = 'Aug'
            break;
        case 9:
            setMonth = 'Sep'
            break;
        case 10:
            setMonth = 'Oct'
            break;
        case 11:
            setMonth = 'Nov'
            break;
        case 12:
            setMonth = 'Dec'
            break;
    }

    clock.textContent = `${hrs}:${min}:${sec} ${session}`
    date.textContent = `${setMonth} ${day}, ${year}`   
}

setInterval(initClock, 1000)
