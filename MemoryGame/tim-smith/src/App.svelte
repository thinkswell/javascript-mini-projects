<script>
  import {
    bestNumberOfTries,
    cardBackground,
    numberOfTries,
    numberOfPairs,
  } from "./lib/stores";
  import { shuffle } from "./lib/utils";
  import Card from "./lib/Card.svelte";

  import redBrick from "./assets/red-brick.svg";
  import rainbow from "./assets/rainbow.png";
  import network from "./assets/network.svg";
  import subtlePrism from "./assets/subtle-prism.png";
  import waveyFingerprint from "./assets/wavey-fingerprint.png";
  import bermudaCircle from "./assets/bermuda-circle.png";
  import confettiDoodles from "./assets/confetti-doodles.png";
  import dalmatianSpots from "./assets/dalmatian-spots.png";
  import parabolicTriangle from "./assets/parabolic-triangle.png";
  import rosePetals from "./assets/rose-petals.png";
  import scatteredForcefields from "./assets/scattered-forcefields.png";
  import abstractTimekeeper from "./assets/abstract-timekeeper.png";

  const backgrounds = [
    { name: "Red Brick", img: redBrick },
    { name: "Rainbow", img: rainbow },
    { name: "Network", img: network },
    { name: "Subtle Prism", img: subtlePrism },
    { name: "Bermuda Circle", img: bermudaCircle },
    { name: "Wavey Fingerprint", img: waveyFingerprint },
    { name: "Confetti Doodles", img: confettiDoodles },
    { name: "Dalmatian Spots", img: dalmatianSpots },
    { name: "Parabolic Triangle", img: parabolicTriangle },
    { name: "Rose Petals", img: rosePetals },
    { name: "Scattered Forcefields", img: scatteredForcefields },
    { name: "abstractTimekeeper", img: abstractTimekeeper },
  ];

  const icons = [
    "🍺",
    "🍺",
    "👽",
    "👽",
    "🦄",
    "🦄",
    "🍔",
    "🍔",
    "🪨",
    "🪨",
    "🦎",
    "🦎",
    "🤬",
    "🤬",
    "🔥",
    "🔥",
  ];

  const bestScore = $bestNumberOfTries
    ? `| Your best score was: ${$bestNumberOfTries}`
    : "";

  cardBackground.set(redBrick);

  function setCardBg(img) {
    console.log(img);
    cardBackground.set(img);
  }

  const shuffledIcons = shuffle(icons);
</script>

<main>
  <header>
    <h1>The Memory Game</h1>
    <p>
      <strong>Click on the cards</strong> to find matching pairs.
    </p>
  </header>
  <div class="wrapper">
    <div>
      <h2>Themes</h2>
      <div class="backgrounds">
        {#each backgrounds as src}
          <div class="image">
            <img
              on:click={() => setCardBg(src.img)}
              src={src.img}
              alt={src.name}
            />
          </div>
        {/each}
      </div>
    </div>
    <div class="game-wrapper">
      <div class="stats">
        <p>{$numberOfTries} attempts {bestScore}</p>
        <p>{$numberOfPairs} pairs of 8</p>
      </div>
      <div class="grid">
        {#each shuffledIcons as icon}
          <Card {icon} />
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  .image {
    --size: 80px;
    width: var(--size);
    height: var(--size);
    overflow: hidden;
  }

  img {
    height: 100%;
  }
  .stats,
  .backgrounds {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 4px;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
  }
  .grid {
    width: var(--grid-width);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--card-size), 1fr));
    justify-items: center;
    align-items: center;
  }
</style>
