import { $, $$ } from "./index.js";

const demoText =
	`
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
`;

const demoText2 =
	`
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
<div class="skeleton skeleton-text2"> </div>
`;



const planetsLocalData = {
	"mercury": {
		"url": "https://images.unsplash.com/photo-1614724723656-457e78e0b50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1117&q=80",
		"info": "Mercury is the smallest planet in our solar system. It's the closest planet to our Sun and a little bigger than Earth's Moon. From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter.",
		"discoveredBy": "Mercury was first observed through telescopes in the seventeenth century by astronomers Galileo Galilei and Thomas Harriot.",
		"escVelocity": "4.25",
		"avgTemp": "333°F or 167°C",
		"themeColor": "#fbb00e"
	},

	"venus": {
		"url": "https://images.unsplash.com/photo-1630693912525-7a833b62c81f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1615&q=80",
		"info": "Venus is the second planet from the Sun and Earth's closest planetary neighbor. It's the hottest planet in our Solar System and also one of the four inner, terrestrial (or rocky) planets, and it's often called Earth's twin because it's similar in size and density.",
		"discoveredBy": "There is no single person who is credited with the discovery of Venus. Since Venus is so bright and noticable in the sky, it was probably seen by the first groups of humans.",
		"escVelocity": "10.36",
		"avgTemp": "867°F or 464°C",
		"themeColor": "#f6bb2b"
	},

	"earth": {
		"url": "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
		"info": "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things. Earth is the only world in our Solar System with liquid water on the surface.",
		"discoveredBy": "Earth was never formally 'discovered' because it was never an unrecognized entity by humans.",
		"escVelocity": "11.2",
		"avgTemp": "59°F or 15°C",
		"themeColor": "#5592c6"
	},

	"mars": {
		"url": "https://images.unsplash.com/photo-1630694093867-4b947d812bf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1615&q=80",
		"info": "Mars is the fourth planet from the Sun, a dusty, cold, desert world with a very thin atmoshpere. Mars is also a dynamic planet with seasons, polar ice caps, canyons, extinct volcanoes, and evidence that it was even more active in the past.",
		"discoveredBy": "The first telescopic observation of Mars was by Galileo Galilei in 1610. Within a century, astronomers discovered distinct albedo features on the planet, including the dark patch Syrtis Major Planum and polar ice caps.",
		"escVelocity": "5.027",
		"avgTemp": "-85°F or -65°C",
		"themeColor": "#f9825d"
	},

	"jupiter": {
		"url": "https://images.unsplash.com/photo-1630839437035-dac17da580d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1615&q=80",
		"info": "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.",
		"discoveredBy": "While Jupiter has been known since ancient times, the first detailed observations of this planet were made by Galileo Galilei in 1610 with a small telescope.",
		"escVelocity": "59.5",
		"avgTemp": "-166°F or -110°C",
		"themeColor": "#e96a76"
	},

	"saturn": {
		"url": "https://images.unsplash.com/photo-1637984135921-301a7d39e3b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1615&q=80",
		"info": "Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. Adorned with thousands of beautiful ringlets, Saturn is unique among the planets.",
		"discoveredBy": "Saturn was the most distant of the five planets known to the ancients. In 1610, Italian astronomer Galileo Galilei was the first to gaze at Saturn through a telescope.",
		"escVelocity": "35.5",
		"avgTemp": "-220°F or -140°C",
		"themeColor": "#eba357"
	},

	"uranus": {
		"url": "https://images.unsplash.com/photo-1639874897442-8b6d5a181cf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1615&q=80",
		"info": "Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.",
		"discoveredBy": "The planet Uranus was discovered by William Herschel on March 13, 1781. He discoverd Uranus while surveying stars in the night sky using a telescope that he had built himself.",
		"escVelocity": "21.3",
		"avgTemp": "-320°F or -195°C",
		"themeColor": "#89ebff"
	},

	"neptune": {
		"url": "https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1615&q=80",
		"info": "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system. Neptune was first predicted by mathematics before its discovery.",
		"discoveredBy": "The planet Neptune was mathematically predicted by Urbain Le Verrier, before it was directly observed by astronomer Johann Gottfried Galle on the night of September 23-24, 1846.",
		"escVelocity": "23.5",
		"avgTemp": "-330°F or -200°C",
		"themeColor": "#97b7ff"
	}
};


