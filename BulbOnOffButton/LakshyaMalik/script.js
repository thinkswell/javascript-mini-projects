const ToggleBulb = () =>{
    console.log('d');
    
    let Bulb = document.getElementById('bulbimg');
    
    if (Bulb.src.match('./assets/Bulb-on2.png')){
        Bulb.setAttribute('src','./assets/Bulb-off2.png');
        console.log('dfghjkl');
    }

    else{
        Bulb.setAttribute('src','./assets/Bulb-on2.png');
    }
}