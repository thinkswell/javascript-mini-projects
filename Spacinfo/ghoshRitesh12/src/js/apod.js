import { $ } from "./index.js";
import { API_KEY } from "./apikey.js";

const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const addZero = (time) => time < 10 ? `0${time}` : time;

function todaysDate() {
	const d = new Date();
	const date =
		`${d.getFullYear()}-${addZero(d.getMonth() + 1)}-${addZero(d.getDate())}`;
	return date;
}


export function modifyDate(inputDate) {
	const month = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
	];
	const d = new Date(inputDate);
	const newDate =
		`on ${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

	return newDate;
}

const skeletonDate =
	`
    <div class="skeleton skeleton-apod__date">
        on 11th May, 2022
    </div> 
`;


const skeletonExplanation =
	`
    <div class="skeleton skeleton-explanation"> </div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
    <div class="skeleton skeleton-explanation"></div>
`;

const skeletonTitle =
	`
    <div class="skeleton skeleton-apod__title"></div>
    <div class="skeleton skeleton-apod__title"></div>
`;


async function createApod(apiData) {
	try {
		// cloning <template>
		const apodWrap = $('#apod__template').content.cloneNode(true).children[0];


		// for topic title
		const apodTopicTitle = apodWrap.querySelector('.apod__topic--title');
		apodTopicTitle.classList.add('skeleton', 'skeleton-apod__topic--title');

		// date, img src & hdurl
		const dateInfo = modifyDate(apiData.date);
		const date = apodWrap.querySelector('.apod__date');
		date.innerHTML = skeletonDate;

		// for setting sapod date
		$('.sapod__search--date').value = apiData.date;

		// for img source
		const imgSrc = apodWrap.querySelector('.apod__image--src');
		imgSrc.src = apiData.url;

		apodWrap.querySelector('.apod__image--hdurlsrc').href = apiData.hdurl;

		// for information section hdurl
		apodWrap.querySelector('.apod__info--hdurl').href = apiData.hdurl;

		// copyright
		const copyrightData = (apiData.copyright) ? `© ${apiData.copyright}` : `© NASA`;
		const copyright = apodWrap.querySelector('.apod__image--copyright');
		copyright.innerHTML =
			`<div class="skeleton skeleton-apod__copyright"> ${copyrightData} </div>`;

		// for title
		const titleData = apiData.title
		const title = apodWrap.querySelector('.apod__info--title');
		title.innerHTML = skeletonTitle;

		// for explanation
		const explanationData = apiData.explanation;
		const explanation = apodWrap.querySelector('.apod__info--explanation');
		explanation.innerHTML = skeletonExplanation;


		// appending cloned <template> to page container
		await $('.apod__container').append(apodWrap);

		// for exiting skeleton loading, once the image loads
		imgSrc.addEventListener("load", e => {
			e.target.parentElement.classList.remove('skeleton', 'skeleton-image');
			explanation.innerHTML = '';
			explanation.textContent = explanationData;

			title.innerHTML = '';
			title.textContent = titleData;

			apodTopicTitle.classList.remove('skeleton', 'skeleton-apod__topic--title');

			$('.apod__container').classList.remove('hstretch');

			date.innerHTML = '';
			date.textContent = dateInfo;

			copyright.innerHTML = '';
			copyright.textContent = copyrightData;

			$('.apod__info--hdurl-wrap').classList.remove('skeleton', 'skeleton-apod__hdurl');

		});
	}

	catch (error) {
		console.log(error);
	}
}


const CACHE_NAME = "Apod";
export async function getApod() {
	try {
		// const response = await fetch(APOD_URL);
		// const apodData = await response.json();
		let cacheResp, apiData;
		const newDate = todaysDate();
		const apodCache = await caches.open(CACHE_NAME);

		caches.has(CACHE_NAME)
			.then(async () => {
				cacheResp = await caches.match(APOD_URL);
				apiData = await cacheResp.json();

				if (newDate !== apiData.date) {
					await apodCache.add(APOD_URL);
					cacheResp = await caches.match(APOD_URL);
					apiData = await cacheResp.json();
				}
			})
			.catch(async () => {
				await apodCache.add(APOD_URL);
				cacheResp = await caches.match(APOD_URL);
				apiData = await cacheResp.json();
			})
			.finally(async () => {
				await createApod(apiData)
				window.scrollTo(0, 0);
			});
	}
	catch (err) {
		console.error(err);
	}
}


// SAPOD ASYNC API FETCH
function createSapod(respData) {

	// cloning <sapod> template
	const sapodWrap = $('#sapod__template').content.cloneNode(true).children[0];

	// for date
	$('.sapod__search--date').value = respData.date;

	// for sapod image source
	const imageSrc = sapodWrap.querySelector('.sapod__image--src');
	imageSrc.src = respData.url;

	sapodWrap.querySelector('.sapod__image--hdurlsrc').href = respData.hdurl;
	sapodWrap.querySelector('.sapod__info--hdurl').href = respData.hdurl;

	// sapod title,
	const titleData = respData.title;
	const title = sapodWrap.querySelector('.sapod__info--title');
	title.innerHTML = `${skeletonTitle}`;

	// explanation,
	const explanationData = respData.explanation;
	const explanation = sapodWrap.querySelector('.sapod__info--explanation');
	explanation.innerHTML = `${skeletonExplanation}`

	// copyright
	const copyrightData = (respData.copyright) ? `© ${respData.copyright}` : `© NASA`;
	const copyright = sapodWrap.querySelector('.sapod__image--copyright');
	copyright.innerHTML =
		`<div class="skeleton skeleton-apod__copyright"> ${copyrightData} </div>`;


	// erasing the previous value
	$('.sapod--info__container').innerHTML = '';

	// appending cloned <template> to sapod info container
	$('.sapod--info__container').append(sapodWrap);

	// for existing skeleton loading, once the image loads
	imageSrc.addEventListener('load', e => {
		e.target.parentElement.classList.remove('skeleton', 'skeleton-image');
		explanation.innerHTML = '';
		explanation.textContent = explanationData;

		title.innerHTML = '';
		title.textContent = titleData;

		copyright.innerHTML = '';
		copyright.textContent = copyrightData;

		$('.sapod__info--hdurl-wrap').classList.remove('skeleton', 'skeleton-apod__hdurl');

	});
}


export const getSapod = async (keyDate) => {
	try {
		const SAPOD_URL = `https://api.nasa.gov/planetary/apod?date=${keyDate}&api_key=${API_KEY}`;

		const response = await fetch(SAPOD_URL);
		const sapodData = await response.json();
		createSapod(sapodData);


	} catch (err) {
		console.error(err);
	}
}

