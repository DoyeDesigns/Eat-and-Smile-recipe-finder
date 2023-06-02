const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#results");
const discoverNew = document.getElementById("discover");
const rowContainer = document.querySelector("#rowContainer");

import axios from "axios";

// seach button event listener
searchButton.addEventListener("click", (event) => {
  const searchTerm = searchInput.value;
  console.log("Search term:", searchTerm);

  localStorage.setItem("searchTerm", searchTerm);
  if (!searchTerm) {
    event.preventDefault();
    alert("Please enter a search term");
  }
});

// To get value of a clicked category
function getValue(event) {
  clickedItem = event.target;
  const item = clickedItem.getElementsByClassName("category");
  console.log(item);
  let searchValue = item[0].innerHTML;
  console.log(searchValue);
  localStorage.setItem("searchValue", searchValue);
}

rowContainer.addEventListener("click", getValue);

// Rendering random food on page load in the discover new div
const options = {
  method: "GET",
  url: "https://api.edamam.com/api/recipes/v2?type=public&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&dishType=Main%20course&random=true",
};
const foodData = async () => {
  try {
    const response = await axios(options);
    function renderDiscover() {
      response.data.hits.forEach((hit, index) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");

        itemElement.innerHTML += `
                <a href="item.html">
                <div class="me-4">
                    <img src="${hit.recipe.image}" alt="" width="132" height="134" class="rounded image-fluid mb-3">
                    <h3 class="mb-1 fs-6">${hit.recipe.label}</h3>
                    <h4 class="text-orange fs-6 text-capitalize">${hit.recipe.cuisineType}</h4>
                </div>
                </a>
                `;

        // Attaching the click event listener to each item element
        itemElement.addEventListener("click", () => {
          const clickedItem = response.data.hits[index]; // Access the exact array item using the index
          localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
          console.log("Clicked item:", clickedItem);
        });

        discoverNew.appendChild(itemElement);
      });
    }
    renderDiscover();
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

foodData();
