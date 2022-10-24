// //Listen for submit button
 //document.getElementById('loan-form').addEventListener('submit',calculateResults);;

//Listen for submit button
const form = document.getElementById('loan-form');
//form.addEventListener('submit',calculateResults);//Without loader
form.addEventListener('submit',function(e){
    //Hide Results
        document.getElementById('results').style.display='none';
    //Show Loader
        document.getElementById('loading').style.display='block';

        setTimeout(calculateResults,2000);

    e.preventDefault();
});

//Calculate Results function
function calculateResults(e){

    console.log('calculating...');
    //UI cars
    const ELamount = document.getElementById('amount');
    const ELinterest = document.getElementById('interest');
    const ELyears = document.getElementById('years');
    const ELMonthly_payment = document.getElementById('monthly-payment');
    const ELtotal_payment = document.getElementById('total-payment');
    const ELtotal_interest = document.getElementById('total-interest');

    const principal = parseFloat(ELamount.value);
    const calculatedInterest = parseFloat(ELinterest.value) /100 /12;
    const calculatedPayment =  parseFloat(ELyears.value )*12;

    //Create monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    console.log(monthly);

    if(isFinite(monthly)){//check whether it is finite or not
        ELMonthly_payment.value = monthly.toFixed(2);
        ELtotal_payment.value = (monthly*calculatedPayment).toFixed(2);
        ELtotal_interest.value = ((monthly*calculatedPayment)-principal).toFixed(2);//fix to 2 deciman places
        
        //Show Results
        document.getElementById('results').style.display='block';

        //Hide Loader
        document.getElementById('loading').style.display='none';
    }else{
        console.log("Plase check your numbers");
        //Display an error
        showError('Plase check your number');
    }

    e.preventDefault();
}



function showError(error){

    //Show Results
    document.getElementById('results').style.display='none';

    //Hide Loader
    document.getElementById('loading').style.display='none';
    //--------------------------------------------------------------------


    //Create a div
    const errorDiv = document.createElement('div');

    //get elements
    const ELcard = document.querySelector ('.card');
    const ELheading = document.querySelector('.heading');


    //Add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append  to dic
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error  above heading
    ELcard.insertBefore(errorDiv, ELheading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}