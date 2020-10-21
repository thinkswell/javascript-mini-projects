const data = [
    { 
        name: 'Fallan Andria',
        age: 22,
        gender: 'male',
        lookingfor: 'female',
        location: 'Avissawella',
        image: 'https://randomuser.me/api/portraits/men/72.jpg'
    },

    { 
        name: 'Sahanya Sanuthmi',
        age: 22,
        gender: 'female',
        lookingfor: 'male',
        location: 'Avissawella',
        image: 'https://randomuser.me/api/portraits/women/72.jpg'
    },

    { 
        name: 'Kavindu Ranasinghe',
        age: 22,
        gender: 'male',
        lookingfor: 'female',
        location: 'Avissawella',
        image: 'https://randomuser.me/api/portraits/men/52.jpg'
    },

    { 
        name: 'Nadun Vishwa',
        age: 22,
        gender: 'male',
        lookingfor: 'female',
        location: 'Avissawella',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },

    { 
        name: 'kasuni Ranasinghe',
        age: 22,
        gender: 'female',
        lookingfor: 'male',
        location: 'Avissawella',
        image: 'https://randomuser.me/api/portraits/women/32.jpg'
    }
];

const profiles =  profileIterator(data);

//call first profile manually
nextProfile();

//Next Event
document.getElementById('next').addEventListener('click',nextProfile);

//Next Profile Display
function nextProfile(){
const currentProfile = profiles.next().value;


    if(currentProfile !== undefined){
        document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item"> Name: ${currentProfile.name}</li>
            <li class="list-group-item"> Age: ${currentProfile.age}</li>
            <li class="list-group-item"> Location: ${currentProfile.location}</li>
            <li class="list-group-item"> Preference: ${currentProfile.gender}  Looking For: ${currentProfile.lookingfor}</li>
            
        </ul>
        `;

        document.getElementById('imageDisplay').innerHTML = `
            <img src="${currentProfile.image}">
        `;
    }else{
        //No more profiles
        window.location.reload();   
        
    }
}

//Profile Iterator
function profileIterator(profiles){
    let nextIndex = 0;

    return {
        next: function(){
            return nextIndex < profiles.length ? 
            {value: profiles [nextIndex++], done: false}:
            {done: true}
        }
    };
}