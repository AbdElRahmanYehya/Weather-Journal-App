/* Global Variables */

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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

postData('/addMovie', {temperature:6, date:'5/12/2021', userResponse:'Cold'});
postData('/addMovie', {temperature:21, date:'5/13/2021', userResponse:'Warm'});


///////////

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let apiKey = '&appid=065e8b48cd788d8876dabc213a837b5d';
let x;
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newAnimal =  document.getElementById('zip').value;
getAnimal(baseURL,newAnimal, apiKey).then(function(data) {
	console.log(data);
	postData('/newAdd', {temperature:data.main.temp, date:'6/2/2000', userResponse:'Good'})
})

}
const getAnimal = async (baseURL, animal, key)=>{

  const res = await fetch(baseURL+animal+key)
  try {

    const data = await res.json();
    x = data;
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

// getAnimal('/apirout').then(function(data) {
// 	console.log(data);
// 	postData('/newAdd', {temperature:77, date:'6/2/2000', userResponse:'Good'})
// })




// function postGet(){
//   postData('/animal', {fav:'lion'})
//     .then(function(data){
//       retrieveData('/all')
//     })
// }

// postGet()