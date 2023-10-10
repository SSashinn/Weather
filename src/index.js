const searchBtn = document.getElementById('search');
const div = document.getElementById('current');
const loc = document.querySelector('#locationInput');

searchBtn.onclick = printData;

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

async function dailyHour() {
    let time = 0;
    const hourDetails1 = document.getElementById('todayHourDetails1');
    const hourDetails2 = document.getElementById('todayHourDetails2');
    const response = await weather();
    const todayForecast = response.forecast.forecastday[0].hour;

    // Removing already Printed Forecast From the screen
    while(hourDetails1.firstChild || hourDetails2.firstChild){
        try {
            hourDetails1.removeChild(hourDetails1.firstChild);
        } catch (error) {
            hourDetails2.removeChild(hourDetails2.firstChild); 
        }
    }
    todayForecast.forEach(element => {
        // Create New Div To Store The Hour
        const div = document.createElement('div');
        div.classList.add('hour');
        if (time<12){
            hourDetails1.appendChild(div);
        }
        else{
            hourDetails2.appendChild(div);
        }


        // Create an Hour Display
        const hour = document.createElement('p');
        hour.textContent  = `${time}:00`;
        time+=1;
        div.appendChild(hour);

        // Adding an Icon
        const newIcon = document.createElement('img');
        const url = `https:${element.condition.icon}`;
        newIcon.src =url
        div.appendChild(newIcon);

        // Printing Temp
        const temp = document.createElement('p');
        temp.textContent = `${element.temp_c} °C`;
        div.appendChild(temp);
    });

}

async function printData() {
    weatherDetail();
    dailyHour();
}

printData();

