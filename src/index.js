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
    const scale = toggle();

    // Printing Location
    const placeName = document.getElementById('placeName');
    placeName.textContent = `${location.name}`;
    // Printing Current Temp
    const temp = document.getElementById('temp');
    scale === 'C' ? 
    temp.textContent = `${current.temp_c} °C`:
    temp.textContent = `${current.temp_f} °F`;

    // Printing Apparent Temp   
    const feelLike = document.getElementById('feelLike');
    scale === 'C' ? 
    feelLike.textContent = `${current.feelslike_c} °C`:
    feelLike.textContent = `${current.feelslike_f} °F`;


    // Printing Location
    const conditionText = document.getElementById('condition');
    conditionText.textContent = `${condition.text}`;

    // Printing Humdity
    const humdity = document.getElementById('humdity');
    humdity.textContent = `${current.humidity}%`;   

    const windSpeed = document.getElementById('windSpeed');
    scale === 'C' ? 
    windSpeed.textContent = `${current.wind_kph} km/h`:
    windSpeed.textContent = `${current.wind_mph} mi/h`;


    const image = document.getElementById('conditionImg');
    image.src = `https:${condition.icon}`;
} 

async function dailyHour() {
    let time = 0;
    const hourDetails1 = document.getElementById('todayHourDetails1');
    const hourDetails2 = document.getElementById('todayHourDetails2');
    const response = await weather();
    const todayForecast = response.forecast.forecastday[0].hour;
    const scale = toggle();

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
        scale === 'C'? temp.textContent = `${element.temp_c} °C`: temp.textContent = `${element.temp_f} °F`
        div.appendChild(temp);
    });

}

async function forecast() {
    const response = await weather();
    const forecast = response.forecast.forecastday;
    const tmwrFore = document.getElementById('tmrwFore');
    const dayTmrwFore = document.getElementById('dayTmrwFore');
    const scale = toggle();

    while(tmwrFore.firstChild || dayTmrwFore.firstChild){
        try {
            tmwrFore.removeChild(tmwrFore.firstChild);
        } catch (error) {
            dayTmrwFore.removeChild(dayTmrwFore.firstChild); 
        }
    }

    for (let i = 1;i<=2;i++){
        const date = forecast[i].date;
        // from 2023-10-09 to 09-10-2023
        const reverseDate = date.split('-').reverse().join('-');
        const day = forecast[i].day;

        const tmrwDate = document.createElement('p');
        tmrwDate.classList.add = 'dateForecast';
        tmrwDate.textContent = `${reverseDate}`;
        i==1 ? tmwrFore.appendChild(tmrwDate): dayTmrwFore.appendChild(tmrwDate);

        const img = document.createElement('img');
        img.classList.add  ='iconForecast';
        img.src = `https:${day.condition.icon}`;
        i==1 ? tmwrFore.appendChild(img): dayTmrwFore.appendChild(img);

        const text = document.createElement('p');
        text.classList.add = 'conditionForecast';
        text.textContent = `${day.condition.text}`;
        i==1 ? tmwrFore.appendChild(text): dayTmrwFore.appendChild(text);

        const temp = document.createElement('p');
        temp.classList.add = 'tempForecast';
        scale ==='C'? temp.textContent = `${day.maxtemp_c} °C/ ${day.mintemp_c} °C`:
                    temp.textContent = `${day.maxtemp_f} °F/ ${day.mintemp_f} °F`;
        i==1 ? tmwrFore.appendChild(temp): dayTmrwFore.appendChild(temp);
    }

}

function toggle(){
    const btn = document.getElementById('checkbox');
    btn.onclick = printData;
    if (btn.checked ===true){
        return `F`;
    }
    else{
        return `C`;
    }
}
async function printData() {
    weatherDetail();
    dailyHour();
    forecast();
}

printData();

