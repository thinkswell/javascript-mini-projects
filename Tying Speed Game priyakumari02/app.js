const paragraphs=[
    "Scolding is something common in student life. Being a naughty boy, I am always scolded by my parents. But one day I was severely scolded by my English teacher. She infect teaches well. But that day, I could not resist the temptation that an adventure of Nancy Drew offered. While she was teaching, I was completely engrossed in reading that book. Nancy Drew was caught in the trap laid by some smugglers and it was then when I felt a light tap on my bent head. The teacher had caught me red handed. She scolded me then and there and insulted me in front of the whole class. I was embarrassed. My cheeks burned being guilty conscious. When the class was over, I went to the teacher to apologize. When she saw that I had realized my mistake, she cooled down and then told me in a very kind manner how disheartening it was when she found any student not paying attention. I was genuinely sorry and promised to myself never to commit such a mistake again.",

    "The mythical scottish town of Brigadoon appears for one day every 100 years. January named after the Roman god Janus. Influenza got it's name from the fact that people believed the disease was because of the veil 'influence' of stars. During the middle ages, it was widely believed that men had one less rib than women, This is because of the story in the Bible that Eve had been created out of Adam's rib.",

    "China was the first country to introduce paper money in 812, but it wasn't until 1661 that a bank (Banco-Sedlar of Sweden) issued banknotes. If the arm of King Henry 1 of England had benn 42 inches long, the unit of measure of a 'foot' today would be fourteen inches. But his arm happened to be 36 inches long and he decreed that the 'standard' foot should be one-third that length: 12 inches.",

    "It was their first date and she had been looking forward to it the entire week. She had her eyes on him for months, and it had taken a convoluted scheme with several friends to make it happen, but he'd finally taken the hint and asked her out. After all the time and effort she'd invested into it, she never thought that it would be anything but wonderful. It goes without saying that things didn't work out quite as she expected.",

    "She looked at her little girl who was about to become a teen. She tried to think back to when the girl had been younger but failed to pinpoint the exact moment when she had become a little too big to pick up and carry. It hit her all at once. She was no longer a little girl and she stood there speechless with fear, sadness, and pride all running through her at the same time.",

    "He had three simple rules by which he lived. The first was to never eat blue food. There was nothing in nature that was edible that was blue. People often asked about blueberries, but everyone knows those are actually purple. He understood it was one of the stranger rules to live by, but it had served him well thus far in the 50+ years of his life.",

    "If you can imagine a furry humanoid seven feet tall, with the face of an intelligent gorilla and the braincase of a man, you'll have a rough idea of what they looked like -- except for their teeth. The canines would have fitted better in the face of a tiger, and showed at the corners of their wide, thin-lipped mouths, giving them an expression of ferocity.",

    "The cab arrived late. The inside was in as bad of shape as the outside which was concerning, and it didn't appear that it had been cleaned in months. The green tree air-freshener hanging from the rearview mirror was either exhausted of its scent or not strong enough to overcome the other odors emitting from the cab. The correct decision, in this case, was to get the hell out of it and to call another cab, but she was late and didn't have a choice.",

    "I recently discovered I could make fudge with just chocolate chips, sweetened condensed milk, vanilla extract, and a thick pot on slow heat. I tried it with dark chocolate chunks and I tried it with semi-sweet chocolate chips. It's better with both kinds. It comes out pretty bad with just the dark chocolate. The best add-ins are crushed almonds and marshmallows -- what you get from that is Rocky Road. It takes about twenty minutes from start to fridge, and then it takes about six months to work off the twenty pounds you gain from eating it. All things in moderation, friends. All things in moderation.",

    "Her mom had warned her. She had been warned time and again, but she had refused to believe her. She had done everything right and she knew she would be rewarded for doing so with the promotion. So when the promotion was given to her main rival, it not only stung, it threw her belief system into disarray. It was her first big lesson in life, but not the last.",

    "Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.",

    "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",

    "He wondered if he should disclose the truth to his friends. It would be a risky move. Yes, the truth would make things a lot easier if they all stayed on the same page, but the truth might fracture the group leaving everything in even more of a mess than it was not telling the truth. It was time to decide which way to go."
]
var sizeOfArray= paragraphs.length, index=0, txt, len=0, startTime=0, y, words=0, i=0, start=0, cnt=0, wrongWord=0, inputLen=0;
var startButton= document.querySelector('.startt');
var displayUnit= document.querySelector('.randomParagraphGenerated');
var inputUnit= document.querySelector('#paragraphInput');
var endButton= document.querySelector('.donee');
var startOver= document.querySelector('.startOver');
startButton.addEventListener('click',startTyping);
endButton.addEventListener('click',endTyping);
startOver.addEventListener('click',startAgain);

// A RANDOM PARAGRAPH IS GENERATED FOR TYPING
function generateRandomParagraph(){
    index= Math.floor(Math.random()*sizeOfArray);
    txt= paragraphs[index];
    len= txt.length;
    $('.randomParagraphGenerated').html('');
    const singleLetter= txt.split('');
    singleLetter.forEach(character=>{
        const charSpan= document.createElement('span');
        charSpan.innerText= character;
        displayUnit.appendChild(charSpan);
    })
    // $('#paragraphInput').html("");

    console.log(inputUnit.innerHTML+"hi");
}

//THE USER INPUT IS EVALUATED
inputUnit.addEventListener('input',()=>{
    if(start==0){inputUnit.innerHTML="";return;}

    inputLen= inputUnit.value.length;
    // console.log(inputLen);
    const givenPara= displayUnit.querySelectorAll('span');
    const arrayPara= inputUnit.value.split('');
    givenPara.forEach((charSpan,index) =>{
       const character= arrayPara[index];
       if(character==null){
        charSpan.classList.remove('correct');
        charSpan.classList.remove('incorrect');
       }
       else if(character==charSpan.innerText){
           charSpan.classList.add('correct');
           charSpan.classList.remove('incorrect');
       }
       else if(character!=charSpan.innerText){
           charSpan.classList.remove('correct');
           charSpan.classList.add('incorrect');
       }
    })
   
})
// END TYPING AND EVALUATE
function endTyping(){
    words=0; wrongWord=0;
   const givenPara= displayUnit.querySelectorAll('span');
   const arrayInput= inputUnit.value.split('');
   givenPara.forEach((charSpan,index)=>{
       const c1= arrayInput[index];
       if(c1!=charSpan.innerText){wrongWord++;}
       words++;
   })
   clearInterval(y);
   let accuracy= ((words-wrongWord)/words) * 100;
   accuracy= accuracy.toFixed(2);
   $('#ac').html(accuracy);
   $('#wpm').html(speed);
   $('#acc').html(accuracy);
   $('#spd').html(speed);
   $('.overlay').show();
   document.body.classList.add('overlay-is-open');
//    $('.startt').html('RESTART TEST');   
}

function startAgain(){
   $('.overlay').hide(); 
   document.body.classList.remove('overlay-is-open');
   $('.startt').show(); 
   $('.guidelines').show();
   $('#paragraphInput').val("");
   $('.answer').hide();
   $('#spd').html('0');
   $('.speed').hide();
   start=0; timePassed=0; words=0;
}

//FUNCTION TO START THE PROCESS
function startTyping(){
    start++;
    $('.speed').show();
    $('.startt').hide();
    $('.guidelines').hide();
    $('.answer').show();
    $('.accuracy').hide();
     generateRandomParagraph();
     startTime= new Date().getTime();
     words=0;
     document.getElementById('paragraphInput').value= null;
     inputLen=0;
     y= setInterval(timer,600);
     document.querySelector('#paragraphInput').focus();
     console.log(inputUnit.innerText);
}
let timePassed=0,speed=0;

// TIMER
function timer(){
    let currentTime= new Date().getTime();
    timePassed= (currentTime- startTime)/1000;
    speed= Math.round((inputLen*12)/timePassed);
    document.querySelector('#spd').innerHTML= speed;
    // console.log(speed);
    // console.log(inputLen+"hi")
}

 
