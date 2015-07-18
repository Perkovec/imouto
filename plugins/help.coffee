helptext = """Команды, которые я понимаю:

!скажи <текст>
!переведи [<язык источника>] [<язык перевода>] <текст> - перевод текста
!цитата [<номер>|<автор>|<текст>] - поиск цитат в цитатнике
!войс(!голос, !voice, !speak) [<язык>] <текст> - произнести текст
!welcome [on|off] - включить или выключить приветствие новых участников

!пик(!покажи,!img) <картинка> - поиск картинок
!найди(!g) <текст> - поиск в Google
!видео(!yt) <текст> - поиск видео на YouTube
!аниме <название> - поиск аниме
!манга <название> - поиск манги
!вн(!vn) [<название>] - поиск визуальных новелл

!xkcd [en] [<номер>] - комиксы XKCD
!няш(!мяш) - случайный пост или картинка с nya.sh
!баш - случайная цитата с bash.im
!няша [<теги>] - случайная картинка с danbooru

!команды(!help) - список команд"""

module.exports =
    name: 'Help'
    pattern: /[!\/](help|помощь|команды|хэлп|хелп)\b/

    onMsg: (msg) ->
        msg.send helptext