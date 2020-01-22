console.log('running background.js for the Musician extension');
let autoDownload;
let isConfig = window.localStorage.getItem("config");
if(!!isConfig){
    autoDownload = JSON.parse(isConfig);
    console.log(autoDownload)
}else{
     window.localStorage.setItem("config",JSON.stringify({"autoDownload":false}));
}

chrome.tabs.query({ url: "*://*.jiosaavn.com/*" }, function callback(tabs) {
	for (let tab of tabs) {
		//	chrome.tabs.executeScript(tab.id, { file: "inject.js" });
	}
});
chrome.downloads.setShelfEnabled(false);
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		chrome.downloads.download({
			url: request.source,
			filename: `musician/${request.meta.album}/${request.meta.title}.mp3`,
			conflictAction: 'overwrite'
		});
		sendResponse(` saved to -> musician/${request.meta.album}/${request.meta.title}.mp3`);
	}
);