console.log('Activating Musician extension on JioSaavn page');

var my_awesome_script = document.createElement('script');

my_awesome_script.setAttribute('src', "chrome-extension://onhgdoblopmielbooghkdggaccompfeb/test.js");

document.head.appendChild(my_awesome_script);
isBridgeExist = !!document.getElementById('bridgeDiv');

if (!isBridgeExist) {
    const bridgeDivElement = document.createElement('div');
    bridgeDivElement.innerHTML = "hello world";
    bridgeDivElement.className = "hide";
    bridgeDivElement.id = "bridgeDiv";

    bridgeDivElement.addEventListener('clientToChrome', (event) => {
        switch (event.detail.action) {
            case 'test':
                console.log('tunnel test pass');
                break;
            default:
                console.error('wrong data format passed');
        }
    });
    document.body.appendChild(bridgeDivElement);
}