function getbmivalue() {
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;

    height = height * 12;
    height = height * 0.025; //Now height is in meter

    var bmi_value = weight / Math.pow(height, 2);
    bmi_value = Math.round(bmi_value);

    document.getElementById('bmivalue').value = bmi_value;

        if (bmi_value >= 25)
            document.getElementById('healthStatus').innerHTML = "You are overweight!";
        else if (bmi_value <= 19) 
            document.getElementById('healthStatus').textContent = "You are underweight!";
        else if(bmi_value<25 && bmi_value>19)
            document.getElementById('healthStatus').textContent = "Your body is healthy and active!";
        else
        document.getElementById('healthStatus').textContent = "A healthy BMI ranges between 19 and 25.";
        
}