function calculateAge() {
    const birthdateInput = document.getElementById('birthdate');
    const ageInYearsElement = document.getElementById('age-in-years');
    const noveltyUnitsList = document.getElementById('novelty-units');

    const birthdate = new Date(birthdateInput.value);
    const today = new Date();

    const ageInMilliseconds = today - birthdate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInYears = ageInSeconds / (365 * 24 * 60 * 60);

    ageInYearsElement.textContent = `Your age in years: ${ageInYears.toFixed(2)}`;
    
    const planetaryYears = {
        'Mercury': ageInYears / 0.2408467,
        'Venus': ageInYears / 0.61519726,
        'Mars': ageInYears / 1.8808158,
        'Jupiter': ageInYears / 11.862615,
        'Saturn': ageInYears / 29.447498,
        'Uranus': ageInYears / 84.016846,
        'Neptune': ageInYears / 164.79132
    };

    const fruitYears = {
        'Apple': ageInYears / 80,
        'Banana': ageInYears / 25,
        'Carrot': ageInYears / 2,
        'Grape': ageInYears / 60,
        'Watermelon': ageInYears / 90
    };

    noveltyUnitsList.innerHTML = '';
    
    for (const planet in planetaryYears) {
        const listItem = document.createElement('li');
        listItem.textContent = `${planet}: ${planetaryYears[planet].toFixed(2)} years`;
        noveltyUnitsList.appendChild(listItem);
    }

    for (const fruit in fruitYears) {
        const listItem = document.createElement('li');
        listItem.textContent = `${fruit}: ${fruitYears[fruit].toFixed(2)} years`;
        noveltyUnitsList.appendChild(listItem);
    }
}
