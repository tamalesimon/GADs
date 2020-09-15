window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('#temprature-description');
    let temperature = document.querySelector('#temprature-degrees');
    let locationName = document.querySelector('#location-name');
    let DateTime = document.querySelector('#date-time');
    let placeCode = document.querySelector('#place-code');
    
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f33a484cf794d08d0148764789aaba32`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { main, name, weather, sys } = data;

                temperature.textContent = Math.round(parseFloat(main.temp)-273.15);
                locationName.textContent = name;
                
                temperatureDescription.textContent = weather[0].description;
                console.log(data.sys); 

                placeCode.textContent = sys.country;
            

                let Icon = document.getElementById('icon-info').src = `https://openweathermap.org/img/wn/${weather[0]["icon"]
            }@2x.png`;
                
                let current_datetime = new Date();
                var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
                var month=new Array();
                month[0]="Jan";
                month[1]="Feb";
                month[2]="Mar";
                month[3]="Apr";
                month[4]="May";
                month[5]="Jun";
                month[6]="Jul";
                month[7]="Aug";
                month[8]="Sep";
                month[9]="Oct";
                month[10]="Nov";
                month[11]="Dec";
                var hours = current_datetime.getHours();
                var minutes = current_datetime.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ampm;

                let formatted_date = strTime+" "+"-"+" "+ days[current_datetime.getDay()]+","+" "+current_datetime.getDate()+ " "+month[current_datetime.getMonth()]+" "+current_datetime.getFullYear();
                
                //current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
                DateTime.textContent = formatted_date;

            });
        });

        
    } else alert("Enable geolocation to see the weather");
});

