const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Stay",
		emblem: "Life is better with music",
		"bg-color": ["#0396FF", "#0D1827"],
		"accent-color": "#0396FF",
		url: "https://media.gq.com/photos/56bb8a91b89407780bd7d454/16:9/w_2560%2Cc_limit/bieber-16-9-longform.jpg",
		spotify:
			"https://open.spotify.com/embed/track/5HCyWlXZPP0y6Gqq8TgA20?utm_source=generator"
	},
    {
		album: "Peaches",
		emblem: "Life is better with music",
		"bg-color": ["#3df5a7", "#0D1827"],
		"accent-color": "#3df5a7",
		url:
			"https://www.hollywoodreporter.com/wp-content/uploads/2013/11/9713_01_0270.jpg?w=2000&h=1126&crop=1",
		spotify:
			"https://open.spotify.com/embed/track/4iJyoBOLtHqaGxP12qzhQI?utm_source=generator"
	},
	{
		album: "Love Yourself",
		emblem: "Life is better with music",
		"bg-color": ["#727272", "#0D1827"],
		"accent-color": "#727272",
		url: "https://media1.popsugar-assets.com/files/thumbor/m5hWnoLb2swg0qdQ9HwqhNmDR4s/616x88:2931x2403/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2020/02/24/871/n/1922398/a66872b45e542a05d1cd50.97536705_/i/Justin-Bieber.jpg",
		spotify:
			"https://open.spotify.com/embed/track/1f8zcJPvJKvxAOjEqM0pyc?utm_source=generator"
	},
	{
		album: "Baby",
		emblem: "Life is better with music",
		"bg-color": ["#f687ff", "#0D1827"],
		"accent-color": "#f687ff",
		url:
			"https://www.billboard.com/wp-content/uploads/media/justin-bieber-smiling-performing-2015-billboard-650.jpg",
		spotify:
			"https://open.spotify.com/embed/track/6epn3r7S14KUqlReYr77hA?utm_source=generator"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);
