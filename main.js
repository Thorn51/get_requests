//   Fetch images
function fetchImages() {
  // V1 - User input number of images requesting, required, default 3
  let $quantity = $(".number-dogs").val();
  // V1 - Images Fetched based on input number of images
  // V1 - Print JSON Object to console
  fetch(`https://dog.ceo/api/breeds/image/random/${$quantity}`)
    .then(function(response) {
      return response.json();
    })
    .then(responseJson => displayRandomDogs(responseJson))
    .catch(error => alert("Did you use a value between 1 and 50?"));
}

// V3 Get Breed Images
function fetchBreedImage() {
  let breedInput = $(".breed-input").val();
  let normalizedInput = breedInput.replace(" ", "-").toLowerCase();
  console.log(normalizedInput);
  let endPoint = `https://dog.ceo/api/breed/${normalizedInput}/images/random`;
  fetch(endPoint)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(responseJson => displayBreedImage(responseJson))
    .catch(function(error) {
      breedSearchFeedback();
    });
}

// v3 error message
function breedSearchFeedback() {
  $(".search-feedback")
    .show()
    .fadeIn("slow");
}

// v3 Search Breeds
function searchBreeds() {
  $(".search-button").on("click", function(event) {
    event.preventDefault();
    fetchBreedImage();
  });
}

// v3 Display Breed Image to DOM
function displayBreedImage(responseJson) {
  console.log(responseJson);
  $(".search-feedback").hide();
  let breedImageHtml = `<div class='image-container'> <img src="${
    responseJson.message
  }" class="breed-pic"></div>`;
  console.log(breedImageHtml);
  $(".breed-image").empty();
  $(".breed-image").append(breedImageHtml);
}

//   V1 User submits form
function randomImage() {
  $(".submit-button").on("click", function(event) {
    event.preventDefault();
    fetchImages();
  });
}

// V2 Display Random Images to DOM
function displayRandomDogs(responseJson) {
  console.log(responseJson);
  let imageHtml = "";
  let dogs = responseJson.message;
  //Display multiple images I think a loop is needed?
  for (let i = 0; i < dogs.length; i++) {
    imageHtml += `<div class="image-container"><img src="${
      dogs[i]
    }" class="dog-pics"></div>`;
  }
  $(".dog-images").empty();
  $(".dog-images").append(imageHtml);
}

// DOM Ready
$(document).ready(function() {
  console.log("App ready, waiting for request!");
  randomImage();
  searchBreeds();
});
