/* Global Variables */

// Dynamically generate date
 let d = new Date();
 let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// API URL and key
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=065e8b48cd788d8876dabc213a837b5d';

document.getElementById('generate').addEventListener('click', performAction);

// Function called by the event listener 
function performAction(e){

	// Get value inside the zip input
	const newZip =  document.getElementById('zip').value;

	// if noo zip entered
	if(newZip.length == 0)
	{
		alert("Enter zip code");
	}
	else
	{
		// call getTemperature to GET the temperature from the api
		getTemperature(baseURL,newZip, apiKey)
		// POST the data to projectData object in server
		.then(function(data) {
			postData('/add', {city:data.name, temperature:data.main.temp, date:newDate, userResponse:'Good'})
			// Update the UI with the new values in projectData
			.then(function(){
			updateUI();
			});
		});
	}
}

// GET the temperature from the api
const getTemperature = async (baseURL, animal, key)=>{
  const res = await fetch(baseURL+animal+key);
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

// POST data to projectData object in server
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
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// Update the UI
const updateUI = async ()=>{
	const request = await fetch('/all');
	try{
		const allData = await request.json();
		document.getElementById('city').innerHTML = allData[allData.length-1].city;
		document.getElementById('temp').innerHTML = allData[allData.length-1].temperature;
		document.getElementById('date').innerHTML = newDate;
		document.getElementById('content').innerHTML = document.getElementById('feelings').value;
		document.getElementById("entryHolder").style.visibility = "visible";
	}
	catch(error) {
		console.log("error", error);
	}
}

