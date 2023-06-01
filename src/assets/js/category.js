const searchValue = localStorage.getItem("searchValue");
const clickedCategory = document.querySelector('#clickedCategory');
const dishes = document.querySelector('#dishes');
  
  console.log(searchValue);

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
        }
        renderResults();
      } catch (error) {
        console.log(error);
      }
    };

    searchData();
    console.log("Performing search for:", searchValue);
  }
};

renderSearchResults();