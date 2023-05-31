const searchResults = document.querySelector("#results");
const searchResultButton = document.querySelector("#searchResultButton");
const numOfResults = document.querySelector("#numOfResults");
const items = Array.from(results.querySelectorAll(".items"));

import axios from "axios";

// Render items on page load
let renderSearchResults = () => {
  let searchTerm = localStorage.getItem("searchTerm");

  if (searchTerm) {
    const options = {
      method: "GET",
      url: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&random=true`,
    };
    const searchData = async () => {
      try {
        const response = await axios(options);
        const responseData = response.data;

        function renderResults() {
          response.data.hits.forEach((hit, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("item");

            itemElement.innerHTML = `<a href="item.html">
                  <div class="items d-flex align-items-center bg-ash-color px-0 mb-3 data-item-index="${index}"">
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

            searchResults.appendChild(itemElement);
          });
        }
        renderResults();
      } catch (error) {
        console.error(error);
      }
    };

    searchData();
    console.log("Performing search for:", searchTerm);
  }
};

renderSearchResults();

// Function to handle search
function performSearch(searchTerm) {
  const options = {
    method: "GET",
    url: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&random=true`,
  };
  const searchData = async () => {
    try {
      const response = await axios(options);
      const responseData = response.data;

      function renderResults() {
        response.data.hits.forEach((hit, index) => {
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
            const clickedItem = response.data.hits[index];
            localStorage.setItem("clickedItem", JSON.stringify(clickedItem));
            console.log("Clicked item:", clickedItem);
          });

          searchResults.appendChild(itemElement);
        });
      }

      renderResults();
      // console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  searchData();

  console.log("Performing search for:", searchTerm);
}

// Event listener for search button click
searchResultButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  searchResults.innerHTML = ``;
  if (searchTerm) {
    performSearch(searchTerm);
  } else {
    alert("Please enter a search term");
  }
});

//to check number of rendered items
const observer = new MutationObserver(() => {
  const numOfItems = document.querySelectorAll(".items").length;
  numOfResults.textContent = `${numOfItems} Results`;
});

observer.observe(searchResults, { childList: true });
