const week = document.getElementById('week');
const getDate = document.getElementById('current-date');
const cityInput = document.getElementById('cityInput');
const submit = document.getElementById('submit');
const apikey = "cec102e17cc7174fb9ecd05a60786421";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satday"];
const monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
//current day
const today = new Date();
const weekDays = days[today.getDay()];
week.textContent = weekDays;
//current full date
const day = today.getDate();
const month = monthsName[today.getMonth()];
const year = today.getFullYear();
const formattedyear = `${day} ${month} ${year}`;
getDate.textContent = formattedyear;


submit.addEventListener("click", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError('please enter valid city');
    }

})

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
        throw new Error("could not fetch data");
    }
    return await response.json();

}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }],
        wind: { speed } } = data;
    document.getElementById('result').style.display = "block";
    document.getElementById('cityname').textContent = city;
    document.getElementById('temperature').textContent = `${(temp - 273.15).toFixed(1)} °C`;
    document.getElementById('weather-dis').textContent = description;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind').textContent = speed;
    document.getElementById('icon-container').textContent = displayEmoji(id);
}

function displayEmoji(weatherId) {


    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"

        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";

        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";

        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";

        case (weatherId === 800):
            return "☀️";

        case (weatherId > 800):

            return "☁️";

        default:
            return "❔"
    }
}


function displayError(message) {
    const errorDisplay = document.getElementById('errormsg');
    errorDisplay.textContent = message;

}