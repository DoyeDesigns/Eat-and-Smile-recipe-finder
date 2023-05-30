const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#results');
let discoverNew = document.getElementById('discover');

import axios from "axios";

// Function to handle search
// function performSearch(searchTerm) {

//   const options = {
//     method: 'GET',
//     url: `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&random=true`
//   };
//   const searchData = async () => {
//     try {
//         const response = await axios(options);

//         function renderResults() {
//             response.data.hits.forEach(hit => {
//                 searchResults.innerHTML += `
//                   <div class="d-flex align-items-center bg-ash-color px-0 mb-3">
//                     <img src="${hit.recipe.image}" alt="burgers" width="55" height="61" class="image-fluid">
//                     <p class="ms-3">${hit.recipe.label}</p>
//                   </div>
//                 `
//             });
//         }
//         renderResults()

//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
//   }

// searchData()

//   console.log('Performing search for:', searchTerm);
//   console.log(searchTerm)
// }

searchButton.addEventListener('click', (event) => {
  const searchTerm = searchInput.value;  
  console.log('Search term:', searchTerm);

  localStorage.setItem('searchTerm', searchTerm);
  if (!searchTerm) {
    // console.log('Redirecting to search-results.html');
    // window.location.replace('search-results.html?query=' + encodeURIComponent(searchTerm));
    // window.location.pathname = 'search-results.html';
    event.preventDefault();
    alert('Please enter a search term');
  } 
  // performSearch(searchTerm);
});

// Rendering random food on page load in the discover new div
// const options = {
//     method: 'GET',
//     url: 'https://api.edamam.com/api/recipes/v2?type=public&app_id=8364506f&app_key=25208b6f52780cf1344c710f6a964801&dishType=Main%20course&random=true'
//   };
// const foodData = async () => {
//     try {
//         const response = await axios(options);
//         function renderDiscover() {
//             response.data.hits.forEach(hit => {
//                 discoverNew.innerHTML += `
//                 <div class="me-3">
//                     <img src="${hit.recipe.image}" alt="" width="132" height="134" class="rounded image-fluid mb-3">
//                     <h3 class="mb-1 fs-5">${hit.recipe.label}</h3>
//                     <h4 class="text-orange fs-6 text-capitalize">${hit.recipe.cuisineType}</h4>
//                 </div>
//                 `
//             });
//         }
//         renderDiscover()
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//     }
// }

// foodData()

