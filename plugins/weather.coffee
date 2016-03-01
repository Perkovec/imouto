lang = 'ru'

misc = require '../lib/misc'
config = require '../lib/config'
tz = require 'coordinate-tz'

moment = require 'moment-timezone'
moment.locale lang

degToCard = (deg) ->
  directions = ['Север','Север-Север-Восток','Север-Восток','Восток-Север-Восток','Восток','Восток-Юг-Восток','Юг-Восток','Юг-Юг-Восток','Юг','Юг-Юг-Запад','Юг-Запад','Запад-Юг-Запад','Запад','Запад-Север-Запад','Север-Запад','Север-Север-Запад','Север']
  directions[(deg/22.5).toFixed(0)]

icon = (type) ->
  switch type
    when "01d" then "☀️"
    when "01n" then "☀"
    when "02d" then "🌤"
    when "02n" then "🌤"
    when "03d" then "☁️"
    when "03n" then "☁️"
    when "04d" then "☁️"
    when "04n" then "☁️"
    when "09d" then "🌧"
    when "09n" then "🌧"
    when "10d" then "🌦"
    when "10n" then "🌦"
    when "11d" then "🌩"
    when "11n" then "🌩"
    when "13d" then "🌨"
    when "13n" then "🌨"
    when "50d" then "🌫"
    when "50n" then "🌫"

timezone = (lat, lon) ->
  tz.calculate(lat, lon).timezone

offset = (timezone) ->
  (date) ->
    tzdate = moment date
    tzdate.tz timezone

weather = (cityName) ->
  misc.get 'http://api.openweathermap.org/data/2.5/weather',
    qs:
      q: cityName
      units: 'metric'
      lang: lang
      appid: config.options.weathermap
    json: true
  .then (res) ->
    if res.cod isnt 200
      throw new Error res.message

    res


module.exports =
  name: 'Weather'
  pattern: /!(weather|погода)(?: (.+))?/
  isConf: true

  onMsg: (msg, safe) ->
    txt = msg.match[2]
    if not txt?
      return
    res = weather(txt)

    safe(res).then (data) ->
      type = icon data['weather'][0]['icon']
      zone = timezone data['coord']['lat'], data['coord']['lon']
      sunrise = sunset = offset zone

      emoji =
        "#{type}": "#{Math.floor data['main']['temp']} °C",
        "💦": "#{data['main']['humidity']}%",
        "💨": "#{data['wind']['speed']} км/ч / #{degToCard data['wind']['deg']}",
        "🌅": "#{sunrise(data['sys']['sunrise'] * 1000).format('LT')} #{zone}",
        "🌄": "#{sunset(data['sys']['sunset'] * 1000).format('LT')} #{zone}"

      desc = """
#{data['name']}, #{data['sys']['country']} - #{data['weather'][0]['main']}
#{data['weather'][0]['description']}
"""
      Object.keys(emoji).map (e) ->
        desc += "\n#{e}: #{emoji[e]}"

      msg.reply desc



  onError: (msg) ->
    msg.reply 'Город не найден.'