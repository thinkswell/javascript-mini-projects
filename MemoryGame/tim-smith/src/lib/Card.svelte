<script>
  import { onMount } from "svelte";
  import Flip from "../lib/Flip.svelte";
  import { cardBackground } from "../lib/stores";

  let browserHeight;
  let lsNumberOfTries;

  onMount(() => {
    browserHeight = (window.innerHeight * 0.8) / 4;
  });

  import {
    firstCard,
    secondCard,
    numberOfTries,
    numberOfPairs,
  } from "../lib/stores";

  let flip = false;

  export let icon;

  function handleClick() {
    if (!$firstCard.flipped) {
      firstCard.set({
        icon,
        flipped: true,
      });
    } else {
      console.log($secondCard);
      secondCard.set({
        icon,
        flipped: true,
      });

      if ($firstCard.icon !== $secondCard.icon) {
        numberOfTries.set($numberOfTries + 1);
        setTimeout(() => {
          flip = !flip;
        }, 1000);
      } else {
        numberOfPairs.set($numberOfPairs + 1);
        firstCard.set({
          icon: "",
          flipped: false,
        });
        secondCard.set({
          icon: "",
          flipped: false,
        });
      }
    }

    flip = !flip;

    if ($numberOfPairs === 8) {
      alert("You won!");
      if (lsNumberOfTries === null) {
        localStorage.setItem("numberOfTries", `${$numberOfTries}`);
      } else {
        if ($numberOfTries < lsNumberOfTries) {
          localStorage.setItem("numberOfTries", `${$numberOfTries}`);
        }
      }

      localStorage.setItem("numberOfTries", `${$numberOfTries}`);
    }
  }
</script>

<div on:click={handleClick} class="card">
  <Flip height={`${browserHeight}px`} width={`${browserHeight}px`} {flip}>
    <img slot="front" src={$cardBackground} alt="card back" />
    <div class="back" slot="back">{icon}</div>
  </Flip>
</div>

<style>
  .back {
    margin: 0;
    padding: 0;
    font-size: var(--card-icon-size);
    background: #efe;
    text-shadow: 1px 1px 2px black;
  }

  img,
  .back {
    display: block;
    width: var(--card-size);
    height: var(--card-size);
    display: grid;
    place-items: center;
    border: 6px solid transparent;
  }

  img {
    height: 100%;
  }
</style>
