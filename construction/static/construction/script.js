function calc_date() {
    var date = moment();
    if (date.date() % 2 === 0) {
        if (date.hours() >= 12) {
            date.add(2, "days");
        }
    } else if (date.date() > 30) {
        date.add(1, "month").date(2);
    } else {
        date.add(1, "days");
    }
    date.hours(12).minutes(0).seconds(0).milliseconds(0);

    return date;
}

function get_diff(date) {
    var days = date.diff(moment(), "days");
    if (days < 10) {
        var days_string = "0" + days;
    } else {
        var days_string = days;
    }

    var hours = date.diff(moment(), "hours") % 24;
    if (hours < 10) {
        var hours_string = "0" + hours;
    } else {
        var hours_string = hours;
    }

    var minutes = date.diff(moment(), "minutes") % 60;
    if (minutes < 10) {
        var minutes_string = "0" + minutes;
    } else {
        var minutes_string = minutes;
    }

    var seconds = date.diff(moment(), "seconds") % 60;
    if (seconds < 0) {
        seconds = 0;
    }
    if (seconds < 10) {
        var seconds_string = "0" + seconds;
    } else {
        var seconds_string = seconds;
    }

    return [days_string, hours_string, minutes_string, seconds_string, days, hours, minutes, seconds];
}

function print(days, hours, minutes, seconds) {
    $("#days").text(days);
    $("#hours").text(hours);
    $("#minutes").text(minutes);
    $("#seconds").text(seconds);
}

function rewind() {
    if (speed < 2000000) {
        speed = speed*(1.01 + speed/50000);
    }
    var diff = get_diff(current);
    print(diff[0], diff[1], diff[2], diff[3]);
    if (current.diff(date, "milliseconds") < -speed) {
        current.add(speed, "milliseconds");
        window.setTimeout(rewind, 50);
    } else {
        rewinding = false;
    }
}

var date = calc_date();
var current = moment();
var speed = 100;
var rewinding = false;
var excuses = ["poor documentation", "the coffee machine being broken", "unforseen problems", "poor management"];

$(document).ready(function() {
    window.setInterval(function() {
        if (!rewinding) {
            var diff = get_diff(date);
            print(diff[0], diff[1], diff[2], diff[3]);

            if (diff[4] <= 0 && diff[5] <= 0 && diff[6] <= 0 && diff[7] <= 0) {
                rewinding = true;
                var excuse = excuses[Math.floor(Math.random() * excuses.length)];
                setTimeout(function() {
                    $("#excuse").text("Unfortunatly, due to "+excuse+", development on this site has been delayed.");
                }, 2000);

                setTimeout(function() {
                    date = calc_date();
                    speed = 100;
                    rewind();
                }, 1000);
            }
        }
    }, 200);
});
