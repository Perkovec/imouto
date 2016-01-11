// Generated by CoffeeScript 1.10.0
var capitalize, config, misc;

misc = require('../lib/misc');

config = require('../lib/config');

capitalize = function(txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1);
};

module.exports = {
  name: 'Hello',
  isAcceptMsg: function(msg) {
    return (msg.text != null) && !msg.text.startsWith('!') && !msg.text.startsWith('/') && ((msg.chat.first_name != null) || this.reply_to_me(msg) || this.test(/\b(сестричка|сестрёнка|сестренка|сестра|бот)\b/, msg.text));
  },
  onMsg: function(msg) {
    var res;
    res = this.go(msg);
    if (res) {
      return msg.send(res);
    }
  },
  test: function(pat, txt) {
    return this.fixPattern(pat).test(txt);
  },
  find: function(pat, txt) {
    return this.fixPattern(pat).exec(txt);
  },
  go: function(msg) {
    var ans, isCall, night, or1, or2, orMatch, q, txt, you;
    txt = msg.text.trim();
    you = msg.from.first_name;
    if (this.test(/\b(привет|прив\b)/, txt) && !this.test(/\bбот\b/, txt)) {
      return "Привет, " + you + "!";
    } else if (this.test(/как дела.*\?$/, txt)) {
      return misc.randomChoice(['Хорошо!', 'Хорошо!', 'Плохо!', 'Плохо!', 'Как всегда.', 'А у тебя?', 'Чем занимаешься?', 'Я креветко', 'Истинно познавшие дзен не используют оценочных суждений.']);
    } else if (this.test(/\b(пока|бб)\b/, txt)) {
      return "Пока-пока, " + you + "!";
    } else if (this.test(/\b(спасибо|спс)\b/, txt)) {
      if (Math.random() < 0.5) {
        return "Не за что, " + you + "!";
      } else {
        return "Пожалуйста, " + you + "!";
      }
    } else if (this.test(/\b(споки|спокойной ночи)\b/, txt)) {
      night = misc.randomChoice(['Спокойной ночи', 'Сладких снов', 'До завтра']);
      return night + ", " + you + "!";
    } else if (this.test(/\b(глупая|глупый)\b/, txt)) {
      return "Я не глупая!";
    } else if (this.test(/\b(тупая|тупой)\b/, txt)) {
      return "Я не тупая!";
    } else if (this.test(/\b(дура|дурак)\b/, txt)) {
      return "Я не дура!";
    } else if (this.test(/\bбака\b/, txt)) {
      return "Я не бака!";
    } else if (this.test(/\b(умная|умный|умница|няша)\b/, txt)) {
      return "Да, я умная " + String.fromCodePoint(0x1F467);
    } else if (this.test(/^\W*\b(сестричка|сестрёнка|сестренка|сестра|бот)\b\W*$/, txt)) {
      return misc.randomChoice(['Что?', 'Что?', 'Что?', 'Да?', 'Да?', 'Да?', you, 'Слушаю', 'Я тут', 'Няя~', 'С Л А В А   Р О Б О Т А М']);
    } else if ((msg.chat.first_name != null) || this.reply_to_me(msg) || this.test(/^(сестричка|сестрёнка|сестренка|сестра|бот)\b/, txt)) {
      q = this.find(/\b(скажи|покажи|переведи|найди|ищи|поищи|help|помощь|хелп|хэлп)\b(?:\s*)([^]*)/, txt);
      if (q != null) {
        this.trigger(msg, "!" + q[1] + " " + q[2]);
        return null;
      }
      if (txt.endsWith('?')) {
        orMatch = this.find(/([a-zA-Zа-яА-Я0-9\s]+)(?:,\s*)?\bили\b([a-zA-Zа-яА-Я0-9\s]+)/, txt);
        if (orMatch != null) {
          or1 = orMatch[1].trim();
          isCall = this.find(/^(сестричка|сестрёнка|сестренка|сестра|бот)\s+(.+)/, or1);
          if (isCall != null) {
            or1 = isCall[2];
          }
          or1 = capitalize(or1.trim()) + ".";
          or2 = capitalize(orMatch[2].trim()) + ".";
          ans = misc.randomChoice([or1, or2]);
        } else {
          ans = misc.randomChoice(['Да', 'Нет', 'Это не важно', 'Спок, бро', 'Толсто', 'Да, хотя зря', 'Никогда', '100%', '1 шанс из 100', 'Попробуй еще раз']);
        }
        msg.reply(ans);
        return null;
      }
      return null;
    } else {
      return null;
    }
  },
  reply_to_me: function(msg) {
    var ref;
    return ((ref = msg.reply_to_message) != null ? ref.from.username : void 0) === config.userName;
  }
};
