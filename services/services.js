import { API_KEY, API_KEY_1, API_KEY_2, endpoint, country, API_KEY_WE } from '../config/config';

export async function services(category = 'general') {
    let articles = await fetch(`${endpoint}?country=${country}&category=${category}`, {
        headers: {
            'X-API-KEY': API_KEY
        }
    });
    let result = await articles.json();
    if (result.status == "error") {
        articles = await fetch(`${endpoint}?country=${country}&category=${category}`, {
            headers: {
                'X-API-KEY': API_KEY_1
            }
        });
        result = await articles.json();
    }
    if (result.status == "error") {
        articles = await fetch(`${endpoint}?country=${country}&category=${category}`, {
            headers: {
                'X-API-KEY': API_KEY_2
            }
        });
        result = await articles.json();
    }
    articles = null;
    return result.articles;
}



export async function getWeather(lat, lon) {

    // Construct the API url to call
    // let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + API_KEY_WE;

    // Call the API
    let warticles = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WE}`);
    let wresult = await warticles.json();
    warticles = null;

    return wresult;
}