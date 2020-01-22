console.log('Musician is handling this tab');
jwplayer().onPlay(() => init());

function init() {

    trackName = document.getElementById("player-track-name").textContent;
    albumName = document.getElementById("player-album-name").textContent;
    singers = jwplayer().getPlaylist()[0].description.singers;
    url = document.getElementsByClassName("key-art")[2].style.backgroundImage;
    index = url.indexOf('80x80');
    img = url.substr(5, index);
    img_80x80 = img + '.jpg';
    img_500x500 = img.substr(0, img.indexOf('80x80')) + '500x500.jpg';

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: trackName,
            artist: singers,
            album: albumName,
            artwork: [
                { src: img_80x80, sizes: '80x80', type: 'image/png' },
                { src: img_500x500, sizes: '500x500', type: 'image/png' },
            ]
        });
    }
    e = new CustomEvent('clientToChrome',
        {
            bubbles: false,
            detail: { action: 'test' }
        });
    document.getElementById('bridgeDiv').dispatchEvent(e);
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