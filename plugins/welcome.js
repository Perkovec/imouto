// Generated by CoffeeScript 1.10.0
var config, misc,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

config = require('../lib/config');

misc = require('../lib/misc');

module.exports = {
  name: 'Welcome',
  pattern: /!(welcome|intro)(?: (on|off))?$/,
  init: function() {
    var ref;
    return this.enabledChats = (ref = misc.loadJson('welcome')) != null ? ref : [];
  },
  isAcceptMsg: function(msg) {
    return (msg.new_chat_participant != null) || this.matchPattern(msg, msg.text);
  },
  onMsg: function(msg) {
    var isOn, ref, ref1, user;
    if (msg.new_chat_participant == null) {
      if (msg.match[1].toLowerCase() === 'welcome') {
        isOn = msg.match[2] !== 'off';
        if (isOn && (ref = msg.chat.id, indexOf.call(this.enabledChats, ref) < 0)) {
          this.enabledChats.push(msg.chat.id);
          msg.send("Включено приветствие для этого чата.");
        } else {
          this.enabledChats = this.enabledChats.filter(function(id) {
            return id !== msg.chat.id;
          });
          msg.send("Отключено приветствие для этого чата.");
        }
        return misc.saveJson('welcome', this.enabledChats);
      } else {
        return this.intro(msg);
      }
    } else {
      user = msg.new_chat_participant;
      if (user.username === config.userName) {
        return this.intro(msg);
      } else {
        if ((ref1 = msg.chat.id, indexOf.call(this.enabledChats, ref1) >= 0) && !((user.username != null) && user.username.endsWith('bot'))) {
          return this.welcomeUser(msg, user);
        }
      }
    }
  },
  intro: function(msg) {
    return msg.send("Всем привет! Я очень умная, и могу делать много разных вещей. Введите /help, чтобы посмотреть список команд.");
  },
  welcomeUser: function(msg, user) {
    return msg.send("Добро пожаловать, " + user.first_name + "!");
  }
};
