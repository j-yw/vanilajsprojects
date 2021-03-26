var meals = document.querySelector(".meals");
var favMealsContainer = document.querySelector(".fav-meals");
var searchTerm = document.querySelector("#search-term");
var searchBtn = document.querySelector("#search");
var mealPopUp = document.querySelector(".popup-wrapper");
var closePopUpBtn = document.querySelector(".close-popup");
var mealInfo = document.querySelector(".meal-info");

async function getRandomMeal() {
  var response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  var responseData = await response.json();
  var randomMeal = responseData.meals[0];
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  var response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  var responseData = await response.json();
  var mealById = responseData.meals[0];
  return mealById;
}

async function fetchFavoriteMeals() {
  favMealsContainer.innerHTML = "";
  var mealIds = getMealsFromLocalStorage();
  for (let i = 0; i < mealIds.length; i++) {
    let mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealToFavorite(meal);
  }
}

async function getMealBySearch(mealName) {
  var response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName
  );
  var responseData = await response.json();
  var mealBySearch = responseData.meals;
  return mealBySearch;
}

function addMeal(mealData, random = false) {
  var meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
        <div class="meal-header">
        ${
          random
            ? `
          <span class="random">Random Recipe</span>
          `
            : ""
        }
        <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
        />
        </div>
        <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
        <!-- <i class="far fa-heart"></i> -->
        <i class="fas fa-heart"></i>
        </button>
        </div>
        `;
  var btn = meal.querySelector(".meal-body .fav-btn");

  btn.addEventListener("click", function handleClick() {
    if (btn.classList.contains("active")) {
      removeMealFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavoriteMeals();
  });

  meal.addEventListener("click", function handleClick() {
    updateMealInfo(mealData);
  });

  meals.appendChild(meal);
}

function addMealToFavorite(mealData) {
  var favMeal = document.createElement("li");

  favMeal.innerHTML = `
  <img
    src="${mealData.strMealThumb}"
    alt="${mealData.strMeal}"
  /><span>${mealData.strMeal}</span>
  <button class="close">
  <i class="fas fa-window-close"></i> 
  </button>
        `;

  var btn = favMeal.querySelector(".close");

  btn.addEventListener("click", function handleClick() {
    removeMealFromLocalStorage(mealData.idMeal);
    fetchFavoriteMeals();
  });

  favMeal.addEventListener("click", function handleClick() {
    updateMealInfo(mealData);
  });

  favMealsContainer.appendChild(favMeal);
}

function removeMealFromLocalStorage(mealId) {
  var mealIds = getMealsFromLocalStorage();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(
      mealIds.filter(function filterMeals(id) {
        return id !== mealId;
      })
    )
  );
}

function updateMealInfo(mealData) {
  mealInfo.innerHTML = "";
  var mealInfoElement = document.createElement("div");
  var ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealInfoElement.innerHTML = `
            <h1>${mealData.strMeal}</h1>
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
            <p>${mealData.strInstructions}</p>
            <h3>Ingredients:</h3>
            <ul>${ingredients
              .map(function mapIngredients(ing) {
                return `<li>${ing}</li>`;
              })
              .join("")}</ul>
  
  `;
  mealInfo.appendChild(mealInfoElement);
  mealPopUp.classList.remove("hidden");
}

function addMealToLocalStorage(mealId) {
  var mealIds = getMealsFromLocalStorage();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function getMealsFromLocalStorage() {
  var mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds == null ? [] : mealIds;
}

searchBtn.addEventListener("click", async function handleSearch() {
  meals.innerHTML = "";
  var search = searchTerm.value;
  var searchedMeals = await getMealBySearch(search);
  if (searchedMeals) {
    searchedMeals.forEach(function loopEachOne(meal) {
      addMeal(meal);
    });
  }
});

closePopUpBtn.addEventListener("click", function handleClick() {
  mealPopUp.classList.add("hidden");
});

getRandomMeal();
fetchFavoriteMeals();
