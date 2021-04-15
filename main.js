// queries the three necessary input fields to get a valid submission
const apiInput = document.querySelector("#api-key");
const addressInput = document.querySelector("#address");
const noradInput = document.querySelector("#norad");
//query the search button
const searchButton = document.querySelector("#search");

//some helper functions
//to convert month number to month name
// function changeToMonth(num) {
    
    
// }
//to convert utc data to Month DD, YYYY

//add event listener to button
searchButton.addEventListener("click", function(){
    //will convert the address input with spaces to have %20 for url purposes
    let addressString = addressInput.value;
    //make the addressString URL useable
    addressString = encodeURIComponent(addressString.trim());
    
    //declare the mapURL concatenated with necessary url portions
    const mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + addressString + ".json?access_token=" + apiInput.value;
   
    // now fetch the mapURL delared above
    fetch(mapURL)
    // Now process the raw response into an object
    .then((res) => res.json())
    .then((data) => {
        // declare the coordinates of each latitude and longitude
        const latitude = data.features[0].geometry.coordinates[0];
        const longitude = data.features[0].geometry.coordinates[1];
       
        const coordinates = [latitude, longitude];
        return coordinates;
    })
    .then((coordinates) => {
        //REFERENCE: satAPI URL should look like below, use string concat to create
        //https://satellites.fly.dev/passes/25544?lat=-34.91&lon=-57.93&limit=1&days=15&visible_only=true
        const satAPIurl = "https://satellites.fly.dev/passes/" + noradInput.value + "?lat=" + coordinates[0] + "&lon=" + coordinates[1] + "&days=15&visible_only=true";

        //now fetch the satAPIurl 
        fetch(satAPIurl)
            // Now process the raw response into an object
            .then((res) => res.json())
            // Now process the above JSON
            .then((data) => {
            //test to make sure you can log out the satellite url properply
            console.log('If this succeeds, than the sat url should be returned below: ')
            console.log(satAPIurl);
            // test to target data information
            console.log('If this succeeds, than the data will show here: ')
            console.log(data);
            //check for rise information
            console.log("Rise: " + data[0].rise.utc_datetime);
            //check for culmination information
            console.log("Culminates: " +data[0].culmination.utc_datetime);
            //check for set information
            console.log("Sets: " + data[0].set.utc_datetime);


            console.log(data[0].rise.utc_datetime)
            const dateUTC = data[0].rise.utc_datetime //+ " UTC";
            console.log(dateUTC);
            const localDate = new Date(dateUTC);

            console.log("Local Date is: " + localDate);
            // Use this to create a count down later on
            // const currentdate = new Date(); 
            // const datetime = "Last Sync: " + currentdate.getDate() + "/"
            //     + (currentdate.getMonth()+1)  + "/" 
            //     + currentdate.getFullYear() + " @ "  
            //     + currentdate.getHours() + ":"  
            //     + currentdate.getMinutes() + ":" 
            //     + currentdate.getSeconds(); 

            // console.log(currentdate);
      
    })
    })
})