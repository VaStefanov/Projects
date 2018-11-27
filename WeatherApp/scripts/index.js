const d = new Date();

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let num = d.getDay();

let today;

let currentDayHtml = '<div class="flex-container weather-box">' +
    '<div class="day"></div>' +
    '<div class="flex-container">' +
    '<div class="temperature"></div>' +
    '<div id=daily-img-container><img id="daily-icon" class="icon-sm-30" src="" alt=""></div>' +
    '</div>' +
    '</div>';
for (let j = 0; j < weekday.length; j++) {
    $("#daily-weather-wrapper").append(currentDayHtml);

}

let hourlyHtml = '<div class="flex-container weather-box">' +
    '<div class="hour"></div>' +
    '<div class="flex-container">' +
    '<div class="hourlyTemp"></div>' +
    '<div id=hourly-img-container><img id="hourly-icon" class="icon-sm-30" src="" alt=""></div>' +
    '</div>' +
    '</div>';
for (let h = 0; h < 24; h++) {
    $("#hourly-weather-wrapper").append(hourlyHtml);

}

for (let i = 0; i < weekday.length; i++) {

    today = weekday[num];

    $(".day")[i].innerHTML = today;

    num++;

    if (num > 6) { num = 0; }
}

/* --------------- Load default ---------------*/
$(document).ready(function () {
    const request = new XMLHttpRequest();
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Sofia&APPID=bd6d48a8fbb8878d55ceec9ae0cb903f ';
    request.open("GET", url);
    request.onload = function () {
        let data = JSON.parse(request.responseText);

        $(".location-label").text(data.name);
        $("#degrees-label").text(Math.trunc(data.main.temp - 273.15) + '\xB0' + "C");
        $("#summary-label")[0].innerHTML = data.weather[0].main;
        $("#humidity")[0].innerHTML = data.main.humidity + "%";
        $("#wind-speed")[0].innerHTML = data.wind.speed + "km/h";

        switch (data.weather[0].id) {
            case 800:
                if (d.getHours() >= 18) {
                    $("#summary-icon").attr('src', './assets/images/summary-icons/cclear-night-white.png');
                    $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/clear-night.jpg")';
                } else {
                    $("#summary-icon").attr('src', './assets/images/summary-icons/clear-day-white.png');
                    $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/clear-day.jpg")';
                }
                break;

            case 801:
            case 802:
                $("#summary-icon").attr('src', './assets/images/summary-icons/partly-cloudy-day-white.png');
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/partly-cloudy-day.jpg")';

                break;

            case 803:
            case 804:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/cloudy.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/cloudy-white.png');

                break;

            case 611:
            case 612:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/sleet.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/sleet-white.png');

                break;

            case 741:
            case 751:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/fog.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/fog-white.png');

                break;

            case 300:
            case 301:
            case 302:
            case 500:
            case 501:
            case 502:
            case 511:
            case 520:
            case 521:
            case 522:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/rain.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/rain-white.png');

                break;
            case 600:
            case 601:
            case 602:
            case 610:
            case 611:
            case 612:
            case 621:
            case 622:
            case 623:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/snow.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/snow-white.png');

                break;

            default:

                break;
        }
    }
    request.send();

    const request2 = new XMLHttpRequest();
    const url2 = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Sofia&days=7&key=67a3ecbb662c4060b33cbd6bb6201f1b ';
    request2.open("GET", url2);
    request2.onload = function () {
        let data2 = JSON.parse(request2.responseText);
        let dayNum = $('.temperature').length;
        let dailyImg = $('#daily-img-container #daily-icon');
        for (let y = 0; y < dayNum; y++) {
            $('.temperature')[y].innerHTML = Math.round(data2.data[y].min_temp) + '&#x2193' + ' / ' + Math.round(data2.data[y].max_temp) + '&#x2191';

            switch (data2.data[y].weather.code) {
                case 800:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/clear-day-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/clear-day-grey.png');
                    }
                    break;

                case 801:
                case 802:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/partly-cloudy-day-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/partly-cloudy-day-grey.png');
                    }

                    break;

                case 803:
                case 804:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/cloudy-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/cloudy-grey.png');
                    }
                    break;

                case 611:
                case 612:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/sleet-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/sleet-grey.png');
                    }

                    break;

                case 741:
                case 751:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/fog-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/fog-grey.png');
                    }

                    break;

                case 300:
                case 301:
                case 302:
                case 500:
                case 501:
                case 502:
                case 511:
                case 520:
                case 521:
                case 522:

                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/rain-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/rain-grey.png');
                    }
                    break;

                case 600:
                case 601:
                case 602:
                case 610:
                case 611:
                case 612:
                case 621:
                case 622:
                case 623:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/snow-white.png');
                    } else {
                        $(dailyImg[y]).attr('src', './assets/images/summary-icons/snow-grey.png');
                    }
                    break;

                default:

                    break;
            }
        }
    }
    request2.send();


    const request3 = new XMLHttpRequest();
    const url3 = 'https://api.weatherbit.io/v2.0/forecast/hourly?city=Sofia&key=67a3ecbb662c4060b33cbd6bb6201f1b&hours=24';
    request3.open("GET", url3);
    request3.onload = function () {
        let data3 = JSON.parse(request3.responseText);
        let hourNum = $('.hour').length;
        let hourlyImg = $('#hourly-img-container #hourly-icon');
        for (let z = 0; z < hourNum; z++) {
            if (data3.data[z].datetime.substr(11, 2) > 12) {
                $('.hour')[z].innerHTML = data3.data[z].datetime.substr(11, 2) + ":00 PM";
            } else {
                $('.hour')[z].innerHTML = data3.data[z].datetime.substr(11, 2) + ":00 AM";
            }
            $('.hourlyTemp')[z].innerHTML = data3.data[z].temp;
            switch (data3.data[z].weather.code) {
                case 800:
                    if (data3.data[z].datetime.substr(11, 2) > 18 || data3.data[z].datetime.substr(11, 2) < 06) {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/clear-night-white.png');
                        } else {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/clear-night-grey.png');
                        }
                    } else {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/clear-day-white.png');
                        } else {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/clear-day-grey.png');
                        }
                    }

                    break;

                case 801:
                case 802:
                    if (data3.data[z].datetime.substr(11, 2) > 18 || data3.data[z].datetime.substr(11, 2) < 06) {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/partly-cloudy-night-white.png');
                        } else {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/partly-cloudy-night-grey.png');
                        }
                    } else {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/partly-cloudy-day-white.png');
                        } else {
                            $(hourlyImg[z]).attr('src', './assets/images/summary-icons/partly-cloudy-day-grey.png');
                        }
                    }

                    break;

                case 803:
                case 804:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/cloudy-white.png');
                    } else {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/cloudy-grey.png');
                    }
                    break;

                case 611:
                case 612:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/sleet-white.png');
                    } else {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/sleet-grey.png');
                    }

                    break;

                case 741:
                case 751:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/fog-white.png');
                    } else {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/fog-grey.png');
                    }

                    break;

                case 300:
                case 301:
                case 302:
                case 500:
                case 501:
                case 502:
                case 511:
                case 520:
                case 521:
                case 522:

                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/rain-white.png');
                    } else {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/rain-grey.png');
                    }
                    break;

                case 600:
                case 601:
                case 602:
                case 610:
                case 611:
                case 612:
                case 621:
                case 622:
                case 623:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/snow-white.png');
                    } else {
                        $(hourlyImg[z]).attr('src', './assets/images/summary-icons/snow-grey.png');
                    }
                    break;

                default:

                    break;
            }
        }
    }
    request3.send();
});


