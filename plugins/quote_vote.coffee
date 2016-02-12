logger = require 'winston'

quotes = require '../lib/quotes'
misc = require '../lib/misc'
config = require '../lib/config'
tg = require '../lib/tg'

module.exports =
    name: 'Quotes (vote)'
    pattern: /[\!\/](LOYS|FUUU|ЛОЙС|ФУУУ|дизлойс|лайк|дизлайк|like|dislike|palec_VEPH|palec_HU3|opy|he_opu)(?:(?:_|\s+)(\d+))?/

    init: ->
        quotes.init()

    onMsg: (msg) ->
        isThumbsUp = msg.match[1].toLowerCase() in ["loys", "лойс", "лайк", "like", "palec_veph", "opy"]
        num = misc.tryParseInt(msg.match[2])
        num = quotes.vote(num, msg.chat.id, msg.from.id, isThumbsUp)
        if num?
            rating = quotes.getRating(num)
            if rating > 0
                rating = "+#{rating}"
            msg.reply "Ваш голос #{if isThumbsUp then quotes.THUMBS_UP else quotes.THUMBS_DOWN} учтён. Рейтинг <b>цитаты №#{num}</b>: [ #{rating} ]", parseMode: 'HTML'
