
function calculate() {
    var initialVelocity = (document.getElementById("initial-velocity-input").value);
    var finalVelocity = (document.getElementById("final-velocity-input").value);
    var acc = (document.getElementById("acc-input").value);
    var time = (document.getElementById("time-input").value);

    //calculate final velocity v=u+a*t
    if (finalVelocity === "" && initialVelocity !== "" && acc !== "" && time !== "") {
        document.getElementById("alert-user").style.display = "none";
        initialVelocity = parseFloat(initialVelocity);
        if (document.getElementById('initial-velocity-unit').value === 'km/h') 
        { initialVelocity = (initialVelocity * 5) / 18; }

        time = parseFloat(time);
        if (document.getElementById('time-unit').value === 'hour')
        { time = time * 3600; }

        acc = parseFloat(acc);
        if (document.getElementById('acc-unit').value === 'km/h^2') 
        { acc = (acc * 5) / (18 * 3600); }

        if (document.getElementById('final-velocity-unit').value === 'km/h')
        { document.getElementById("final-velocity-input").value = (Math.round(((18 * (initialVelocity + acc * time)) / 5) * 100000)) / 100000; }
        else 
        { document.getElementById("final-velocity-input").value = (Math.round(((initialVelocity + acc * time)) * 100000)) / 100000; }
    }
    //calculate initial velocity v - a*t 
    else if (initialVelocity === "" && finalVelocity !== "" && acc !== "" && time !== "")
    { //initialVelocity = parseFloat(initialVelocity);
        document.getElementById("alert-user").style.display = "none";
        finalVelocity = parseFloat(finalVelocity);
        if (document.getElementById('final-velocity-unit').value === 'km/h') { finalVelocity = (finalVelocity * 5) / 18; }

        time = parseFloat(time);
        if (document.getElementById('time-unit').value === 'hour') { time = time * 3600; }

        acc = parseFloat(acc);
        if (document.getElementById('acc-unit').value === 'km/h^2') { acc = (acc * 5) / (18 * 3600); }

        if (document.getElementById('initial-velocity-unit').value === 'km/h') 
        { document.getElementById("initial-velocity-input").value = (Math.round(((18 * (finalVelocity - (acc*time))) / 5) * 100000)) / 100000; }
        else 
        { document.getElementById("initial-velocity-input").value = (Math.round(((finalVelocity - (acc*time))) * 100000)) / 100000; }


    }
    //calculate time
    else if (time === "" && initialVelocity !== "" && acc !== "" && finalVelocity !== "") {
        document.getElementById("alert-user").style.display = "none";
        initialVelocity = parseFloat(initialVelocity);
        if (document.getElementById('initial-velocity-unit').value === 'km/h') { initialVelocity = (initialVelocity * 5) / 18; }

        finalVelocity = parseFloat(finalVelocity);
        if (document.getElementById('final-velocity-unit').value === 'km/h') { finalVelocity = (finalVelocity * 5) / 18; }

        acc = parseFloat(acc);
        if (document.getElementById('acc-unit').value === 'km/h^2') { acc = (acc * 5) / (18 * 3600); }

        if (document.getElementById('time-unit').value === 'hour') 
        { document.getElementById("time-input").value = (Math.round((((finalVelocity - initialVelocity) / acc) / 3600) * 100000)) / 100000; }
        else 
        { document.getElementById("time-input").value = (Math.round(((finalVelocity - initialVelocity) / acc) * 100000)) / 100000; }

    }
    //calculate acceleration
    else if (acc === "" && initialVelocity !== "" && time !== "" && finalVelocity !== "") {
        document.getElementById("alert-user").style.display = "none";
        if (document.getElementById('initial-velocity-unit').value === 'km/h') { initialVelocity = (initialVelocity * 5) / 18; }

        finalVelocity = parseFloat(finalVelocity);
        if (document.getElementById('final-velocity-unit').value === 'km/h') { finalVelocity = (finalVelocity * 5) / 18; }

        time = parseFloat(time);
        if (document.getElementById('time-unit').value === 'hour') { time = time * 3600; }

        if (document.getElementById('acc-unit').value === 'km/h^2') 
        { document.getElementById("acc-input").value = (Math.round((5 * ((finalVelocity - initialVelocity) / time) / (18 * 3600)) * 100000)) / 100000; }
        else 
        { document.getElementById("acc-input").value = (Math.round((((finalVelocity - initialVelocity) / time)) * 100000)) / 100000; }


    }
    else {
        document.getElementById("alert-user").style.display = "block";
    }
}