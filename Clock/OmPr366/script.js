setInterval(() => {
    dt = new Date();
    hrtym = dt.getHours();
    minTym = dt.getMinutes();
    secTym = dt.getSeconds();
    hrRot = 30*hrtym + minTym/2;
    minRot = 6*minTym;
    secRot = 6*secTym;
    

    hr.style.transform = `rotate(${hrRot}deg)`;
    min.style.transform = `rotate(${minRot}deg)`;
    sec.style.transform = `rotate(${secRot}deg)`;
}, 1000);