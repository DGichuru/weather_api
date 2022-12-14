const app = {
    init: () => {
      document
        .getElementById('btnGet')
        .addEventListener('click', app.fetchWeather);
      document
        .getElementById('btnCurrent')
        .addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
      //use the values from latitude and longitude to fetch the weather
      let lat = document.getElementById('latitude').value;
      let lon = document.getElementById('longitude').value;
      let key = '723cc0247cf6a7daa0b913a8fd386228';
      let lang = 'en';
      let units = 'metric';
      // let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
      let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}&units=${units}&lang=${lang}`;
      //fetch the weather
      fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })

         //store the in mongodb databases in local host
        
       
        // show the weather on the page
        .then((data) => {
          app.showWeather(data);
        })

        .then((data) => {
          app.storeWeather(data);
        })
       
        
        // catch any errors and log them to the console
        .catch(console.err);
    },
    // get the current location of the user and populate the latitude and longitude
    getLocation: (ev) => {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10, //10 seconds
        maximumAge: 1000 * 60 * 5, //5 minutes
      };
      navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
      //got position
      document.getElementById('latitude').value =
        position.coords.latitude.toFixed(3);
      document.getElementById('longitude').value =
        position.coords.longitude.toFixed(3);
    },
    wtf: (err) => {
      //geolocation failed
      console.error(err);
    },
    showWeather: (resp) => {
      console.log(resp);
      let row = document.querySelector('.weather.row');
      //clear out the old weather and add the new
      // row.innerHTML = '';
      row.innerHTML = resp.daily.map((day, idx) => {
          if (idx <= 8) {
            let dt = new Date(day.dt * 1000); //timestamp * 1000
            // let sr = new Date(day.sunrise * 1000).toTimeString();
            // let ss = new Date(day.sunset * 1000).toTimeString();
           
            return `<div class="col">
                <div class="card">
                <h5 class="card-title p-2">${dt.toDateString()}</h5>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }@4x.png"
                    class="card-img-top"
                    alt="${day.weather[0].description}"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${day.weather[0].main}</h3>
                    <p class="card-text">High ${day.temp.max}&deg;C Low ${
              day.temp.min
            }&deg;C</p>
                    <p class="card-text">High Feels like ${
                      day.feels_like.day
                    }&deg;C</p>
                  
                    <p class="card-text">Humidity ${day.humidity}%</p>
                    <p class="card-text">Weather :  ${day.weather[0].description}</p>
                  
                    <p class="card-text">Precipitation ${day.pop * 100}%</p>
                    
                    
                  </div>
                </div>
              </div>
            </div>`;
          }
        })
        .join(' ');
    },
    // store the data into mongodb collection
    storeWeather: (resp) => {
      // console.log(resp);
      // const httpService = context.services.get('http-service');
      // var weatherApiInfo = context.values.get('weatherApiInfo');
      // let lat = -1.252;
      // let lon = 77.4977;
      // let key = '723cc0247cf6a7daa0b913a8fd386228';
      // let lang = 'en';
      // let units = 'metric';
      // let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
      // return httpService.get( {url: url}.then((response) => {
      //   let json = JSON.parse(response.body.text());
      //   json.obersavationDate = new Date(json.dt_txt);
      //   json.humidity = json.main.humidity;
      //   json.temp = json.main.temp;
      //   json.Precipitation = json.pop;

      //   var collection = context.services.get('mongodb-atlas').db('weather').collection('apidata');
      //   collection.insertOne(json);
      //   console.log('Inserted document!');
      // }));
      

    },
  };
    
  
  app.init();