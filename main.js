define(function (require, exports, module) {

    "use strict";

    var extension_utils = brackets.getModule('utils/ExtensionUtils'),
        native_app = brackets.getModule('utils/NativeApp'),
        dialogs = brackets.getModule('widgets/Dialogs'),
        app_init = brackets.getModule('utils/AppInit'),
        command = brackets.getModule('command/CommandManager'),
        menus = brackets.getModule('command/Menus'),
        template = require('text!template.html');


    function open_modal() {

        var dialog = dialogs.showModalDialogUsingTemplate( template, false );

        $('.wr-input').keyup(function( e ) {
            if( e.keyCode == '13' ) $('.wr-submit').trigger('click');
            if( e.keyCode == '27' ) dialog.close();
        }).focus();

        $('.wr-close').click(function() { dialog.close(); });
        $('.wr-submit').click(function() {

            var query = $('.wr-input').val();

            native_app.openURLInDefaultBrowser( 'https://webref.ru/search/?s=' + query );
            dialog.close();

        });

    }

    app_init.appReady(function() {

        var icon = $("<a href='#'><img width='16' height='16' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QN+RXhpZgAASUkqAAgAAAACADIBAgAUAAAAJgAAAGmHBAABAAAAOgAAAEAAAAAyMDE2OjEyOjIxIDAxOjI1OjE3AAAAAAAAAAMAAwEEAAEAAAAGAAAAAQIEAAEAAABqAAAAAgIEAAEAAAAMAwAAAAAAAP/Y/+AAEEpGSUYAAQEAAAEAAQAA/9sAQwAGBAUGBQQGBgUGBwcGCAoQCgoJCQoUDg8MEBcUGBgXFBYWGh0lHxobIxwWFiAsICMmJykqKRkfLTAtKDAlKCko/9sAQwEHBwcKCAoTCgoTKBoWGigoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgo/8AAEQgAEAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9V8P6LeeL9R8TXl94m8R2htdYuLKKGxvfJiWOPbt+XaRnB69+p5ySeINFvPCGo+Gbyx8TeI7s3WsW9lLDfXvnRNHJu3fLtAzgde3Uc4Iv2ugeNdB1HWv+Edm8OzWF/fy34N8JxKrSYyuE4wMY9+vGcDJgvNf8f8AjBbG6tLbSLDw7f2l7PDMrNc+YEY7QQdjKWDYbj5SrDPSgD//2f/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIABAAEAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APVfD+i3ni/UfE15feJvEdobXWLiyihsb3yYljj27fl2kZwevfqeckniDRbzwhqPhm8sfE3iO7N1rFvZSw31750TRybt3y7QM4HXt1HOCL9roHjXQdR1r/hHZvDs1hf38t+DfCcSq0mMrhOMDGPfrxnAyYLzX/H/AIwWxurS20iw8O39pezwzKzXPmBGO0EHYylg2G4+Uqwz0oA//9k='></a>")
                    .appendTo($("#main-toolbar .buttons"));

        icon.click(function() {open_modal();});

        var WEBREF_DOC_EXECUTE = 'com.wr.doc';
        command.register('webref.ru Doc', WEBREF_DOC_EXECUTE, open_modal);

        var menu = menus.getMenu(menus.AppMenuBar.FIND_MENU);
        menu.addMenuItem(WEBREF_DOC_EXECUTE, 'Ctrl-Alt-Z');

    });

});
