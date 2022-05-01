// Listen for the submit button to start the calculation
document.querySelector('#loan-form').addEventListener('submit', calculateResults);



function clearError() {
    document.querySelector('.alert').remove();
}

function toggleGif() {
    let gif = document.getElementById('loading-gif');
    gif.style.margin = 'auto';
    if (gif.style.display === 'block') {
        gif.style.display = 'none';
    } else {
        gif.style.display = 'block';
    }
    
    
}

function toggleResults() {
    let results = document.getElementById('results');
     if (results.style.display === 'block') {
        results.style.display = 'none';
    } else {
        results.style.display = 'block';
    }
    
    
}

function calculateResults(event) {
    document.getElementById('results').style.display = 'none';
    toggleGif();
    // get all values from form
    let amount = parseFloat(document.getElementById('amount').value);
    let interest = parseFloat(document.getElementById('interest').value);
    let years = parseInt(document.getElementById('years').value);


    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
        const errDiv = document.createElement('div');
        errDiv.className = 'alert alert-danger';
        const error = 'please check your inputs';
        errDiv.appendChild(document.createTextNode(error));
        const card = document.querySelector('.card');
        const heading = document.querySelector('#heading');
        card.insertBefore(errDiv, heading);

        // clear error
        setTimeout(clearError, 3000);

    }  else {
        setTimeout(toggleGif,2000);
        setTimeout(toggleResults, 2000);
        let totalMonths = years * 12;
        let totalAmount = parseFloat(amount * (1 + (interest / 100)));
        let monthlyRate = parseFloat(totalAmount / totalMonths);

        let resMonthly = document.getElementById('monthly-payment');
        let resTotalPayment = document.getElementById('total-payment');
        let resTotalInterest = document.getElementById('total-interest');

        resMonthly.value = monthlyRate.toFixed(2);
        resTotalPayment.value = totalAmount.toFixed(2);
        resTotalInterest.value = (totalAmount - amount).toFixed(2);
    }
    event.preventDefault();
}