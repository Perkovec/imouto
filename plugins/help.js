// Generated by CoffeeScript 1.10.0
var helptext;

helptext = "Команды, которые я понимаю:\n\n!скажи <текст>\n!переведи [<язык источника>] [<язык перевода>] <текст> - перевод текста\n!цитата(!ц,!q) [<номер>|<автор>|<текст>] - поиск цитат в цитатнике\n!цц(!qq) - цитата с положительным рейтингом\n!roll [число|диапазон|dice] - случайный бросок кубиков\n!печет(...) - выразить свое негодование\n!статус - посмотреть или изменить статус\n\n!пик(!покажи,!img) <картинка> - поиск картинок\n!найди(!g) <текст> - поиск в Google\n!видео(!yt) <текст> - поиск видео на YouTube\n!аниме <название> - поиск аниме\n!манга <название> - поиск манги\n!вн(!vn) [<название>] - поиск визуальных новелл\n!курс - курс валют\n\n!xkcd [en] [<номер>] - комиксы XKCD\n!няш(!мяш) - случайный пост или картинка с nya.sh\n!баш - случайная цитата с bash.im\n!няша [<теги>] - случайная картинка с danbooru\n\n!команды(!help) - список команд";

module.exports = {
  name: 'Help',
  pattern: /[!\/](help|помощь|команды|хэлп|хелп)\b/,
  onMsg: function(msg) {
    return msg.send(helptext, {
      preview: false
    });
  }
};
