
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "ae210c2f1df036d2a70a689e0174b825"
const myLat = "35.65900723365094"
const myLong = "139.7514402559605"

const myURL = '//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial'