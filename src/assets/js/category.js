const searchValue = JSON.parse(localStorage.getItem("searchValue"));
const clickedCategory = document.querySelector("#clickedCategory");
const dishes = document.querySelector("#dishes");
const filters = document.querySelectorAll(".filter");
const filterItem = document.querySelector("#filterItem");
const numOfResults = document.querySelector("#numOfResults");

import axios from "axios";

// Render items on page load
let renderSearchResults = () => {
  clickedCategory.innerHTML = `${searchValue}`;

  if (searchValue) {
    const options = {
      method: "GET",
      url: `https://api.edamam.com/api/recipes/v2?type=public&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&cuisineType=${searchValue}&dishType=Main%20course&random=true`,
    };
    const searchData = async () => {
      try {
        const response = await axios(options);
        const responseData = response.data;
        localStorage.setItem("responseData", JSON.stringify(responseData));

        function renderResults() {
          response.data.hits.forEach((hit, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");

            itemElement.innerHTML = `<a href="item.html">
                  <div class="items d-flex align-items-center bg-ash-color px-0 mb-3">
                    <img src="${hit.recipe.image}" alt="burgers" width="55" height="61" class="image-fluid">
                    <p class="ms-3">${hit.recipe.label}</p>
                  </div>
                  </a>
                `;
            // Attaching the click event listener to each item element
            itemElement.addEventListener("click", () => {
              const clickedItem = response.data.hits[index]; // Access the exact array item using the index
              localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
              console.log("Clicked item:", clickedItem);
            });

            dishes.appendChild(itemElement);
          });
        };
        renderResults();
      } catch (error) {
        console.log(error);
      };
    };

    searchData();
    console.log("Performing search for:", searchValue);
  };
};

renderSearchResults();

//to check number of rendered items
const observer = new MutationObserver(() => {
  const numOfItems = document.querySelectorAll(".items").length;
  if (numOfItems === 0 || numOfItems === 1) {
    numOfResults.textContent = `${numOfItems} Result`;
  } else {
    numOfResults.textContent = `${numOfItems} Results`;
  };
});

observer.observe(dishes, { childList: true });

// filters event listener
filters.forEach((filter) => {
  filter.addEventListener("click", (event) => {
    let filterValue = event.target.getAttribute("data-value"); //to get data-value of clicked filter
    let foodData = JSON.parse(localStorage.getItem("responseData"));

    const filteredResults = foodData.hits.filter(
      (hit) => hit.recipe.mealType[0] == filterValue
    );
    dishes.innerHTML = ``;

    if (filteredResults.length > 0) {
      function renderfilterResults() {
        filteredResults.forEach((filter, index) => {
          const itemElement = document.createElement("div");
          itemElement.classList.add("item");

          itemElement.innerHTML = `<a href="item.html">
                    <div class="items d-flex align-items-center px-0 mb-3 data-item-index="${index}"">
                      <img src="${filter.recipe.image}" alt="burgers" width="55" height="61" class="image-fluid">
                      <p class="ms-3">${filter.recipe.label}</p>
                    </div>
                    </a>
                  `;
          // Attaching the click event listener to each item element
          itemElement.addEventListener("click", () => {
            // Accessing the exact array item using the index
            const clickedItem = filteredResults[index];
            localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
            console.log("Clicked item:", clickedItem);
          });

          dishes.appendChild(itemElement);
        });

        filterItem.innerHTML = `
        <button id="removeFilter" class="btn  rounded border border-1 border-orange">
        Remove ${filterValue} filter
        </button>
        `;
      }
      renderfilterResults();
    } else if (filteredResults.length === 0) {
      let filterValue = event.target.getAttribute("data-value");
      dishes.innerHTML = `
      <div class="container">
      <p class="fst-italic">
      no match found.
      </p>
      </div>
      `;

      filterItem.innerHTML = `
      <button id="removeFilter" class="btn rounded border border-1 border-orange">
      Remove ${filterValue} filter
      </button>
      `;
    } else {
      console.log("array length cannot be less than 0");
    };
  });
});

//when no match is found remove filter and render saved search results
filterItem.addEventListener("click", () => {
  let foodData = JSON.parse(localStorage.getItem("responseData")); //saved search results
  dishes.innerHTML = ``;

  foodData.hits.forEach((hit, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");

    itemElement.innerHTML = `<a href="item.html">
                <div class="items d-flex align-items-center px-0 mb-3 data-item-index="${index}"">
                  <img src="${hit.recipe.image}" alt="burgers" width="55" height="61" class="image-fluid">
                  <p class="ms-3">${hit.recipe.label}</p>
                </div>
                </a>
              `;

    // Attaching the click event listener to each item element
    itemElement.addEventListener("click", () => {
      // Accessing the exact array item using the index
      const clickedItem = foodData.hits[index];
      localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
      console.log("Clicked item:", clickedItem);
    });

    dishes.appendChild(itemElement);
  });
  filterItem.innerHTML = ``; // to remove filter button
});