/* --------------- Dynamic check for content in the input ---------------*/

var $input = $('#location-input');
var $addButton = $('#add-city-btn');

setInterval(function () {
    if ($input.val().length > 0) {
        $addButton.removeClass('disabled');
        $addButton.prop('disabled', false)

    } else {
        $addButton.addClass('disabled');
        $addButton.prop('disabled', true);
    }
}, 100);

/* --------------- Open and close buttons for the menu ---------------*/

function opnMnuBtn() {
    $("#menu-container")[0].style.right = "0%";
}

function clsMnuBtn() {
    $("#menu-container")[0].style.right = "-65%";
    $("#location-input").val("")
}

/* --------------- Switch between lower panels ---------------*/

function shwLwrPnl() {
    if ($("#hourly-weather-wrapper")[0].style.bottom != "0%") {
        $("#hourly-weather-wrapper")[0].style.bottom = "0%";
        $("#daily-weather-wrapper")[0].style.bottom = "-100%";
        $("#toggle-hourly-weather")[0].style.transform = "translate(-50%, -50%) rotate(180deg)";

    } else {
        $("#hourly-weather-wrapper")[0].style.bottom = "-100%"
        $("#daily-weather-wrapper")[0].style.bottom = "0%";
        $("#toggle-hourly-weather")[0].style.transform = "translate(-50%, -50%) rotate(0deg)";
    }
}

/* --------------- Enter == button click ---------------*/

$('#location-input').keypress(function (e) {
    if (e.which == 13) {//Enter key pressed
        if ($input.val().length > 0) {
            let cityName = $input.val();
            updateCity(cityName);
        }
    }
});

/* --------------- Make first letter uppercase ---------------*/

