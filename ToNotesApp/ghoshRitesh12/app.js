"use strict";

/*---- Selectors ----*/
const $ = a => document.querySelector(a);
const $$ = ab => document.querySelectorAll(ab);
/*---- End Selectors ----*/

/*---- Icons ----*/
const backIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="#dfdfdf" d="M16.88 2.88a1.25 1.25 0 0 0-1.77 0L6.7 11.29a.996.996 0 0 0 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77z"/>
    </svg>`;

const optionIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="white" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z"/>
    </svg>`;

const pendingIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="#dfdfdf" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2zm3.55 13.8l-4.08-2.51c-.3-.18-.48-.5-.48-.85V7.75c.01-.41.35-.75.76-.75s.75.34.75.75v4.45l3.84 2.31c.36.22.48.69.26 1.05c-.22.35-.69.46-1.05.24z"/>
    </svg>`;

const incompIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
        <path fill="none" stroke="#dfdfdf" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.75 8.75l3.5 3.5l7-7.5"/>
    </svg>`;

const compIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="none" />
            <g fill="none" stroke="#dfdfdf" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M14.25 8.75c-.5 2.5-2.385 4.854-5.03 5.38A6.25 6.25 0 0 1 3.373 3.798C5.187 1.8 8.25 1.25 10.75 2.25"/><path d="m5.75 7.75l2.5 2.5l6-6.5"/>
        </g>
    </svg>`;

const unfavIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="#dfdfdf" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"/>
    </svg>`;

const favIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="#dfdfdf" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"/>
    </svg>`;

const deleteIcon =
	`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">.
        <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
        <path fill="#ff6886" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/>
    </svg>`;

/*---- End icons ----*/

/*---- FUNCTIONS ----*/

/*-- GlobalEventListener() using Event Delegation --*/
function addGlobalEventListener(type, selector, callback) {
	document.addEventListener(type, e => {
		if (e.target.matches(selector)) {
			callback(e);
		}
	});
}

/*-- function to add zero before a number --*/
const addZero = (time) => time < 10 ? `0${time}` : time;

// for indexing notes acc to db
let dbNotes = [];

/*-- function for getting instant date --*/
function fetchDate() {
	let p = new Date();

	const day = ["Sun", "Mon", "Tue",
		"Wed", "Thu", "Fri", "Sat"];
	const month = ["Jan", "Feb", "Mar", "Apr", "May",
		"June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	let dateFormat =
		`${day[p.getDay()]}, ${addZero(p.getDate())} ${month[p.getMonth()]} ${p.getFullYear()}, ${addZero(p.getHours())}:${addZero(p.getMinutes())}`;
	// Sat, 12 March 2022, 19:25
	return dateFormat;
}

localforage.config({
	driver: [
		localforage.INDEXEDDB,
		localforage.WEBSQL
	],
	name: "Notes Application"
});

(function readAccount() {
	localforage.getItem('account')
		.then(res => JSON.parse(res))
		.then(data => {
			// for text content
			$('[data-logo="inner"]').textContent = data[0];
			$('[data-logo="outer"]').textContent = data[0];
			// for color
			$('[data-logo="inner"]').style.backgroundColor = data[1];
			$('.head_hero-avatar').style.backgroundColor = data[1];
			// for saving name
			$('.avatar-name').textContent = data[2];
		})
		.catch(err => console.error(err));
})();

function updateAccountInfo() {
	const avatarInfo = [];
	const innerLogo = $('[data-logo="inner"]').innerText || "😄";
	const innerLogoColor = $('[data-logo="inner"]').style.backgroundColor;
	const avatarName = ($('.avatar-name').innerText === "\n") ? "Your name..." : $('.avatar-name').innerText;
	avatarInfo.push(innerLogo, innerLogoColor, avatarName);
	localforage.setItem('account', JSON.stringify(avatarInfo));
}

(function readUpdate() {
	localforage.getItem('notes')
		.then(value => JSON.parse(value))
		.then(val => {
			val.forEach(item => {
				getNote(
					item.element, item.iComp, item.iFav, item.oComp, item.oFav, item.title,
					item.dateCreate, item.dateModify, item.noteCotent,
					item.noteCotentHeight
				);
			});
		})
		.catch(err => console.log(err));
})();

function update() {
	const parentNotes = Array.from($$('.main-section-notes'));
	dbNotes = parentNotes.map(item => {
		return {
			element: item.classList,
			iFav: item.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerHTML,
			iComp: item.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.lastElementChild.innerHTML,
			oFav: item.firstElementChild.nextElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML,
			oComp: item.firstElementChild.nextElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.innerHTML,
			title: item.lastElementChild.previousElementSibling.previousElementSibling.firstElementChild.textContent,
			noteCotent: item.lastElementChild.previousElementSibling.value,
			noteCotentHeight: item.lastElementChild.previousElementSibling.style.height,
			dateCreate: item.lastElementChild.previousElementSibling.previousElementSibling.lastElementChild.firstElementChild.firstElementChild.textContent,
			dateModify: item.lastElementChild.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.textContent
		}
	});

	// localforage.setItem('notes',JSON.stringify(dbNotes));

	localforage.getItem('notes')
		.then(value => {
			if (value) {
				localforage.removeItem('notes')
					.then(() => localforage.setItem('notes', JSON.stringify(dbNotes)))
			}
			else
				localforage.setItem('notes', JSON.stringify(dbNotes));
		})
}

const getNote = (nClasses, comp, fav, opComp, opFav, nTitle = "Untitled",
	dCreate, dModify, nContent = "", nContentHeight) => {
	/* Creating actual notes container(notesArea) */
	const notesArea = document.createElement('section');
	notesArea.classList.add('main-section-notes');

	let k;
	for (k = 1; k <= 2; k++) {
		if (nClasses[k] !== undefined)
			notesArea.classList.add(nClasses[k]);
	}

	/* Part 1: notes navigation */
	const notesNav = document.createElement('nav');
	notesNav.classList.add('main-section-notes-nav');
	const backBtn = document.createElement('div');
	backBtn.classList.add('main-section-notes-nav_backBtn', 'flex');
	backBtn.innerHTML = `${backIcon} Back`;

	const favCompBtns = document.createElement('aside');
	favCompBtns.classList.add('main-section-notes-nav_favCompBtns', 'flex');
	const favoriteBtn = document.createElement('div');
	favoriteBtn.classList.add('main-section-notes-nav_favoriteBtn');
	favoriteBtn.setAttribute('data-state', 'unfav');
	favoriteBtn.innerHTML = fav;
	const completeBtn = document.createElement('div');
	completeBtn.classList.add('main-section-notes-nav_completeBtn');
	completeBtn.setAttribute('data-state', 'incomp');
	completeBtn.innerHTML = comp;
	favCompBtns.append(favoriteBtn, completeBtn);
	notesNav.append(backBtn, favCompBtns);
	/* End part 1: notes navigation */

	/* Part 2: notes information */
	const notesInfo = document.createElement('section');
	notesInfo.classList.add('main-section-notes-info');

	const notesTitle = document.createElement('p');
	notesTitle.classList.add('main-section-notes-info_title');
	notesTitle.setAttribute('contenteditable', 'true');
	notesTitle.setAttribute('data-placeholder', 'Untitled..');

	notesTitle.textContent = nTitle || "Untitled";

	/* creating notes area caption that contains
	notes title and options */
	const notesAreaCaption = document.createElement('div');
	notesAreaCaption.classList.add('main-section-notes-caption');
	// minimized note title
	const notesAreaTitle = document.createElement('p');
	notesAreaTitle.classList.add('main-section-notes-title');
	notesAreaTitle.textContent = `📑 ${notesTitle.textContent}`;
	notesAreaCaption.append(notesAreaTitle);

	// notes option dots
	const notesAreaOptionDots = document.createElement('div');
	notesAreaOptionDots.classList.add('main-section-notes-optionDots');
	notesAreaOptionDots.innerHTML = optionIcon;
	// actual notes options
	const notesOptions = document.createElement('section');
	notesOptions.classList.add('main-section-notes-options');
	const notesOptionsTitle = document.createElement('p');
	notesOptionsTitle.classList.add('main-section-notes-optionsTitle');
	notesOptionsTitle.textContent = `${notesAreaTitle.textContent}`;
	const notesOptionsComplete = document.createElement('div');
	notesOptionsComplete.classList.add('main-section-notes-nav_completeBtn');
	notesOptionsComplete.setAttribute('data-state', 'incomp');
	notesOptionsComplete.innerHTML = opComp;
	const notesOptionsFavorite = document.createElement('div');
	notesOptionsFavorite.classList.add('main-section-notes-nav_favoriteBtn');
	notesOptionsFavorite.setAttribute('data-state', 'unfav');
	notesOptionsFavorite.innerHTML = opFav;
	const notesOptionsDelete = document.createElement('div');
	notesOptionsDelete.classList.add('main-section-notes-optionsDelete');
	notesOptionsDelete.innerHTML =
		`${deleteIcon}
        Move to Trash`;
	const notesOptionsCancel = document.createElement('div');
	notesOptionsCancel.classList.add('main-section-notes-optionsCancel');
	notesOptionsCancel.innerHTML = `Cancel`;
	// appending all notes options to notesOptions parent
	notesOptions.append(notesOptionsTitle, notesOptionsComplete, notesOptionsFavorite, notesOptionsDelete, notesOptionsCancel);
	// appending parent notesOptions to grandparent notesAreaOptionDots
	notesAreaOptionDots.append(notesOptions);

	notesAreaCaption.append(notesAreaOptionDots);

	const notesDate = document.createElement('div');
	notesDate.classList.add('main-section-notes-info_date');

	const notesDateCreated = document.createElement('p');
	notesDateCreated.classList.add('main-section-notes-info_dateCreated');
	const dateCreated = document.createElement('span');
	dateCreated.classList.add('dateCreated');
	// eL{once: true} for date created 🌝
	dateCreated.textContent = dCreate;
	notesDateCreated.append('Created on ', dateCreated);

	const notesDateModified = document.createElement('p');
	notesDateModified.classList.add('main-section-notes-info_dateModified');
	const dateModified = document.createElement('span');
	dateModified.classList.add('dateModified');
	// default modified date 🌚
	dateModified.textContent = dModify;
	notesDateModified.append('Last modified ', dateModified);

	notesDate.append(notesDateCreated, notesDateModified);

	notesInfo.append(notesTitle, notesDate);
	/* End part 2: notes information */

	/* Part 3: actual editable content */
	const notesText = document.createElement('textarea');
	notesText.classList.add('main-section-notes-contentEditable');
	notesText.setAttribute('placeholder', 'Note...');

	notesText.value = nContent;
	notesText.style.height = nContentHeight;

	const notesTextPreview = document.createElement('div');
	notesTextPreview.classList.add('main-section-notes-preview');

	notesTextPreview.style.borderRadius = '.5rem';
	if (notesText.value.length >= 100)
		notesTextPreview.style.borderRadius = '.5rem .5rem 0 0';

	notesTextPreview.textContent = nContent;
	if (nContent === "")
		notesTextPreview.textContent = 'Go ahead! Write me';

	const notesPreviewStatus = document.createElement('div');
	notesPreviewStatus.classList.add('main-section-notes-preview-status');
	const statusPending = document.createElement('span');
	statusPending.classList.add('status-pending');
	statusPending.innerHTML = pendingIcon;
	const statusCompleted = document.createElement('span');
	statusCompleted.classList.add('status-completed');
	statusCompleted.innerHTML = compIcon;
	const statusFavorite = document.createElement('span');
	statusFavorite.classList.add('status-favorite');
	statusFavorite.innerHTML = favIcon;
	notesPreviewStatus.append(statusPending, statusCompleted, statusFavorite);
	/* End part 3: actual editable content */

	/* Appending all the dynamically created
	child elements to the parent */
	notesArea.append(notesTextPreview, notesAreaCaption, notesNav, notesInfo, notesText, notesPreviewStatus);

	// appending parent to grandParent
	$('.main-section-category').append(notesArea);
};

/*-- Function🍟 for dynamically adding content onClick--*/
const addNote = () => {
	/* Creating actual notes container(notesArea) */
	const notesArea = document.createElement('section');
	notesArea.classList.add('main-section-notes', 'edit', 'pending');
	// notesArea.setAttribute('data-index',`${i}`);

	/* Part 1: notes navigation */
	const notesNav = document.createElement('nav');
	notesNav.classList.add('main-section-notes-nav');
	const backBtn = document.createElement('div');
	backBtn.classList.add('main-section-notes-nav_backBtn', 'flex');
	backBtn.innerHTML = `${backIcon} Back`;

	const favCompBtns = document.createElement('aside');
	favCompBtns.classList.add('main-section-notes-nav_favCompBtns', 'flex');
	const favoriteBtn = document.createElement('div');
	favoriteBtn.classList.add('main-section-notes-nav_favoriteBtn');
	favoriteBtn.setAttribute('data-state', 'unfav');
	favoriteBtn.innerHTML = unfavIcon;
	const completeBtn = document.createElement('div');
	completeBtn.classList.add('main-section-notes-nav_completeBtn');
	completeBtn.setAttribute('data-state', 'incomp');
	completeBtn.innerHTML = incompIcon;
	favCompBtns.append(favoriteBtn, completeBtn);
	notesNav.append(backBtn, favCompBtns);
	/* End part 1: notes navigation */

	/* Part 2: notes information */
	const notesInfo = document.createElement('section');
	notesInfo.classList.add('main-section-notes-info');

	const notesTitle = document.createElement('p');
	notesTitle.classList.add('main-section-notes-info_title');
	notesTitle.setAttribute('contenteditable', 'true');
	notesTitle.setAttribute('data-placeholder', 'Untitled');
	// notesTitle.textContent = "Untitled";

	/* creating notes area caption that contains
	notes title and options */
	const notesAreaCaption = document.createElement('div');
	notesAreaCaption.classList.add('main-section-notes-caption');
	// minimized note title
	const notesAreaTitle = document.createElement('p');
	notesAreaTitle.classList.add('main-section-notes-title');
	notesAreaTitle.textContent = `📑 Untitled`;
	notesAreaCaption.append(notesAreaTitle);

	// notes option dots
	const notesAreaOptionDots = document.createElement('div');
	notesAreaOptionDots.classList.add('main-section-notes-optionDots');
	// notesAreaOptionDots.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
	notesAreaOptionDots.innerHTML = optionIcon;
	// actual notes options
	const notesOptions = document.createElement('section');
	notesOptions.classList.add('main-section-notes-options');
	const notesOptionsTitle = document.createElement('p');
	notesOptionsTitle.classList.add('main-section-notes-optionsTitle');
	notesOptionsTitle.textContent = `${notesAreaTitle.textContent}`;
	const notesOptionsComplete = document.createElement('div');
	notesOptionsComplete.classList.add('main-section-notes-nav_completeBtn');
	notesOptionsComplete.setAttribute('data-state', 'incomp');
	notesOptionsComplete.innerHTML =
		`${incompIcon}
        Mark as complete`;
	const notesOptionsFavorite = document.createElement('div');
	notesOptionsFavorite.classList.add('main-section-notes-nav_favoriteBtn');
	notesOptionsFavorite.setAttribute('data-state', 'unfav');
	notesOptionsFavorite.innerHTML =
		`${unfavIcon}
        Add to favorite`;
	const notesOptionsDelete = document.createElement('div');
	notesOptionsDelete.classList.add('main-section-notes-optionsDelete');
	notesOptionsDelete.innerHTML =
		`${deleteIcon}
        Move to Trash`;
	const notesOptionsCancel = document.createElement('div');
	notesOptionsCancel.classList.add('main-section-notes-optionsCancel');
	notesOptionsCancel.innerHTML = `Cancel`;
	// appending all notes options to notesOptions parent
	notesOptions.append(notesOptionsTitle, notesOptionsComplete, notesOptionsFavorite, notesOptionsDelete, notesOptionsCancel);
	// appending parent notesOptions to grandparent notesAreaOptionDots
	notesAreaOptionDots.append(notesOptions);

	notesAreaCaption.append(notesAreaOptionDots);

	const notesDate = document.createElement('div');
	notesDate.classList.add('main-section-notes-info_date');

	const notesDateCreated = document.createElement('p');
	notesDateCreated.classList.add('main-section-notes-info_dateCreated');
	const dateCreated = document.createElement('span');
	dateCreated.classList.add('dateCreated');
	// eL{once: true} for date created 🌝
	dateCreated.textContent = `${fetchDate()}`;
	notesDateCreated.append('Created on ', dateCreated);

	const notesDateModified = document.createElement('p');
	notesDateModified.classList.add('main-section-notes-info_dateModified');
	const dateModified = document.createElement('span');
	dateModified.classList.add('dateModified');
	// default modified date 🌚
	dateModified.textContent = `${fetchDate()}`;
	notesDateModified.append('Last modified ', dateModified);

	notesDate.append(notesDateCreated, notesDateModified);

	notesInfo.append(notesTitle, notesDate);
	/* End part 2: notes information */

	/* Part 3: actual editable content */
	const notesText = document.createElement('textarea');
	notesText.classList.add('main-section-notes-contentEditable');
	notesText.setAttribute('placeholder', 'Note...');

	const notesTextPreview = document.createElement('div');
	notesTextPreview.classList.add('main-section-notes-preview');
	notesTextPreview.textContent = 'Go ahead! Write me';
	notesTextPreview.style.borderRadius = '.5rem';

	const notesPreviewStatus = document.createElement('div');
	notesPreviewStatus.classList.add('main-section-notes-preview-status');
	const statusPending = document.createElement('span');
	statusPending.classList.add('status-pending');
	statusPending.innerHTML = pendingIcon;
	const statusCompleted = document.createElement('span');
	statusCompleted.classList.add('status-completed');
	statusCompleted.innerHTML = compIcon;
	const statusFavorite = document.createElement('span');
	statusFavorite.classList.add('status-favorite');
	statusFavorite.innerHTML = favIcon;
	notesPreviewStatus.append(statusPending, statusCompleted, statusFavorite);

	/* End part 3: actual editable content */

	/* Appending all the dynamically created
	child elements to the parent */
	notesArea.append(notesTextPreview, notesAreaCaption, notesNav, notesInfo, notesText, notesPreviewStatus);

	// appending parent to grandParent
	$('.main-section-category').append(notesArea);
};

/*---- END FUNCTIONS ----*/


/*---- Event Listeners ----*/

/*-- Avatar Related EvL --*/
addGlobalEventListener('click', '.head_hero-avatar',
	e => {
		e.target.lastElementChild.classList.add('in-view');
		$('body').style.overflowY = 'hidden';
	});

addGlobalEventListener('click', '.head_hero-avatar-profile_wrap',
	e => {
		e.target.classList.remove('in-view');
		$('body').style.overflowY = 'auto';
		// updateAccountInfo();
	});

addGlobalEventListener('click', '.avatar_close-btn',
	e => {
		e.target.parentElement.parentElement.classList.remove('in-view');
		$('body').style.overflowY = 'auto';
		// updateAccountInfo();
	});

// for setting avatar logo
$('.avatar-name').addEventListener('input', e => {
	const firstLetter = e.target.innerText[0];

	$$('.head_hero-avatar-logo').forEach(logo => {
		logo.textContent = firstLetter;
	});
	updateAccountInfo();
});

// color picker
addGlobalEventListener('input', '.avatar_color-picker',
	(e) => {
		const value = e.target.value;
		$('.head_hero-avatar').style.backgroundColor = value;
		e.target.previousElementSibling.style.backgroundColor = value;
		updateAccountInfo();
	});

addGlobalEventListener('click', '.avatar-name_edit',
	e => {
		// e.target.previousElementSibling.setAttribute('contenteditable','true');
		e.target.previousElementSibling.focus();
	});

/*-- End avatar Related EvL --*/


/*-- add button event listener --*/

$('.nav-addSign').addEventListener('click', () => {
	addNote();
	update();
});
/*-- End add button event listener --*/

/*-- Opening created note --*/
addGlobalEventListener('click', '.main-section-notes',
	(e) => {
		if (!e.target.classList.contains('edit')) {
			e.target.classList.add('edit');
		}
		// update();
	});

const categories = $$('.category-item');

// evl for found element on search
addGlobalEventListener('click', '.key',
	(e) => {
		// to show all notes as default
		e.target.parentElement.classList.remove('allNotes');

		// to make categories - pending by default
		categories.forEach(category => category.classList.remove('selected'));
		e.target.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.classList.add('selected');

		e.target.parentElement.classList.add('pending-section');

		// setting search bar value as ""
		e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.value = "";
		// remove searching class from search bar
		e.target.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.classList.remove('searching');

		$('.nav-addSign').classList.remove('hidden');

		e.target.classList.remove('key');
	})
/*-- End opening created note --*/

/*-- 🔙 backButton event listener --*/
addGlobalEventListener('click', '.main-section-notes-nav_backBtn',
	(e) => {
		e.target.parentElement.parentElement.classList.remove('edit');

		// setting 'untitled' on empty note title
		const title = e.target.parentElement.nextElementSibling.firstElementChild.textContent;
		if (title === "") {
			// note caption title
			e.target.parentElement.previousElementSibling.firstElementChild.innerHTML =
				`📑 Untitled`

			// note options title
			e.target.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.innerHTML =
				`📑 Untitled`;
		}

		update();
	});
/*-- End 🔙 backButton event listener --*/

/*-- For toggling categories --*/
categories.forEach(category => {
	category.addEventListener('click', (e) => {
		/*-- #1 Switching section-heading text highlighting selected category --*/
		$('.main-section-heading').innerText = `${e.target.innerText} : `;
		categories.forEach(category => category.classList.remove('selected'));
		e.target.classList.add('selected');


		/*-- #2 Changing class names of notesContainer according to click --*/
		const notesContainer = e.target.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.lastElementChild;
		if (e.target.classList.contains('selected')) {
			notesContainer.classList.remove('pending-section', 'completed-section', 'favorite-section', 'allNotes');
			notesContainer.classList.add(`${e.target.innerText.toLowerCase()}-section`);
		}

		// update();
	});
});
/*-- End for toggling categories --*/

/*-- Title related event listener --*/
addGlobalEventListener('input', '.main-section-notes-info_title',
	(e) => {
		const title = e.target.textContent;

		//accessing ('.dateModified') from ('.main-section-notes-info_title')
		e.target.nextElementSibling.lastElementChild.firstElementChild.textContent = fetchDate();

		// making ('.main-section-notes-title').textContent = title;
		e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.textContent = `📑 ${title}`;

		// making ('.main-section-notes-info_title').textContent = notesOptionsTitle
		e.target.parentElement.previousElementSibling.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.textContent =
			`📑 ${title}`;

		if (title.length < 1)
			title = "Untitled";

		update();
	});
/*-- End title related event listener --*/


/*-- Actual text Content related event listener --*/
addGlobalEventListener('input', '.main-section-notes-contentEditable',
	(e) => {
		// auto growing textarea's height
		e.target.style.height = `${e.target.scrollHeight}px`;

		// making ('.main-section-notes-contentEditable').textContent = value;
		const value = e.target.value;
		e.target.textContent = value;

		// accessing ('.dateModified') from ('.main-section-notes-contentEditable')
		e.target.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.textContent = fetchDate();

		// for text preview of a note
		e.target.parentElement.firstElementChild.textContent = value;
		if (!value)
			e.target.parentElement.firstElementChild.textContent = 'Go ahead! Write me';

		if (value.length <= 100)
			e.target.parentElement.firstElementChild.style.borderRadius = '.5rem';
		else
			e.target.parentElement.firstElementChild.style.borderRadius = '.5rem .5rem 0 0';

		update();
	});
/*-- End actual text Content related event listener --*/

// Opening note options
addGlobalEventListener('click', '.main-section-notes-optionDots',
	(e) => {
		e.target.lastElementChild.classList.add('active');
		$('body').style.overflowY = 'hidden';
	});

// Closing note options
addGlobalEventListener('click', '.main-section-notes-optionsCancel',
	(e) => {
		e.target.parentElement.classList.remove('active');
		$('body').style.overflowY = 'auto';
	});

/*-- Completed button related event listener --*/
addGlobalEventListener('click', '.main-section-notes-nav_completeBtn',
	(e) => {
		// for toggling complete button    

		// <if> for options complete button
		if (!e.target.parentElement.classList.contains('flex')) {
			// closing options section
			e.target.parentElement.classList.remove('active');

			if (e.target.getAttribute('data-state') === 'incomp') {
				//options section
				e.target.setAttribute('data-state', 'comp');
				e.target.innerHTML =
					`${compIcon}
                Mark as incomplete`;

				// .for adding <completed> and removing <pending> class
				e.target.parentElement.parentElement.parentElement.parentElement.classList.add('completed');
				e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('pending');

				//inner section
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild.innerHTML = compIcon;
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild.setAttribute('data-state', 'comp');
			}
			else if (e.target.getAttribute('data-state') === 'comp') {
				// options section
				e.target.setAttribute('data-state', 'incomp');
				e.target.innerHTML =
					`${incompIcon}
                Mark as complete`;

				// .for removing <completed> and adding <pending> class
				e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('completed');
				e.target.parentElement.parentElement.parentElement.parentElement.classList.add('pending');

				// inner section
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild.innerHTML = incompIcon;
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild.setAttribute('data-state', 'incomp');
			}
		}
		// <else> for inner complete button
		else {
			if (e.target.getAttribute('data-state') === 'incomp') {
				// inner section
				e.target.setAttribute('data-state', 'comp');
				e.target.innerHTML = compIcon;

				// ..for adding <completed> and removing <pending> class
				e.target.parentElement.parentElement.parentElement.classList.add('completed');
				e.target.parentElement.parentElement.parentElement.classList.remove('pending');

				// options section
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.innerHTML =
					`${compIcon}
                Mark as incomplete`;
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.setAttribute('data-state', 'incomp');
			}
			else if (e.target.getAttribute('data-state') === 'comp') {
				// inner section
				e.target.setAttribute('data-state', 'incomp');
				e.target.innerHTML = incompIcon;

				// ..for removing <completed> and adding <pending> class
				e.target.parentElement.parentElement.parentElement.classList.remove('completed');
				e.target.parentElement.parentElement.parentElement.classList.add('pending');

				// options section
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.innerHTML =
					`${incompIcon}
                Mark as complete`;
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.setAttribute('data-state', 'comp');
			}
		}
		update();
	});
/*-- End completed button related event listener --*/


/*-- Favorite button related event listener --*/
addGlobalEventListener('click', '.main-section-notes-nav_favoriteBtn',
	(e) => {
		// for toggling favorite button    

		// <if> for options favorite button
		if (!e.target.parentElement.classList.contains('flex')) {
			// closing options section
			e.target.parentElement.classList.remove('active');

			if (e.target.getAttribute('data-state') === 'unfav') {
				//options section
				e.target.setAttribute('data-state', 'fav');
				e.target.innerHTML =
					`${favIcon}
                Remove from favorite`;

				// .for adding <favorite> class
				e.target.parentElement.parentElement.parentElement.parentElement.classList.add('favorite');

				//inner section
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild.innerHTML = favIcon;
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild.setAttribute('data-state', 'fav');
			}
			else if (e.target.getAttribute('data-state') === 'fav') {
				// options section
				e.target.setAttribute('data-state', 'unfav');
				e.target.innerHTML =
					`${unfavIcon}
                Add to favorite`;

				// .for removing <favorite> class
				e.target.parentElement.parentElement.parentElement.parentElement.classList.remove('favorite');

				// inner section
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild.innerHTML = unfavIcon;
				e.target.parentElement.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild.setAttribute('data-state', 'unfav');
			}
		}
		// <else> for inner favorite button
		else {
			if (e.target.getAttribute('data-state') === 'unfav') {
				// inner section
				e.target.setAttribute('data-state', 'fav');
				e.target.innerHTML = favIcon;

				// ..for adding <favorite> class
				e.target.parentElement.parentElement.parentElement.classList.add('favorite');

				// options section
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML =
					`${favIcon}
                Remove from favorite`;
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.setAttribute('data-state', 'fav');
			}
			else if (e.target.getAttribute('data-state') === 'fav') {
				// inner section
				e.target.setAttribute('data-state', 'unfav');
				e.target.innerHTML = unfavIcon;

				// ..for removing <favorite> class
				e.target.parentElement.parentElement.parentElement.classList.remove('favorite');

				// options section
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerHTML =
					`${unfavIcon}
                Add to favorite`;
				e.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.setAttribute('data-state', 'unfav');
			}
		}
		update();
	});
/*-- End favorite button related event listener --*/

/*-- Delete button --*/
addGlobalEventListener('click', '.main-section-notes-optionsDelete',
	(e) => {
		e.target.parentElement.parentElement.parentElement.parentElement.remove();
		update();
	});
/*-- End delete button --*/


/*-- Search Button related ELs--*/
let titleEls = [];

// search bar click
addGlobalEventListener('click', '.head_hero-search', (e) => {
	e.target.parentElement.classList.add('searching');
	$('.nav-addSign').classList.add('hidden');

	// mapping all note titles for search
	const noteTitles = Array.from($$('.main-section-notes-info_title'));
	titleEls = noteTitles.map(noteTitle => {
		return {
			name: noteTitle.textContent,
			element: noteTitle.parentElement.parentElement
		};
	});

	$('body').style.overflowY = 'hidden';

	// for bringing the category to pending
	// __actual section
	const notesSection = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.lastElementChild;
	notesSection.classList.remove('pending-section', 'completed-section', 'favorite-section');
	notesSection.classList.add('allNotes');

	// __styling
	categories.forEach(category => category.classList.remove('selected'));
	$('.menu_pending').classList.add('selected');
	// end for bringing the category to pending

	titleEls.forEach(item => {
		item.element.classList.remove('key');
	});
});

// search bar input
addGlobalEventListener('input', '.head_hero-search',
	(e) => {
		const searchString = e.target.value.toLowerCase();

		// linear searching and setting found element visible
		titleEls.forEach(item => {
			const isVisible = item.name.toLowerCase().includes(searchString);
			item.element.classList.toggle('key', isVisible);
		});

		if (searchString.length < 1) {
			titleEls.forEach(item => {
				item.element.classList.remove('key');
			});
		}
	});

// search bar close button
$('.close-search').addEventListener('click', e => {
	e.target.parentElement.classList.remove('searching');
	e.target.nextElementSibling.value = "";
	$('.nav-addSign').classList.remove('hidden');

	$('body').style.overflowY = 'auto';

	const notesSection = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.lastElementChild;
	notesSection.classList.remove('allNotes');
	notesSection.classList.add('pending-section');

	titleEls.forEach(item => {
		item.element.classList.remove('key');
	});
});
/*-- End search Button related ELs --*/

/*-- Prompt related ELs --*/
function showPrompt() {
	$('.prompt').classList.add('ing');

	setTimeout(() => {
		$('.prompt').classList.remove('ing');
	}, 10000);
}

window.addEventListener('load', () => {
	if (window.innerWidth >= 1100)
		setTimeout(showPrompt, 10000);
	else
		return;
});

// prompt close button
$('.prompt-close').addEventListener('click', (e) => {
	e.target.parentElement.classList.remove('ing');
});

/*-- End prompt related ELs --*/

/*---- End event Listeners ----*/

// to reload when app comes online
window.addEventListener('online', () => {
	window.location.reload();
});

if ("serviceWorker" in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register("./sw.js")
			.catch(err => {
				console.log(err);
			})
	});
}
else {
	console.error("Application not supported");
}


async function checkNetworkAndReload() {
	try {
		const response = await fetch('.');
		if (response.status >= 200 && response.status < 500) {
			window.location.reload();
			return;
		}
	} catch {
		// do nothing 
	}
	window.setTimeout(checkNetworkAndReload, 1500);
}
