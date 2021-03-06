let dayCounter = 1;

lastestCitySearch();
//dashBoardRender Function
function dashBoardRender() {
  let cityName = $("#cityInput").val();
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=9099e8618e1dcdaab8e7f96651d3bbc5";
  let fiveDayURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=9099e8618e1dcdaab8e7f96651d3bbc5";
  //temp, humdity, windspeed web api call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //clear current day
    $("#currentDay").removeClass("currentDayForcastStyle");
    $("#currentDayForcast").empty();
    //current day
    $("#currentDay").addClass("currentDayForcastStyle");
    let newDiv = $("<div>");
    newDiv.html(
      response.name +
        " (" +
        moment().format("l") +
        ") " +
        "<img src=http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png" +
        ">"
    );
    newDiv.addClass("currentHeaderWeatherStyle");
    $("#currentDayForcast").append(newDiv);
    let newDiv2 = $("<div>");
    newDiv2.html(
      "Temperature: " +
        ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1) +
        "&#8457;"
    );
    newDiv2.addClass("currentWeatherStyle");
    $("#currentDayForcast").append(newDiv2);
    let newDiv3 = $("<div>");
    newDiv3.html("Humidity: " + response.main.humidity + "&#37;");
    newDiv3.addClass("currentWeatherStyle");
    $("#currentDayForcast").append(newDiv3);
    let newDiv4 = $("<div>");
    newDiv4.html("Wind Speed: " + response.wind.speed + " MPH");
    newDiv4.addClass("currentWeatherStyle");
    $("#currentDayForcast").append(newDiv4);
    //save lat and lon for city location
    let lat = response.coord.lat;
    let lon = response.coord.lon;

    //UV index web api call
    let uvIndexURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=9099e8618e1dcdaab8e7f96651d3bbc5";

    $.ajax({
      url: uvIndexURL,
      method: "GET",
    }).then(function (response) {
      //clear index div
      $("#currentIndex").empty();
      let newDiv = $("<div>");
      newDiv.html("UV Index: " + "<span>" + response.current.uvi + "</span");
      newDiv.addClass("currentIndexStyle");
      $("#currentIndex").append(newDiv);
      let indexValue = response.current.uvi;
      if (indexValue < 3) {
        $("span").addClass("greenBackground");
      } else if (indexValue < 7) {
        $("span").addClass("orangeBackground");
      } else {
        $("span").addClass("redBackground");
      }
    });

    //5 day forcast ajax call
    $("#fiveDayForcast").empty();
    let fiveDayDiv = $("<div>");
    fiveDayDiv.html("<h2>5-Day Forcast: </h2>");
    $("#fiveDayForcast").append(fiveDayDiv);
    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (response) {
      //clear 5 day
      $("#dayOne").empty();
      $("#dayTwo").empty();
      $("#dayThree").empty();
      $("#dayFour").empty();
      $("#dayFive").empty();
      for (i = 1; i < response.list.length; i = i + 8) {
        if (i === 1) {
          dayCounter = 1;
        }
        if (dayCounter === 1) {
          let newDiv = $("<div>");
          newDiv.html(moment().add(dayCounter, "days").format("l"));
          let newDiv1 = $("<div>");
          newDiv1.html(
            "<img src=http://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png" +
              ">"
          );
          let newDiv2 = $("<div>");
          newDiv2.html(
            "Temp: " +
              ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2) +
              "&#8457;"
          );
          let newDiv3 = $("<div>");
          newDiv3.html("Humidity: " + response.list[i].main.humidity + "&#37;");
          $("#dayOne").append(newDiv);
          $("#dayOne").append(newDiv1);
          $("#dayOne").append(newDiv2);
          $("#dayOne").append(newDiv3);
        }
        if (dayCounter === 2) {
          let newDiv = $("<div>");
          newDiv.html(moment().add(dayCounter, "days").format("l"));
          let newDiv1 = $("<div>");
          newDiv1.html(
            "<img src=http://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png" +
              ">"
          );
          let newDiv2 = $("<div>");
          newDiv2.html(
            "Temp: " +
              ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2) +
              "&#8457;"
          );
          let newDiv3 = $("<div>");
          newDiv3.html("Humidity: " + response.list[i].main.humidity + "&#37;");
          $("#dayTwo").append(newDiv);
          $("#dayTwo").append(newDiv1);
          $("#dayTwo").append(newDiv2);
          $("#dayTwo").append(newDiv3);
        }
        if (dayCounter === 3) {
          let newDiv = $("<div>");
          newDiv.html(moment().add(dayCounter, "days").format("l"));
          let newDiv1 = $("<div>");
          newDiv1.html(
            "<img src=http://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png" +
              ">"
          );
          let newDiv2 = $("<div>");
          newDiv2.html(
            "Temp: " +
              ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2) +
              "&#8457;"
          );
          let newDiv3 = $("<div>");
          newDiv3.html("Humidity: " + response.list[i].main.humidity + "&#37;");
          $("#dayThree").append(newDiv);
          $("#dayThree").append(newDiv1);
          $("#dayThree").append(newDiv2);
          $("#dayThree").append(newDiv3);
        }
        if (dayCounter === 4) {
          let newDiv = $("<div>");
          newDiv.html(moment().add(dayCounter, "days").format("l"));
          let newDiv1 = $("<div>");
          newDiv1.html(
            "<img src=http://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png" +
              ">"
          );
          let newDiv2 = $("<div>");
          newDiv2.html(
            "Temp: " +
              ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2) +
              "&#8457;"
          );
          let newDiv3 = $("<div>");
          newDiv3.html("Humidity: " + response.list[i].main.humidity + "&#37;");
          $("#dayFour").append(newDiv);
          $("#dayFour").append(newDiv1);
          $("#dayFour").append(newDiv2);
          $("#dayFour").append(newDiv3);
        }
        if (dayCounter === 5) {
          let newDiv = $("<div>");
          newDiv.html(moment().add(dayCounter, "days").format("l"));
          let newDiv1 = $("<div>");
          newDiv1.html(
            "<img src=http://openweathermap.org/img/wn/" +
              response.list[i].weather[0].icon +
              "@2x.png" +
              ">"
          );
          let newDiv2 = $("<div>");
          newDiv2.html(
            "Temp: " +
              ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(2) +
              "&#8457;"
          );
          let newDiv3 = $("<div>");
          newDiv3.html("Humidity: " + response.list[i].main.humidity + "&#37;");
          $("#dayFive").append(newDiv);
          $("#dayFive").append(newDiv1);
          $("#dayFive").append(newDiv2);
          $("#dayFive").append(newDiv3);
        }

        dayCounter++;
      }
    });
  });
}

