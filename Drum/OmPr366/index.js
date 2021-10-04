var drums = document.querySelectorAll(".drum");
console.log("OP");

const animate = (key) => {
  const currentKey = document.querySelector(`.${key}`);
  currentKey.classList.add("pressed");
  setTimeout(() => {
    currentKey.classList.remove("pressed");
  }, 250);
};

const playMusic = (m) => {
  const audio = new Audio(m);
  audio.volume = audioValue;
  audio.play();
};

document.addEventListener("keypress", (event) => {
  const triggeredKey = event.key;
  animate(triggeredKey);
  makeSound(triggeredKey);
});

const makeSound = (key) => {
  switch (key) {
    case "w":
      playMusic("sounds/sounds_sound-1.mp3");
      break;
    case "a":
      playMusic("sounds/sounds_sound-2.mp3");
      break;
    case "s":
      playMusic("sounds/sounds_sound-3.mp3");
      break;
    case "d":
      playMusic("sounds/sounds_sound-4.mp3");
      break;
    case "j":
      playMusic("sounds/sounds_sound-5.mp3");
      break;
    case "k":
      playMusic("sounds/sounds_sound-6.mp3");
      break;
    case "l":
      playMusic("sounds/sounds_sound-7.mp3");
      break;

    default:
      break;
  }
};

const handleDrumClick = (event) => {
  var innerHTML = event.target.innerHTML;
  animate(innerHTML);
  makeSound(innerHTML);
};

for (let i = 0; i < drums.length; i++) {
  drums[i].addEventListener("click", handleDrumClick);
}
///Music Part

var audioValue = 0.6;

const slider = document.getElementById("volumeSlider");
slider.oninput = (event) => {
  audioValue = event.target.value / 100;
};

//Auto Music
var autoMusicId;
var autoMusicONvalue = 0;
const autoMusicStart = () => {
  const drumLetter = ["w", "a", "s", "d", "j", "k", "l"];

  autoMusicId =  setInterval(() => {
    const currentKey =
    drumLetter[Math.floor(Math.random() * drumLetter.length)];
    animate(currentKey);
    makeSound(currentKey);
  }, 200);
  const currentKey = drumLetter[Math.floor(Math.random() * drumLetter.length)];
  animate(currentKey);
  makeSound(currentKey);
};
const autoMusicButon = document.getElementById("extraButtom1")
autoMusicButon.addEventListener("click", () => {

    if (autoMusicONvalue==0) {
        autoMusicButon.innerHTML = "Stop"
        autoMusicStart();
        autoMusicONvalue = 1;
        autoMusicButon.classList.add("extraButtom1Pressed");
        
    }else{
        autoMusicButon.innerHTML  = " Play Auto"
        clearInterval(autoMusicId);
        autoMusicONvalue = 0;
        autoMusicButon.classList.remove("extraButtom1Pressed");
    }
});

//Theme1 is here:-
const theme1Background = "#260909";
const theme1BackgroundLow = "#26090979";
const theme1Text = "#ffff";

//Theme2 is here:-
const theme2Background = "rgb(38, 61, 47)";
const theme2BackgroundLow = "rgba(38, 61, 47, 0.568)";
const theme2Text = "#00e91f";

//Theme3 is here:-

const theme3Background = "#091921";
const theme3BackgroundLow = "#09192179";
const theme3Text = "#00fff1";

const changeTheme = (theme) => {
  let root = document.documentElement;
  if (theme == "theme1") {
    root.style.setProperty("--background", theme1Background);
    root.style.setProperty("--backgroundLow", theme1BackgroundLow);
    root.style.setProperty("--text", theme1Text);
  } else if (theme == "theme2") {
    root.style.setProperty("--background", theme2Background);
    root.style.setProperty("--backgroundLow", theme2BackgroundLow);
    root.style.setProperty("--text", theme2Text);
  } else if (theme == "theme3") {
    root.style.setProperty("--background", theme3Background);
    root.style.setProperty("--backgroundLow", theme3BackgroundLow);
    root.style.setProperty("--text", theme3Text);
  }
};

const themeChanger = document.getElementById("extraButtom2");

var currentTheme = "theme1";
themeChanger.addEventListener("click", (e) => {
  themeChanger.classList.add("changeThemePressed");
  setTimeout(() => {
    themeChanger.classList.remove("changeThemePressed");
  }, 250);
  if (currentTheme == "theme1") {
    themeChanger.innerText = "Green Theme";
    changeTheme("theme2");
    currentTheme = "theme2";
  } else if (currentTheme == "theme2") {
    themeChanger.innerText = "Blue Theme";
    changeTheme("theme3");
    currentTheme = "theme3";
  } else if (currentTheme == "theme3") {
    themeChanger.innerText = "Red Theme";
    changeTheme("theme1");
    currentTheme = "theme1";
  }
});


//background

const backgroundChange =(imageSrcc)=>{
    let contBack = document.getElementsByClassName('container')[0].style;
    
    let bgColor = getComputedStyle(document.documentElement).getPropertyValue("--backgroundLow");

    contBack.background = `linear-gradient(300deg,${bgColor},${bgColor}) ,url(${imageSrcc})`;
    contBack.backgroundSize = 'cover';
    contBack.backgroundPosition = 'center';
}

//API Call 


var imageUrl;


const apiCall = ()=>{
    const URL = "https://api.unsplash.com/photos/random?query= drum";
    fetch(URL,{
        headers:{
            'Authorization': 'Client-ID au1HfKd9cz7xIAxq6jkzHNVMBzKU7D8-atKUsYnRwIE'
        }
    }).then(res=>res.json())
        .then(res => {
            imageUrl = res.urls.small;
            backgroundChange(imageUrl);
        })
        .catch(error => console.log(error))
}
apiCall();

const backChanger = document.getElementById("extraButtom3");
backChanger.addEventListener("click",()=>{
    apiCall();
})



