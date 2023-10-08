const searchBtn = document.getElementById('search');
const div = document.getElementById('current');
const loc = document.querySelector('#locationInput');

searchBtn.onclick = weatherDetail;

loc.addEventListener("keypress", (event) =>{
    if (event.key === "Enter"){
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchBtn.click();
    }
})


async function weather(){
    const url = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=abf5bd99fb044826904112747232309&q=${getLocation()}&days=3`);
    const response = await url.json(); //This turns the JSON to object.
    console.log(response);
    return response;
}

function getLocation(){
    // const loc = document.querySelector('#locationInput');
    const value = loc.value;
    return value;
}

async function weatherDetail(){
    const response = await weather();
    const current = response.current;
    const location = response.location;
    const forecast = response.forecast;
    const condition = current.condition;

    // Printing Location
    const placeName = document.getElementById('placeName');
    placeName.textContent = `${location.name}`;
    // Printing Current Temp
    const temp = document.getElementById('temp');
    temp.textContent = `${current.temp_c} °C`;

    // Printing Apparent Temp   
    const feelLike = document.getElementById('feelLike');
    feelLike.textContent = `${current.feelslike_c}°C`;

    // Printing Location
    const conditionText = document.getElementById('condition');
    conditionText.textContent = `${condition.text}`;

    // Printing Humdity
    const humdity = document.getElementById('humdity');
    humdity.textContent = `Humdity: ${current.humidity}%`;   

    const windSpeed = document.getElementById('windSpeed');
    windSpeed.textContent = `Wind Speed: ${current.wind_kph} Km/h`;

    const image = document.getElementById('conditionImg');
    image.src = `https:${condition.icon}`;
} 

// weatherDetail();
