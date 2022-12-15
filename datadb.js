const { DateTime } = require('luxon');

function runProgram() {
  // TODO: Add your code here to run the program

// Import the necessary libraries
const request = require('request');
const mysql = require('mysql');

// Set up the MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'weather_data'
});

// Connect to the database
connection.connect();

// Make the API request
request('http://api.openweathermap.org/data/2.5/onecall?lat=-1.252&lon=77.4977&exclude=hourly,minutely&appid=723cc0247cf6a7daa0b913a8fd386228&units=metric&lang=en', (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // Parse the JSON response
    const data = JSON.parse(body);

   
     // Insert the data array daily into the database

     data.daily.forEach((day) => {
        const dt = new Date(day.dt * 1000);
  
        const sql = `INSERT INTO data_api ( date, tempmax, tempmin,  humidity, description)
                     VALUES ( '${dt.toDateString()}', '${day.temp.max}', '${day.temp.min}',  '${day.humidity}', '${day.weather[0].description}')`;
        connection.query(sql, (err, result) => {
          if(err) {
            console.log(err);
          }else {
            console.log('Successfully inserted data into the database');
  
          }
        });
     
  
  
    
    });
   
  }
});
console.log('Running program...');
}


// Set a date and time for the next execution of the program
const nextExecution = DateTime.local()
  .set({ hour: 23, minute: 59, second: 0 });

// Calculate the time in milliseconds until the next execution
const delay = nextExecution - DateTime.local();

// Schedule the program to run at the specified time
setTimeout(runProgram, delay);

 // connection.query('INSERT INTO table_name SET ?', data, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Successfully inserted data into the database');
    //   }
    // });