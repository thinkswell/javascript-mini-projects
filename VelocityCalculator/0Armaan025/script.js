document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("velocity-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const distance = parseFloat(document.getElementById("distance").value);
        const time = parseFloat(document.getElementById("time").value);
        
        if (!isNaN(distance) && !isNaN(time)) {
            const velocity = distance / time;
            document.getElementById("result").textContent = `Velocity: ${velocity} m/s`;
        } else {
            document.getElementById("result").textContent = "Please enter valid values for distance and time.";
        }
    });
});
