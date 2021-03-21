/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = new Date().toLocaleString();


// Personal API Key for OpenWeatherMap API
const key = "94ee77c0550108be955d64acd45a4f65"
const units = "&units=imperial"
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
/* Possible responses:
 * if apy key is invalid or is not yet ready: {"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."}
 * {"coord":{"lon":-73.9884,"lat":40.778},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":279.62,"feels_like":276.24,"temp_min":278.71,"temp_max":280.37,"pressure":1021,"humidity":76},"visibility":10000,"wind":{"speed":2.57,"deg":140},"clouds":{"all":90},"dt":1616035751,"sys":{"type":1,"id":5141,"country":"US","sunrise":1615979036,"sunset":1616022273},"timezone":-14400,"id":0,"name":"New York","cod":200}
*/

/* Function called by event listener */
const generate = function () {
	zipCode = document.getElementById("zip").value;
	userResponse = document.getElementById("feelings").value;
	getWeather(zipCode, "us")
	.then(function(data) {
		newDate = new Date().toLocaleString();
		postData('/add', {date:newDate, zipCode:zipCode, temperature:data.main.temp, userResponse:userResponse});
		return data;
	})
	.then(function(data) {
		console.log(data);
		updateUI()
	})
}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click',  generate);

/* Function to GET Web API Data*/
const getWeather = async (zipCode, countryCode)=>{

	const url = baseURL+zipCode+","+countryCode+"&appid="+key+units;
	const res = await fetch(url)
	try {
		const data = await res.json();
		return data;
	}  catch(error) {
		console.log("error", error);
	}
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData
    } catch(error) {
    console.log("error", error);
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
	const request = await fetch('/all');
	try {
		setTimeout(() => {;}, 100)
		const allData = await request.json();
		console.log(allData);
		const table = document.getElementById("entries");
		const row = table.insertRow(-1);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		const last = allData.length - 1
		cell1.innerHTML = allData[last].date;
		cell2.innerHTML = allData[last].zipCode;
		cell3.innerHTML = allData[last].temperature;
		cell4.innerHTML = allData[last].userResponse;
	} catch(error) {
		console.log("error", error);
	}
}