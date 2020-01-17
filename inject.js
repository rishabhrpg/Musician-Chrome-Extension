console.log('executing injected script from Musician extension on JioSaavn page');

function init() {
    
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
setInterval(()=>{
    init();
}, 1000);

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