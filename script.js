let cityName = "raleigh";
let queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "&appid=9099e8618e1dcdaab8e7f96651d3bbc5";

//temp, humdity, windspeed web api call
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  console.log(response.main.temp);
  console.log(response.main.humidity);
  console.log(response.wind.speed);
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
    console.log(response);
    console.log(response.current.uvi);
  });
});

$("button").on("click", function () {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
