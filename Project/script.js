const apiKey = "a7846751fe9528561e318c8fe7fb3722"; // I did not know if you wanted me to leave it in or not.

/* SEARCH HANDLER */
$("#searchBox").keypress(function (e) {
    if (e.key === "Enter") {
        const input = $(this).val().split(",");

        if (input.length !== 2) {
            alert("Use format: City, CountryCode");
            return;
        }

        const city = input[0].trim();
        const country = input[1].trim();

        $("#title").text(`Weather In: ${city}, ${country}`);

        getWeather(city, country);
        getForecast(city, country);
        $(this).val("");
    }
});


/* CURRENT WEATHER */

function getWeather(city, country) {
    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiKey}`;

    $.getJSON(url, function(data){
        $("#temp").text(data.main.temp + " °F");
        $("#humidity").text(data.main.humidity + "%");
        $("#wind").text(data.wind.speed + " mph");
        $("#clouds").text(data.clouds.all + "%");

        $("#sunrise").text(
            new Date(data.sys.sunrise * 1000).toLocaleTimeString()
        );

        $("#sunset").text(
            new Date(data.sys.sunset * 1000).toLocaleTimeString()
        );

        $("#timestamp").text(
            "Last Search: " + new Date().toLocaleString()
        );

    }).fail(function(){
        alert("Unable to retrieve weather data.");
    });

}


/* FORECAST DATA */

function getForecast(city, country){
    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=${apiKey}`;

    $.getJSON(url,function(data){
        $("#forecastContainer").empty();

        for(let i = 0; i < data.list.length; i += 8){
            const item = data.list[i];
            const date =
            new Date(item.dt * 1000).toLocaleDateString();

            const temp = Math.round(item.main.temp);
            const desc = item.weather[0].main;
            const icon = item.weather[0].icon;
            const iconURL =`https://openweathermap.org/img/wn/${icon}@2x.png`;

            const card = $(`
            <div class="forecast-card">
                <h4>${date}</h4>
                <img src="${iconURL}">
                <p>${temp}°F</p>
                <p>${desc}</p>
            </div>
            `);

            $("#forecastContainer").append(card);
        }
        animateForecast();

    }).fail(function(){
        alert("Unable to retrieve forecast.");
    });

}


/* FORECAST ANIMATION */
function animateForecast(){
    $(".forecast-card").each(function(index){
        $(this)
        .delay(index * 300)
        .fadeIn(400);
    });

}