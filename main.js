// queries the three necessary input fields to get a valid submission
const apiInput = document.querySelector("#api-key");
const addressInput = document.querySelector("#address");
const noradInput = document.querySelector("#norad");
//query the search button
const searchButton = document.querySelector("#search");

//some helper functions

//create a function to get the DATE in  Mon., DD, YYYY
function getDate(utcStamp){
    //handle milliseconds to seconds since js deals in seconds;
    const newDate = new Date(utcStamp * 1000);
    // use three letter months for formatting layout later
    //have to declare months variable since get month only returns month as a number
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = newDate.getFullYear();
    const month = months[newDate.getMonth()];
    const date = newDate.getDate();
    const fullDate = month + ' ' + date + ', ' + year;
    return fullDate;
}

//create a function to just get the TIME of the rise, culm., sets
function getTime(utcStamp) {
    // Create date based on the timestamp
    const date = new Date(utcStamp * 1000);
    // Hours part from the timestamp
    //currently in 24 hour format
    const hours = date.getHours();
    // Minutes part from the timestamp
    //it will account for single digits and double digits
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    const eventTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return eventTime;
}

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
            const eventDate = document.querySelector(".event-date");
            const riseTime = document.querySelector(".rise-time");
            const culmTime = document.querySelector(".culmination-time");
            const setTime = document.querySelector(".set-time");
            const satName = document.querySelector(".sat-name");
            const cityName = document.querySelector(".city-name");

            satName.innerText = noradInput.value;
            cityName.innerText = addressInput.value;
            
            if (data.length === 0) {
                console.log("No data to display");
                eventDate.innerText = "N/A";
                riseTime.innerText = "N/A";
                culmTime.innerText = "N/A";
                setTime.innerText = "N/A";
            } else {
                eventDate.innerText = getDate(data[0].rise.utc_timestamp);
                riseTime.innerText = getTime(data[0].rise.utc_timestamp) + " (local time)";
                culmTime.innerText = getTime(data[0].culmination.utc_timestamp) + " (local time)";
                setTime.innerText = getTime(data[0].set.utc_timestamp) + " (local time)";
            }


            //Use this to create a count down later on
            const currentdate = new Date(); 
            const datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); 

            console.log(currentdate);
    
    })
    })
})