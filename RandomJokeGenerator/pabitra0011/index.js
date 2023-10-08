
let jokes = ["What do you call a belt made of watches? A waist of time.",
  "What do you call a fake noodle? An impasta.",
  "What happens when a strawberry gets run over crossing the street? Traffic jam.",
  "What do you call two monkeys that share an Amazon account? Prime mates.",
  "What do you call a pony with a sore throat? A little hoarse.",
  "Where do math teachers go on vacation? Times Square.",
  "Whenever I try to eat healthy, a chocolate bar looks at me and Snickers.",
  "What does garlic do when it gets hot? It takes its cloves off.",
  "What's a robot's favorite snack? Computer chips.",
  "How much does it cost Santa to park his sleigh? Nothing, it's on the house.",
  "Mountains aren't just funny. They're hill areas.",
  "What do clouds wear? Thunderwear.",
  "Why are piggy banks so wise? They're filled with common cents.",
  "Why is Peter Pan always flying? He neverlands.",
  "How do you get a good price on a sled? You have toboggan.",
  "How can you tell if a tree is a dogwood tree? By its bark.",
  "I used to hate facial hair, but then it grew on me.",
  "It's inappropriate to make a 'dad joke' if you're not a dad. It's a faux pa.",
  "What do you call a hot dog on wheels? Fast food!",
  "Where do young trees go to learn? Elementree school.",
  "Did you hear about the circus fire? It was in tents.",
  "Can February March? No, but April May!",
  "How do lawyers say goodbye? We'll be suing ya!",
  "Wanna hear a joke about paper? Never mind—it's tearable.",
  "What's the best way to watch a fly fishing tournament? Live stream.",
  "Spring is here! I got so excited I wet my plants.",
  "I could tell a joke about pizza, but it's a little cheesy.",]

let n = jokes.length - 1;


btn.addEventListener('click', function () {
  let random = Math.floor((Math.random() * 20));
  let change = document.querySelector(".joke");
  change.innerHTML = `" ${jokes[random]} "`;
})

setInterval(function () {
  upcomming.classList.toggle("blink")
}, 900)