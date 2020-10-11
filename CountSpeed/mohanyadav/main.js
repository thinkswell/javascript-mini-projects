$(document).ready(function () {

    let distance_input;
    let time_input;
    let calculated_speed;

    $("#calculate-btn").click(function () {
        distance_input = $("#distance").val();
        time_input = $("#time").val();

        if (distance_input == "" || time_input == "") {
            $(".final-answer").text("Invalid inputs");
        } else {
            calculated_speed = distance_input / time_input;
            $(".final-answer").text("Calculated speed is " + calculated_speed + "m/s");
        }
    });

});