var randomQuotes =[
'Leaders Are Never Satisfied; They Continually Strive To Be Better.',
'Leaders Are Innovative, Entrepreneurial, And Future-Oriented. They Focus On Getting The Job Done',
'Entrepreneurial Leadership Requires The Ability To Move Quickly When Opportunity Presents Itself.',
'Leadership Is More Who You Are Than What You Do.',
'Respect Is The Key Determinant Of High-Performance Leadership. How Much People Respect You Determines How Well They Perform.',
'The Three C\'s Of Leadership Are Consideration, Caring, And Courtesy. Be Polite To Everyone.',
'Leaders Concentrate Single-Mindedly On One Thing - The Most Important Thing, And They Stay At It Until It\'s Complete.',
'The True Test Of Leadership Is How Well You Function In A Crisis.',
'Leaders Are Anticipatory Thinkers. They Consider All Consequences Of Their Behaviors Before They Act.',
'Superior Leaders Are Willing To Admit A Mistake And Cut Their Losses. Be Willing To Admit That You\'ve Changed Your Mind. Don\'t Persist When The Original Decision Turns Out To Be A Poor One.',
'Practice Golden Rule Management In Everything You Do. Manage Others The Way You Would Like To Be Managed.'
]


function randomQuote(){
	var randomquoteNumber=Math.floor(Math.random()*(randomQuotes.length));
	document.getElementById('displayQuote').innerHTML = randomQuotes[randomquoteNumber]	
}

