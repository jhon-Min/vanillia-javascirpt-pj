const key = 'AGjqJFOub9rRHTtVOgwQGQjelIE7wzvY';


const getCity = async(city) => {
    let url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    let query = `?apikey=${key}&q=${city}`;
    let response = await fetch(url + query);
    let data = await response.json();
    return data[0];
};

const getWeather = async(code) => {
    let url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    let query = `${code}?apikey=${key}`;
    let response = await fetch(url + query);
    let data = await response.json();
    return data[0];
};

const getDaily5 = async (code) => {
    let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    let query = `${code}?apikey=${key}`;
    let response = await fetch(url + query);
    let data = await response.json();
    return data;
};

// getCity('yangon')
//     .then(data => {
//         console.log(data);
//         // return getWeather(data.Key);
//         return getDaily5(data.Key)
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err) );
 
