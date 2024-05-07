const ToggleBulb = () =>{
    console.log('d');
    
    let Bulb = document.getElementById('bulbimg');
    
    if (Bulb.src.match('./assets/bulb-on.png')){
        Bulb.setAttribute('src','./assets/bulb-off.png');
        console.log('dfghjkl');
    }

    else{
        Bulb.setAttribute('src','./assets/bulb-on.png');
    }
}