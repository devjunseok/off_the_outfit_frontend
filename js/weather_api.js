
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "b1a338fe71987b703e4d4e3c71050f85";


// 현재 위치 날씨 

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    console.log(url)
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        });
}

// 현제 위치 확인

function onGeoError() {
    alert("Can't find you. No weather for you.");
    }

    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
