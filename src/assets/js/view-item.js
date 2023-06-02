const selectedItem = JSON.parse(localStorage.getItem("clickedItem"));
const mealImage = document.querySelector("#img");
const mealName = document.querySelector("#meal-name");
const mealOrigin = document.querySelector("#meal-origin");
const mealTime = document.querySelector("#maxTime");
const minTime = document.querySelector("#minTime");
const timeForMeal = document.querySelector("#timeForMeal");
const multipurpose = document.querySelector("#multipurpose");
const ingredients = document.querySelector("#ingredients");
const procedure = document.querySelector("#procedure");
const multi = document.querySelector("#multi");
const healthLabels = document.querySelector("#healthLabels");
const time = document.querySelector("#time");

// To load selected meal
function loadMeal() {
  // To check if the time to prepare the meal is available
  if (selectedItem.recipe.totalTime === 0) {
    time.innerHTML = `<p class="fst-italic">not available</p>`;
  } else if (selectedItem.recipe.totalTime < 10) {
    minTime.innerHTML = `${selectedItem.recipe.totalTime - 3}`;
  } else if (selectedItem.recipe.totalTime < 45) {
    minTime.innerHTML = `${selectedItem.recipe.totalTime - 5}`;
  } else {
    minTime.innerHTML = `${selectedItem.recipe.totalTime - 10}`;
  }

  mealImage.innerHTML = `<img src="${selectedItem.recipe.image}" alt="${selectedItem.recipe.label}" class="img-fluid w-100">`;
  mealName.innerHTML = `${selectedItem.recipe.label}`;
  mealOrigin.innerHTML = `${selectedItem.recipe.cuisineType}`;
  mealTime.innerHTML = `${selectedItem.recipe.totalTime}`;
  timeForMeal.innerHTML = `${selectedItem.recipe.mealType}`;
}

loadMeal();

// To render ingredients to div#ingredient
ingredients.addEventListener("click", () => {
  if (!ingredients.classList.contains("active")) {
    ingredients.classList.add("active");
    procedure.classList.remove("active");
  }

  multipurpose.innerHTML = ``;
  multi.innerHTML = "";
  healthLabels.innerHTML = "";
  selectedItem.recipe.ingredientLines.forEach((ingredient) => {
    multipurpose.innerHTML += `
        <li>
            ${ingredient}
        </li>
        `;
  });
});

// To render procedure to div#procedure
procedure.addEventListener("click", () => {
  if (!procedure.classList.contains("active")) {
    procedure.classList.add("active");
    ingredients.classList.remove("active");
  }

  multipurpose.innerHTML = ``;
  multi.innerHTML = `See how to prepare meal <a href="${selectedItem.recipe.url}" target="_blank" class="text-orange fw-bold">Here</a>`;
  healthLabels.innerHTML = `Health Labels`;
  selectedItem.recipe.healthLabels.forEach((label) => {
    multipurpose.innerHTML += `<li>${label}</li>`;
  });
});

// To show procedures on load
function show() {
  multi.innerHTML = `See how to prepare meal <a href="${selectedItem.recipe.url}" target="_blank" class="text-orange fw-bold">Here</a>`;
  healthLabels.innerHTML = `Health Labels`;
  selectedItem.recipe.healthLabels.forEach((label) => {
    multipurpose.innerHTML += `<li>${label}</li>`;
  });
  // to add active class to procedure button
  procedure.classList.add("active");
}
show();
