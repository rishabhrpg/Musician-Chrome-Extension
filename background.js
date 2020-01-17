console.log('running background.js for the Musician extension and now updated');
chrome.tabs.query({ url: "*://*.jiosaavn.com/*" }, function callback(tabs) {
	for (let tab of tabs) {
		console.log('tab detail : ', tab);

		chrome.tabs.executeScript(tab.id, { file: "inject.js" });
	}
});