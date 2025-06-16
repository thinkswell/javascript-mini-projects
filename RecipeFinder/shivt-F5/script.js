const searchBtn = document.getElementById("searchBtn");
const ingredientInput = document.getElementById("ingredient");
const resultsDiv = document.getElementById("results");
const modal = document.getElementById("recipeModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function doSearch() {
  const input = ingredientInput.value.trim().toLowerCase();
  const ingredients = input.split(/\s+/);
  resultsDiv.innerHTML = "";

  if (!ingredients[0]) {
    resultsDiv.innerHTML = "<p>Please enter at least one ingredient.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Searching recipes...</p>";

  Promise.all(
    ingredients.map((ing) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        .then((res) => res.json())
        .then((data) => data.meals || [])
    )
  )
    .then((results) => {
      if (results.some((arr) => arr.length === 0)) {
        resultsDiv.innerHTML = "<p>No recipes found with those ingredients.</p>";
        return;
      }

      const commonMeals = results.reduce((acc, curr) => {
        const currIds = curr.map((m) => m.idMeal);
        return acc.filter((m) => currIds.includes(m.idMeal));
      }, results[0]);

      if (!commonMeals.length) {
        resultsDiv.innerHTML = "<p>No recipes found with those ingredients.</p>";
        return;
      }

      resultsDiv.innerHTML = "<p>Loading recipe details...</p>";

      return loadMealDetailsWithVegFlag(commonMeals);
    })
    .then((mealsWithVegInfo) => {
      if (!mealsWithVegInfo) return;

      resultsDiv.innerHTML = "";
      mealsWithVegInfo.forEach(({ mealDetails, isVegetarian }) => {
        const card = document.createElement("div");
        card.className = "recipe";
        card.innerHTML = `
          <h3>${mealDetails.strMeal}</h3>
          <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}" />
          ${isVegetarian ? '<span class="veg-badge">🌱 Vegetarian</span>' : ''}
        `;
        card.addEventListener("click", () => showRecipe(mealDetails.idMeal));
        resultsDiv.appendChild(card);
      });
    })
    .catch((err) => {
      console.error(err);
      resultsDiv.innerHTML = "<p>Error loading recipe details.</p>";
    });
}

function loadMealDetailsWithVegFlag(meals) {
  const meatKeywords = [
    "chicken", "beef", "egg", "eggs", "prawns", "pork", "fish", "shrimp", "meat",
    "bacon", "ham", "lamb", "turkey", "anchovy", "crab", "duck", "salmon",
    "sausage", "veal", "venison", "shellfish", "octopus", "squid"
  ];

  return Promise.all(
    meals.map((meal) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
        .then((res) => res.json())
        .then((data) => {
          const mealDetails = data.meals[0];
          let isVegetarian = true;

          for (let i = 1; i <= 20; i++) {
            const ing = mealDetails[`strIngredient${i}`];
            if (ing && meatKeywords.some((keyword) => ing.toLowerCase().includes(keyword))) {
              isVegetarian = false;
              break;
            }
          }

          return { mealDetails, isVegetarian };
        })
    )
  );
}

function showRecipe(idMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      let ingredients = "<ul>";

      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients += `<li>${measure} ${ing}</li>`;
        }
      }

      ingredients += "</ul>";

      modalBody.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 100%; margin: 1rem 0;" />
        <h4>Ingredients:</h4>
        ${ingredients}
        <h4>Instructions:</h4>
        <p>${meal.strInstructions}</p>
      `;

      modal.style.display = "block";
      ingredientInput.focus();
    })
    .catch((err) => {
      console.error(err);
      modalBody.innerHTML = "<p>Error loading recipe details.</p>";
      modal.style.display = "block";
    });
}

searchBtn.addEventListener("click", doSearch);

ingredientInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    doSearch();
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});
