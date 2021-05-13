/* Global Variables */

// Create a new date instance dynamically with JS
 let d = new Date();
 let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// postData('/addMovie', {temperature:6, date:'5/12/2021', userResponse:'Cold'});
// postData('/addMovie', {temperature:21, date:'5/13/2021', userResponse:'Warm'});


///////////

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=065e8b48cd788d8876dabc213a837b5d';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
	const newAnimal =  document.getElementById('zip').value;
	if(newAnimal.length == 0)
	{
		alert("Enter zip code");
	}
	else
	{
		getAnimal(baseURL,newAnimal, apiKey)
		.then(function(data) {
			console.log("inside the chained post");
			console.log(data);
			postData('/newAdd', {city:data.name, temperature:data.main.temp, date:newDate, userResponse:'Good'});
		})
		.then(updateUI())
	}
}


const getAnimal = async (baseURL, animal, key)=>{
	console.log("before first fethch");
  const res = await fetch(baseURL+animal+key);
  console.log("after first fethch");
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


const updateUI = async ()=>{
	const request = await fetch('/all');
	try{
		const allData = await request.json();
		console.log("all dataa");
		console.log(allData);
		//document.getElementById('city').innerHTML = allData[allData.length-1].city;
		document.getElementById('temperature').innerHTML = allData[allData.length-1].temperature;
		document.getElementById('date').innerHTML = newDate;
		document.getElementById('response').innerHTML = document.getElementById('feelings').value;
		document.getElementById("result").style.visibility = "visible";
	}
	catch(error) {
		console.log("is this first?");
		console.log("error", error);
	}
}

