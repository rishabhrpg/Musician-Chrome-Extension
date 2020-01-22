console.log('running background.js for the Musician extension');
chrome.tabs.query({ url: "*://*.jiosaavn.com/*" }, function callback(tabs) {
	for (let tab of tabs) {
		console.log('tab detail : ', tab);

		chrome.tabs.executeScript(tab.id, { file: "inject.js" });
	}
});

window.addEventListener("message", function(event) {
	console.log("Content script received message: " + event.data.text);
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received message: " + event.data.text);
    }
});