$(".cityName").on("click", function () {
  $("#cityInput").val($(this).attr("city-name"));
  dashBoardRender();
});

//onclick for search button
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  dashBoardRender();
  ajaxNameCall();
  localStorage.setItem("last search", JSON.stringify($("#cityInput").val()));
});

function lastestCitySearch() {
  let storedSearch = JSON.parse(localStorage.getItem("last search"));
  if (storedSearch !== null) {
    $("#cityInput").val(storedSearch);
    let cityName = storedSearch;
    let newDiv = $("<div>");
    newDiv.html(cityName);
    newDiv.addClass("cityName");
    newDiv.attr("city-name", cityName);
    $("#cityList").append(newDiv);
    dashBoardRender();
  }
}

function ajaxNameCall() {
  let cityName = $("#cityInput").val();
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=9099e8618e1dcdaab8e7f96651d3bbc5";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let cityName = response.name;
    let newDiv = $("<div>");
    newDiv.html(cityName);
    newDiv.addClass("cityName");
    newDiv.attr("city-name", cityName);
    $("#cityList").append(newDiv);
    $(".cityName").on("click", function () {
      $("#cityInput").val($(this).attr("city-name"));
      localStorage.setItem(
        "last search",
        JSON.stringify($(this).attr("city-name"))
      );
      dashBoardRender();
    });
  });
}
