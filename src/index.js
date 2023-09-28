const searchBtn = document.getElementById('search');

async function weather(){
    const url = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=abf5bd99fb044826904112747232309&q=${getLocation()}&days=3`);
    const response = await url.json();
    console.log(response);
    return response;
}

function getLocation(){
    const loc = document.querySelector('#location');
    const value = loc.value;
    loc.value = '';
    return value;
}


async function printCurrentData(){
    const response = await weather();
    const current = response.current;
    JSON.stringify(current);
    const p = document.getElementById('current');
    for (let x in current) {
        const detail = document.createElement('p');
        detail.textContent = `${x}: ${current[x]}`;
        p.appendChild(detail);
    }
} 

printCurrentData();
searchBtn.onclick = printCurrentData;