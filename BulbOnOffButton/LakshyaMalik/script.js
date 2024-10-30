
const ToggleBulb = () =>{
    console.log('d');
    
    let Bulb = document.getElementById('bulbimg');
    
    if (Bulb.src.match('./assets/Bulb-on2.png')){
        Bulb.setAttribute('src','./assets/Bulb-off2.png');
        console.log('dfghjkl');
        closeDialogue();
    }

    else{
        Bulb.setAttribute('src','./assets/Bulb-on2.png');
        openDialogue();
    }
}
const openDialogue = () => {
    document.getElementById("dialogueBox");
    dialogueBox.style.display = "inline-grid";
    dialogueBox.style.position = "fixed"; // Use absolute if you want it relative to a positioned ancestor
    dialogueBox.style.top = "80%";
    dialogueBox.style.left = "37%";

    
}



const closeDialogue = () => {
    document.getElementById("dialogueBox").style.display = "none";
}

