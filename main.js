// queries the three necessary input fields to get a valid submission
const apiInput = document.querySelector("#api-key");
const addressInput = document.querySelector("#address");
const noradInput = document.querySelector("#norad");
//query the search button
const searchButton = document.querySelector("#search");

//add event listener to button
searchButton.addEventListener("click", function(){
   //log out the .values of the input fields
    /*console.log("api input: " + apiInput.value);
    console.log("address input: " + addressInput.value);
    console.log("norad input: " + noradInput.value);*/ 

    //will convert the address input with spaces to have %20 for url purposes
    let addressString = addressInput.value;
    addressString = encodeURIComponent(addressString.trim())
    
    console.log("New address input: " + addressString);
    
    const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + addressString + ".json?access_token=" + apiInput.value;
    console.log(mapURL);
    fetch(mapURL)
    // Now process the raw response into an object
    .then((res) => res.json())
    // Now process the above JSON, we will first console log a message
    //but we want to use this space to change the img src
    .then((data) => {
        // declare the coordinates of each latitude and longitude
        const latitude = data.features[0].geometry.coordinates[0];
        const longitude = data.features[0].geometry.coordinates[1];
        // test the latitude + longitude variables by console logging them
        console.log("This is latitude: " + latitude);
        console.log("This is longitude: " + longitude);
        const coordinates = [latitude, longitude];
        return coordinates;
    })
    .then((coordinates) => {
        console.log(coordinates)
    })
})