const createPlanetCard = (apiData, localData) => {

	// cloning <planetCard> template
	const planetCardWrap = $('#planets__card--template').content.cloneNode(true).children[0];

	// for planet title
	const planetTitle = planetCardWrap.querySelector('.planets__card--title');
	planetTitle.textContent = apiData.englishName;

	// for local information 
	const planetLocalInfo = planetCardWrap.querySelectorAll('.planets__card--info-local');
	planetLocalInfo.forEach(item => {
		item.innerHTML = demoText;
	});

	// for image shadow
	const planetImgWrap = planetCardWrap.querySelector('.planets__card--img');
	// planetImgWrap.style.boxShadow = `0 .1rem .5rem 0 ${localData.themeColor}`;

	// for image and it's alt
	const planetImgSrc = planetCardWrap.querySelector('.planets__card--img-src');
	planetImgSrc.src = localData.url;
	planetImgSrc.style.boxShadow = `0 .1rem .5rem 0 ${localData.themeColor}`;


	// discovered by
	const planetDiscoverdBy = planetCardWrap.querySelector('.discovered-by');
	planetDiscoverdBy.innerHTML = demoText;
	// planetDiscoverdBy.textContent = localData.discoveredBy;

	const technicalInfo =
		`
    ${apiData.englishName} has an average temperature of ${localData.avgTemp}. 
    It has an axial tilt of ${apiData.axialTilt} degrees and is inclined ${apiData.inclination}° to ecliptic. 
    ${apiData.englishName} has a density of ${apiData.density} g/cm³. It's equator radius is about 
    ${apiData.equaRadius} km, with a polar radius of ${apiData.polarRadius} km. 
    The gravity on ${apiData.englishName} is ${apiData.gravity} m/s², which can be 
    escaped by travelling at ${localData.escVelocity} km/s.
    `;

	const technicalInfoWrap = planetCardWrap.querySelector('.technical-info');
	technicalInfoWrap.innerHTML = demoText2;

	// moon: planet name
	planetCardWrap.querySelector('.name').textContent = apiData.englishName;

	// for moons
	const planetMoons = apiData.moons;
	const moonList = planetCardWrap.querySelector('.moon__list');

	if (!planetMoons) {
		const emptyItem = document.createElement('li');
		emptyItem.classList.add('moon__list--items');
		emptyItem.textContent = `${apiData.englishName} has no moon(s)`;
		// emptyItem.style.backgroundColor = localData.themeColor;

		moonList.append(emptyItem);
	}
	else {
		planetMoons.forEach(item => {
			const moonListItems = document.createElement('li');
			moonListItems.classList.add('moon__list--items');
			moonListItems.textContent = item.moon;
			// moonListItems.style.backgroundColor = localData.themeColor;

			moonList.append(moonListItems);
		});
	}

	// appending <template> to container
	$('.planets__container').append(planetCardWrap);

	planetImgSrc.addEventListener('load', (e) => {
		e.target.classList.remove('skeleton', 'skeleton-image');
		planetImgSrc.alt = `image of ${apiData.englishName}`;

		// for planet title
		planetTitle.classList.remove('skeleton');
		planetTitle.removeAttribute('id');
		planetTitle.style.color = localData.themeColor;

		// for local planet information
		planetLocalInfo.forEach(item => {
			item.innerHTML = '';
			item.textContent = localData.info;
		});

		// for discovered by information
		planetDiscoverdBy.innerHTML = '';
		planetDiscoverdBy.classList.remove('bs');
		planetDiscoverdBy.textContent = localData.discoveredBy;

		// for technical information
		technicalInfoWrap.innerHTML = '';
		technicalInfoWrap.textContent = technicalInfo;

		// for moon-list items
		planetCardWrap.querySelector('.moon__of').classList.remove('skeleton', 'skeleton-text2');
		moonList.classList.remove('skeleton');
		moonList.removeAttribute('id');

		$$('.moon__list--items').forEach(item => {
			item.style.backgroundColor = localData.themeColor;
			item.style.color = "black";
		})

	});

}



export async function getPlanet(planet = "earth") {
	try {
		const PLANET_URL =
			`https://api.le-systeme-solaire.net/rest/bodies/${planet}`;

		const response = await fetch(PLANET_URL);
		const planetData = await response.json();

		// clearing container for each call
		$('.planets__container').innerHTML = '';

		// function call
		createPlanetCard(planetData, planetsLocalData[planet]);


	} catch (err) {
		console.error(err);
	}
}

