const searchResults = document.querySelector('#results')
const searchResultButton = document.querySelector('searchResultButton')
import axios from "axios";

// Function to handle search
function performSearch(searchTerm) {

    const options = {
      method: 'GET',
      url: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&random=true`
    };
    const searchData = async () => {
      try {
          const response = await axios(options);
  
          function renderResults() {
              response.data.hits.forEach(hit => {
                  searchResults.innerHTML += `
                    <div class="d-flex align-items-center bg-ash-color px-0 mb-3">
                      <img src="${hit.recipe.image}" alt="burgers" width="55" height="61" class="image-fluid">
                      <p class="ms-3">${hit.recipe.label}</p>
                    </div>
                  `
              });
          }
          renderResults()
  
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    }
  
  searchData()
  
    console.log('Performing search for:', searchTerm);
    console.log(searchTerm)
  }
  
  
   // Event listener for search button click
   searchResultButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      performSearch(searchTerm);
    } else {
      alert('Please enter a search term');
    }
  });

  // Render items on page load
  document.addEventListener('DOMContentLoaded', function() {
  let searchTerm = localStorage.getItem('searchTerm');
  

  if (searchTerm) {
    const options = {
      method: 'GET',
      url: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&random=true`
    };
    const searchData = async () => {
      try {
          const response = await axios(options);
  
          function renderResults() {
              response.data.hits.forEach(hit => {
                  searchResults.innerHTML += `
                    <div class="d-flex align-items-center bg-ash-color px-0 mb-3">
                      <img src="${hit.recipe.image}" alt="burgers" width="55" height="61" class="image-fluid">
                      <p class="ms-3">${hit.recipe.label}</p>
                    </div>
                  `
              });
          }
          renderResults()
  
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    }
  
  searchData()
  
    console.log('Performing search for:', searchTerm);
    console.log(searchTerm)
    // document.getElementById('results').textContent = 'Showing results for: ' + searchTerm;
  }
});