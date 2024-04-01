const form = document.querySelector("form");

const ip = document.querySelector("#ip");

const btn = document.querySelector(".search");

const h1 = document.querySelector("h1");

const error = document.querySelector(".error");

const imgBox = document.querySelector(".images-box");

const details = document.querySelector(".details");

const getMeal = async (dishName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`;

  h1.innerHTML = "Fetching Items";

  const respObj = await fetch(url);

  const jsonVal = await respObj.json();

  const mealArr = jsonVal.meals;

  console.log(mealArr);

  let data = "";

  if (mealArr === null) {
    error.innerHTML = "Enter Correct Dish Name";

    imgBox.innerHTML = data;

    h1.innerHTML = "";
  } else if (mealArr.length !== 0) {
    error.innerHTML = "";

    h1.innerHTML = "Items Details";

    mealArr.forEach((el) => {
      const imgSrc = el.strMealThumb;

      const itemName = el.strMeal;

      const itemArea = el.strArea;

      const itemIng1 = el.strIngredient1;

      const itemIng2 = el.strIngredient2;

      const itemIng3 = el.strIngredient3;

      const itemIng4 = el.strIngredient4;

      const itemIng5 = el.strIngredient5;

      const itemIns = el.strInstructions;

      data += `<div class="img-box">
        <img src=${imgSrc} alt="" />
        <div class="overlay">
        <h3>${itemName}</h3> 
        <h4>${itemArea} Dish</h4> 
        <ul> Ingredients:
          <li>${itemIng1}</li>
          <li>${itemIng2}</li>
          <li>${itemIng3}</li>
          <li>${itemIng4}</li>
          <li>${itemIng5}</li>
        </ul>
        <p>Instructions- <br/>${itemIns}</p>
      </div>
      </div>`;

      imgBox.innerHTML = data;
    });
  } else {
    error.innerHTML = "Couldn't Fetch Data";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (ip.value.trim() === "") {
    error.innerHTML = "Enter a Dish Name";

    h1.innerHTML = "";

    data = "";

    imgBox.innerHTML = data;
  } else {
    getMeal(ip.value.trim());
  }
});
