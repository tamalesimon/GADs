window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('#temprature-description');
    let temperature = document.querySelector('#temprature-degrees');
    let locationName = document.querySelector('#location-name');
    let DateTime = document.querySelector('#date-time');
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f33a484cf794d08d0148764789aaba32`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { main, name, sys, weather  } = data;

                //console.log(weather);
                
                temperature.textContent = Math.round(parseFloat(main.temp)-273.15);
                locationName.textContent = name;
                temperatureDescription.textContent = weather[0].description;

                let Icon = document.getElementById('icon-info').src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
                
                let current_datetime = new Date()
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
                console.log(formatted_date)

                DateTime.textContent = formatted_date;

            });
        });

        
    } else alert("Enable geolocation to see the weather");
});