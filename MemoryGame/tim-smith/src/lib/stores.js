import { writable } from 'svelte/store';

export const firstCard = writable({
  icon: '',
  isFlipped: false,
});

export const secondCard = writable({
  icon: '',
  isFlipped: false,
});

export const numberOfTries = writable(0);

export const numberOfPairs = writable(0);

export const cardBackground = writable(null);

const lsNumberOfTries = localStorage.getItem('numberOfTries');

export const bestNumberOfTries = writable(lsNumberOfTries ? lsNumberOfTries : null);