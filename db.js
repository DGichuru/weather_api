// // Import the necessary libraries
// const request = require('request');
// const mysql = require('mysql');

// Set up the MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'username',
//   password: 'password',
//   database: 'weather_data'
// });

// // Connect to the database
// connection.connect();

// // Make the API request
// request('http://api.openweathermap.org/data/2.5/onecall?lat=-1.252&lon=77.4977&exclude=hourly,minutely&appid=723cc0247cf6a7daa0b913a8fd386228&units=metric&lang=en', (error, response, body) => {
//   if (!error && response.statusCode === 200) {
//     // Parse the JSON response
//     const data = JSON.parse(body);

//     // Insert the data array daily into the database

//     data.daily.forEach((day) => {
//       const dt = new Date(day.dt * 1000);

//       const sql = `INSERT INTO weather_data (dt, sunrise, sunset, temp, feels_like, pressure, humidity, dew_point, uvi, clouds, visibility, wind_speed, wind_deg, weather, pop)
//                    VALUES ('${dt}', '${day.sunrise}', '${day.sunset}', '${day.temp}', '${day.feels_like}', '${day.pressure}', '${day.humidity}', '${day.dew_point}', '${day.uvi}', '${day.clouds}', '${day.visibility}', '${day.wind_speed}', '${day.wind_deg}', '${day.weather}', '${day.pop}')`;
//       connection.query(sql, (err, result) => {
//         if(err) {
//           console.log(err);
//         }else {
//           console.log('Successfully inserted data into the database');

//         }
//       });
   


  
//   });

// });



//   // connection.query('INSERT INTO table_name SET ?', data, (error, result) => {
//     //   if (error) {
//     //     console.log(error);
//     //   } else {
//     //     console.log('Successfully inserted data into the database');
//     //   }
//     // });


