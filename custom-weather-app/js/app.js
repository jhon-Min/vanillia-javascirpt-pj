const locationForm = document.querySelector('.search-box');
const btnSearch = document.querySelector('.btn-search');
const details = document.getElementById('details');
const body = document.querySelector('body');

const updateUi = (data) => {
    console.log(data);
    
    let html = 
        `
            <div class="d-flex justify-content-start align-items-center mb-0">
                <h4 class="mb-2">${data.cityDetails.AdministrativeArea.EnglishName}</h4>
                <h3 class="mx-1 badge-info text-white mx-2">${data.cityDetails.Country.EnglishName}</h3>
            </div>
            <p class="mb-0">${data.weatherDetails.Temperature.Metric.Value}&deg;${data.weatherDetails.Temperature.Metric.Unit}</p>
            <div class="icon d-flex align-items-center">
                <p class="mt-2">${data.weatherDetails.WeatherText}</p>
                <img src="img/icons/${data.weatherDetails.WeatherIcon}.svg" alt="">
            </div>
        `;

        details.innerHTML = html;

    // Day & Night Background Img Process
    if(data.weatherDetails.IsDayTime){
        body.style.backgroundImage = " url('./img/sun-2.jpg')";
        body.style.backgroundSize = "cover";
    }else{
        body.style.background = " url('./img/night.jpg')";
        body.style.backgroundSize = "cover";
    }
};

const updateCity = async (city) => {
    let cityDetails = await getCity(city);
    let weatherDetails = await getWeather(cityDetails.Key);
    let forecast5 = await getDaily5(cityDetails.Key);

    return{
        cityDetails,
        weatherDetails,
        forecast5
    }

};

locationForm.addEventListener('submit', e => {
    e.preventDefault();

    let inputCity = locationForm.city.value.trim();

    if(inputCity.length){
        updateCity(inputCity)
            .then(data => updateUi(data))
            .catch(err => console.log(err.message));
        locationForm.reset();
    }else{
        alert('Please input city');
    }
});