$('#location-input').keyup(function (event) {
    var textBox = event.target;
    var start = textBox.selectionStart;
    var end = textBox.selectionEnd;
    textBox.value = textBox.value.charAt(0).toUpperCase() + textBox.value.slice(1).toLowerCase();
    textBox.setSelectionRange(start, end);
});

/* --------------- Get city names for autocomplete widget ---------------*/

$(function () {
    var availableTags = [];
    $.getJSON("city.list.json", function(json) {
        json.forEach(element => {
            availableTags.push(element.name)
        }); 
    });
    $("#location-input").autocomplete({
        source: function (request, response) {
            var resultsa = $.ui.autocomplete.filter(availableTags, request.term);

            var results = $.map(resultsa, function (tag) {
                if (tag.toUpperCase().indexOf(request.term.toUpperCase()) === 0) {
                    return tag;
                }
            });
            response(results.slice(0, 10));
        },
        messages: {
            noResults: '',
            results: function () { }
        }
    });
    $("#location-input").keypress(function (e) {
        if (!e) e = window.event;
        if (e.keyCode == '13') {
            $('#location-input').autocomplete('close');
            return false;
        }
    });
});


/* --------------- Add and remove saved cities ---------------*/

let counter = 0;
let fav = [];
function saveCity() {
    counter += 1;
    let currentCity = $input.val();
    let savedCityHtml = '<div class="flex-container saved-city-box ' + counter + '">' +
        '<div class="ripple" id="saved-city">' +
        '<h1 id="saved-city-name' + counter + '" class="fav-cities"></h1>' +
        '</div>' +
        '<div><button  class="ripple remove-saved-city" id="remove-saved-city"> X </button></div>' +
        '</div>';

    let favouriteCities = $(".fav-cities");
    if (favouriteCities.length >= 1) {

        if (!fav.includes(currentCity)) {
            $('#saved-cities-wrapper').append(savedCityHtml);
            $('#saved-city-name' + counter).text(currentCity);
            fav.push(currentCity);

        } 
    } else {
        $('#saved-cities-wrapper').append(savedCityHtml);
        $('#saved-city-name' + counter).text(currentCity);
        fav.push(currentCity);
    }
}

$(document).on('click', '.remove-saved-city', function () {
    $(this).closest('.saved-city-box').remove();
    fav.pop($(this).closest(":has(h1)").find('h1').text());
})


$(document).on('click', '#saved-city', function (e) {
    let savedCity = $(this).children().first().text();
    e.preventDefault();
    updateCity(savedCity);
});

/* --------------- Update content on enter or button click ---------------*/

function updateCity(name) {

    updateMainData(name)
    updateDailyTemperature(name)
    updateHourlyTemperature(name)


}

function updateDailyTemperature(city) {
    let firstPart = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
    let thirdPart = '&days=7&key=67a3ecbb662c4060b33cbd6bb6201f1b';
    const finalPart = firstPart + city + thirdPart;
    const request = new XMLHttpRequest();
    request.open("GET", finalPart);
    request.onload = function () {
        let data = JSON.parse(request.responseText);
        var temp = $('.temperature').length;

        for (let index = 0; index < temp; index++) {
            $('.temperature')[index].innerHTML = Math.round(data.data[index].min_temp) + '&#x2193' + ' / ' + Math.round(data.data[index].max_temp) + '&#x2191';
        }
    }
    request.send();
}

