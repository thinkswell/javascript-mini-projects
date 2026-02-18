function rollDice(){

let dice=document.getElementById("dice")
let result=document.getElementById("result")

let number=Math.floor(Math.random()*6)+1

dice.innerHTML=number

result.innerHTML="You rolled: "+number

gsap.fromTo(dice,
{rotation:0,scale:0},
{rotation:360,scale:1,duration:0.5}
)

}
