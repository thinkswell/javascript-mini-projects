const allQuotes = [
    {sentence: "Two things are infinite: the universe and human stupidity, and I'm not sure about the universe.", person: "Albert Einstein"},
    {sentence:"You can't reason with a tiger when your head is in its mouth." , person:"Winston Churchill"},
    {sentence:"An appeaser is one who feeds a crocodile, hoping it will eat him last.", person:"Winston Churchill"},
    {sentence:"Peace will come when the Arabs will love their children more than they hate us.", person:"Golda Meir"},
    {sentence:"Anyone who doesn't belive in miracles is not a realist." , person:"David Ben Gurion" },
    {sentence:"We Jews have a secret weapon in our struggle with the Arabs; We have no place to go." , person: "Golda Meir" },
    {sentence:"We shall fight in France, we shall fight on the seas and oceans, we shall fight with growing confidence and growing strength in the air, we shall defend our island, whatever the cost may be. We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender." , person: "Winston Churchill"},
    {sentence:"One thing can't be defeated is love.You can conquer hate by ignoring it. You can destroy it by loving the person next to you. So I want everybody here tonight to look at the person standing next to you and just tell them you love them or happy that they are here with you tonight and having a good time, listening to music,celebrating life. We don't care what are you look like,we don't care where are you come from,we don't care what you believe in.We love every single one of you out there and nothing will ever change that." , person:"Chester Bennington" },
    {sentence:"When life leaves us blind, love keeps us kind." , person: "Chester Bennington" },
    {sentence:"I try so hard and got so far in the end it doesn't even matter" , person: "Chester Bennington"},
    {sentence:"Have you got colour in your cheecks?", person:"Alex Turner"}
];

const generateQuote = () => {
    let {sentence,person} = allQuotes[Math.floor(Math.random()*allQuotes.length)];
    const formattedSentence = `\"`.concat(sentence).concat(`\"`);
    const formattedPerson = ` - `.concat(person);
    document.querySelector("div.quote").textContent = formattedSentence;
    document.querySelector("div.person").textContent = formattedPerson;
    document.querySelector("a.twitter-share-button").setAttribute("data-size",formattedSentence.concat(formattedPerson))
}

document.getElementById("generate").addEventListener("click", generateQuote)