function updateHourlyTemperature(city) {
    let firstPart = 'https://api.weatherbit.io/v2.0/forecast/hourly?city=';
    let secondPart = '&key=67a3ecbb662c4060b33cbd6bb6201f1b&hours=24';
    const finalPart = firstPart + city + secondPart;
    const request = new XMLHttpRequest();
    request.open("GET", finalPart);
    request.onload = function () {
        let data = JSON.parse(request.responseText);
        let hourNum = $('.hour').length;
        let img = $('#hourly-img-container #hourly-icon');
        for (let z = 0; z < hourNum; z++) {
            if (data.data[z].datetime.substr(11, 2) > 12) {
                $('.hour')[z].innerHTML = data.data[z].datetime.substr(11, 2) + ":00 PM";
            } else {
                $('.hour')[z].innerHTML = data.data[z].datetime.substr(11, 2) + ":00 AM";
            }
            $('.hourlyTemp')[z].innerHTML = data.data[z].temp;
            switch (data.data[z].weather.code) {
                case 800:
                    if (data.data[z].datetime.substr(11, 2) > 18 || data.data[z].datetime.substr(11, 2) < 06) {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(img[z]).attr('src', './assets/images/summary-icons/clear-night-white.png');
                        } else {
                            $(img[z]).attr('src', './assets/images/summary-icons/clear-night-grey.png');
                        }
                    } else {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(img[z]).attr('src', './assets/images/summary-icons/clear-day-white.png');
                        } else {
                            $(img[z]).attr('src', './assets/images/summary-icons/clear-day-grey.png');
                        }
                    }

                    break;

                case 801:
                case 802:
                    if (data.data[z].datetime.substr(11, 2) > 18 || data.data[z].datetime.substr(11, 2) < 06) {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(img[z]).attr('src', './assets/images/summary-icons/partly-cloudy-night-white.png');
                        } else {
                            $(img[z]).attr('src', './assets/images/summary-icons/partly-cloudy-night-grey.png');
                        }
                    } else {
                        if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                            $(img[z]).attr('src', './assets/images/summary-icons/partly-cloudy-day-white.png');
                        } else {
                            $(img[z]).attr('src', './assets/images/summary-icons/partly-cloudy-day-grey.png');
                        }
                    }

                    break;

                case 803:
                case 804:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(img[z]).attr('src', './assets/images/summary-icons/cloudy-white.png');
                    } else {
                        $(img[z]).attr('src', './assets/images/summary-icons/cloudy-grey.png');
                    }
                    break;

                case 611:
                case 612:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(img[z]).attr('src', './assets/images/summary-icons/sleet-white.png');
                    } else {
                        $(img[z]).attr('src', './assets/images/summary-icons/sleet-grey.png');
                    }

                    break;

                case 741:
                case 751:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(img[z]).attr('src', './assets/images/summary-icons/fog-white.png');
                    } else {
                        $(img[z]).attr('src', './assets/images/summary-icons/fog-grey.png');
                    }

                    break;

                case 300:
                case 301:
                case 302:
                case 500:
                case 501:
                case 502:
                case 511:
                case 520:
                case 521:
                case 522:

                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(img[z]).attr('src', './assets/images/summary-icons/rain-white.png');
                    } else {
                        $(img[z]).attr('src', './assets/images/summary-icons/rain-grey.png');
                    }
                    break;

                case 600:
                case 601:
                case 602:
                case 610:
                case 611:
                case 612:
                case 621:
                case 622:
                case 623:
                    if ($('main')[0].style.backgroundImage == 'url("../assets/images/bg-images/rain.jpg")') {
                        $(img[z]).attr('src', './assets/images/summary-icons/snow-white.png');
                    } else {
                        $(img[z]).attr('src', './assets/images/summary-icons/snow-grey.png');
                    }
                    break;

                default:

                    break;
            }
        }
    }
    request.send();
}

function updateMainData(city) {
    let firstPart = 'https://api.openweathermap.org/data/2.5/weather?q=';
    let thirdPart = '&APPID=bd6d48a8fbb8878d55ceec9ae0cb903f';
    const finalPart = firstPart + city + thirdPart;
    const request = new XMLHttpRequest();
    request.open("GET", finalPart);
    request.onload = function () {
        let data = JSON.parse(request.responseText);

        $(".location-label").text(data.name);
        $("#degrees-label").text(Math.trunc(data.main.temp - 273.15) + '\xB0');
        $("#summary-label")[0].innerHTML = data.weather[0].main;
        $("#humidity")[0].innerHTML = data.main.humidity + "%";
        $("#wind-speed")[0].innerHTML = data.wind.speed + "km/h";
        switch (data.weather[0].id) {
            case 800:
                if (d.getHours() >= 18) {
                    $("#summary-icon").attr('src', './assets/images/summary-icons/clear-night-white.png');
                    $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/clear-night.jpg")';
                } else {
                    $("#summary-icon").attr('src', './assets/images/summary-icons/clear-day-white.png');
                    $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/clear-day.jpg")';
                }

                break;

            case 801:
            case 802:
                $("#summary-icon").attr('src', './assets/images/summary-icons/partly-cloudy-day-white.png');
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/partly-cloudy-day.jpg")';

                break;

            case 803:
            case 804:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/cloudy.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/cloudy-white.png');

                break;

            case 611:
            case 612:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/sleet.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/sleet-white.png');

                break;

            case 741:
            case 751:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/fog.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/fog-white.png');

                break;

            case 300:
            case 301:
            case 302:
            case 500:
            case 501:
            case 502:
            case 511:
            case 520:
            case 521:
            case 522:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/rain.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/rain-white.png');

                break;
            case 600:
            case 601:
            case 602:
            case 610:
            case 611:
            case 612:
            case 621:
            case 622:
            case 623:
                $('main')[0].style.backgroundImage = 'url("../assets/images/bg-images/snow.jpg")';
                $("#summary-icon").attr('src', './assets/images/summary-icons/snow-white.png');

                break;

            default:

                break;
        }
    }
    request.send();
}

