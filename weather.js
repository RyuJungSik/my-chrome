const API_KEY="de683fe487c683bad6f17aef2cc82ebd";
const COORDS='coords';
const weather=document.querySelector(".js-weather");

function getWhether(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(respone ){
        return respone.json()
    }).then(function(json) {
        const temperature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWhether(latitude, longitude);
}

function handleGeoError(){
    console.log("cant access");
}


function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}



function loadCoords(){
    const loadCoords=localStorage.getItem(COORDS);
    if(loadCoords ===null){
        askForCoords();
    }
    else{
        const parseCoords=JSON.parse(loadCoords);
        getWhether(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();