// Generated by CoffeeScript 1.10.0
(function() {
  var config, degToCard, icon, lang, misc, moment, offset, timezone, tz, weather;

  lang = 'ru';

  misc = require('../lib/misc');

  config = require('../lib/config');

  tz = require('coordinate-tz');

  moment = require('moment-timezone');

  moment.locale(lang);

  degToCard = function(deg) {
    var directions;
    directions = ['Север', 'Север-Север-Восток', 'Север-Восток', 'Восток-Север-Восток', 'Восток', 'Восток-Юг-Восток', 'Юг-Восток', 'Юг-Юг-Восток', 'Юг', 'Юг-Юг-Запад', 'Юг-Запад', 'Запад-Юг-Запад', 'Запад', 'Запад-Север-Запад', 'Север-Запад', 'Север-Север-Запад', 'Север'];
    return directions[(deg / 22.5).toFixed(0)];
  };

  icon = function(type) {
    switch (type) {
      case "01d":
        return "☀️";
      case "01n":
        return "☀";
      case "02d":
        return "🌤";
      case "02n":
        return "🌤";
      case "03d":
        return "☁️";
      case "03n":
        return "☁️";
      case "04d":
        return "☁️";
      case "04n":
        return "☁️";
      case "09d":
        return "🌧";
      case "09n":
        return "🌧";
      case "10d":
        return "🌦";
      case "10n":
        return "🌦";
      case "11d":
        return "🌩";
      case "11n":
        return "🌩";
      case "13d":
        return "🌨";
      case "13n":
        return "🌨";
      case "50d":
        return "🌫";
      case "50n":
        return "🌫";
    }
  };

  timezone = function(lat, lon) {
    return tz.calculate(lat, lon).timezone;
  };

  offset = function(timezone) {
    return function(date) {
      var tzdate;
      tzdate = moment(date);
      return tzdate.tz(timezone);
    };
  };

  weather = function(cityName) {
    return misc.get('http://api.openweathermap.org/data/2.5/weather', {
      qs: {
        q: cityName,
        units: 'metric',
        lang: lang,
        appid: config.options.weathermap
      },
      json: true
    }).then(function(res) {
      if (res.cod !== 200) {
        throw new Error(res.message);
      }
      return res;
    });
  };

  module.exports = {
    name: 'Weather',
    pattern: /!(weather|погода)(?: (.+))?/,
    isConf: true,
    onMsg: function(msg, safe) {
      var res, txt;
      txt = msg.match[2];
      if (txt == null) {
        return;
      }
      res = weather(txt);
      return safe(res).then(function(data) {
        var desc, emoji, obj, sunrise, sunset, type, zone;
        type = icon(data['weather'][0]['icon']);
        zone = timezone(data['coord']['lat'], data['coord']['lon']);
        sunrise = sunset = offset(zone);
        emoji = (
          obj = {},
          obj["" + type] = (Math.floor(data['main']['temp'])) + " °C",
          obj["💦"] = data['main']['humidity'] + "%",
          obj["💨"] = data['wind']['speed'] + " км/ч / " + (degToCard(data['wind']['deg'])),
          obj["🌅"] = (sunrise(data['sys']['sunrise'] * 1000).format('LT')) + " " + zone,
          obj["🌄"] = (sunset(data['sys']['sunset'] * 1000).format('LT')) + " " + zone,
          obj
        );
        desc = data['name'] + ", " + data['sys']['country'] + " - " + data['weather'][0]['main'] + "\n" + data['weather'][0]['description'];
        Object.keys(emoji).map(function(e) {
          return desc += "\n" + e + ": " + emoji[e];
        });
        return msg.reply(desc);
      });
    },
    onError: function(msg) {
      return msg.reply('Город не найден.');
    }
  };

}).call(this);

//# sourceMappingURL=weather.js.map
