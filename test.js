console.log('Musician is handling this tab');
jwplayer().onPlay(()=> console.log('Playing song',init()));

function init() {
    
    //console.log('jwplayer : ', jwplayer());

    trackName = document.getElementById("player-track-name").textContent;
    albumName = document.getElementById("player-album-name").textContent;
    url = document.getElementsByClassName("key-art")[2].style.backgroundImage;
    index = url.indexOf('80x80');
    img = url.substr(5, index);
    img_80x80 = img + '.jpg';
    img_500x500 = img.substr(0, img.indexOf('80x80')) + '500x500.jpg';
    
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: trackName,
            artist: 'Unknown Artist',
            album: albumName,
            artwork: [
                { src: img_80x80, sizes: '80x80', type: 'image/png' },
                { src: img_500x500, sizes: '500x500', type: 'image/png' },
            ]
        });
    }
}

if ('mediaSession' in navigator) {

    navigator.mediaSession.setActionHandler('play', function () {
        document.getElementById("play").click();
    });
    navigator.mediaSession.setActionHandler('pause', function () {
        document.getElementById("pause").click();
    });
    navigator.mediaSession.setActionHandler('seekbackward', function () { });
    navigator.mediaSession.setActionHandler('seekforward', function () { });
    navigator.mediaSession.setActionHandler('previoustrack', function () {
        document.getElementById("rew").click()
        init();
    });
    navigator.mediaSession.setActionHandler('nexttrack', function () {
        document.getElementById("fwd").click();
        init();
    });
}