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
    
    const URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + addressString + ".json?access_token=" + apiInput.value;
    console.log(URL);
})

