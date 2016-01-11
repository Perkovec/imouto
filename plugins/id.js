// Generated by CoffeeScript 1.10.0
var msgCache;

msgCache = require('../lib/msg_cache');

module.exports = {
  pattern: /!id$/,
  name: 'ID',
  onMsg: function(msg) {
    var tmp;
    if (msg.reply_to_message != null) {
      tmp = msgCache.tryResolve(msg.reply_to_message);
      if (tmp != null) {
        if (tmp.forward_from != null) {
          return msg.reply("" + tmp.forward_from.id);
        } else {
          return msg.reply("" + tmp.from.id);
        }
      } else {
        return msg.reply("Нет данных...");
      }
    } else {
      return msg.reply("" + msg.from.id);
    }
  }
};
