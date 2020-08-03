    // ==UserScript==
    // @name         FavSauger
    // @namespace    https://pr0gramm.com/
    // @version      1.0.1
    // @description  Generiert Linkliste mit euren Favoriten
    // @author       Sector
    // @include      *pr0gramm.com/user/*/favoriten
    // @icon         http://pr0gramm.com/media/pr0gramm-favicon.png
    // @grant        unsafeWindow
    // @run-at       document-idle
    // ==/UserScript==
            unsafeWindow.userHasScrolled = false;
            unsafeWindow.onscroll = function(e) {
                 unsafeWindow.userHasScrolled = true;
            }

            var thumbs = unsafeWindow.document.getElementsByTagName('img')
            var fav_array = unsafeWindow.document.getElementsByClassName("silent thumb");
            var user_link = unsafeWindow.document.getElementById("user-profile-name").getAttribute("href");
            var user = user_link.split("/")[2];
            var bar = unsafeWindow.document.getElementById("head-menu");
            var favDownload = "<a onclick='getAll()' class='user-only' id='upload-link' title='Favoriten downloaden'>Backup Favs</a>";
            bar.innerHTML += favDownload;

            unsafeWindow.download = function download(filename, text) {
                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            };

            unsafeWindow.getAll = function getAll() {
                if (unsafeWindow.userHasScrolled == true) {
                    var body = "";
                    for (var i = 0; i < thumbs.length; i++) {
                        body += thumbs[i].src.replace("thumb", "img") + "\n";
                        body += thumbs[i].src.replace("thumb", "vid").replace(".jpg", ".mp4") + "\n";
                        body += thumbs[i].src.replace("thumb", "img").replace(".jpg", ".gif") + "\n";
                        body += thumbs[i].src.replace("thumb", "img").replace(".jpg", ".png") + "\n";
                    }
                    unsafeWindow.download(user + "Favorites.txt", body);
                } else {
                    alert("Du Schlingel hast nicht nach ganz unten gescrollt!");
                }
            };
