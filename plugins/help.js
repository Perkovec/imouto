// Generated by CoffeeScript 1.9.1
var helptext;

helptext = "Команды, которые я понимаю:\n\n!скажи <текст>\n!переведи [<язык источника>] [<язык перевода>] <текст> - перевод текста\n!цитата [<номер>|<автор>|<текст>] - поиск цитат в цитатнике\n!войс(!голос, !voice, !speak) [<язык>] <текст> - произнести текст\n!welcome [on|off] - включить или выключить приветствие новых участников\n\n!пик(!покажи,!img) <картинка> - поиск картинок\n!найди(!g) <текст> - поиск в Google\n!видео(!yt) <текст> - поиск видео на YouTube\n!аниме <название> - поиск аниме\n!манга <название> - поиск манги\n!вн(!vn) [<название>] - поиск визуальных новелл\n\n!xkcd [en] [<номер>] - комиксы XKCD\n!няш(!мяш) - случайный пост или картинка с nya.sh\n!баш - случайная цитата с bash.im\n!няша [<теги>] - случайная картинка с danbooru\n\n!команды(!help) - список команд";

module.exports = {
  name: 'Help',
  pattern: /[!\/](help|помощь|команды|хэлп|хелп)\b/,
  onMsg: function(msg) {
    return msg.send(helptext);
  }
};
