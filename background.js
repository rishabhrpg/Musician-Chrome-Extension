console.log('running background.js for the Musician extension');
let autoDownload;
let isConfig = window.localStorage.getItem("config");
if (!!isConfig) {
	autoDownload = JSON.parse(isConfig);
	console.log(autoDownload)
} else {
	window.localStorage.setItem("config", JSON.stringify({ "autoDownload": false }));
}

chrome.tabs.query({ url: "*://*.jiosaavn.com/*" }, function callback(tabs) {
	for (let tab of tabs) {
		//	chrome.tabs.executeScript(tab.id, { file: "inject.js" });
	}
});


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		config = JSON.parse(window.localStorage.getItem("config"));
		if (config) {
			if (config.autoDownload === true) {
				createDownloadIfNotExist(request);
			}
			sendResponse(` Auto save disabled -> musician/${request.meta.album}/${request.meta.title}.mp3`);
		}
	}
);

function createDownloadIfNotExist(request) {
	filename = `musician/${request.meta.album}/${request.meta.title}.mp3`;
	songs = JSON.parse(window.localStorage.getItem("list"));
	if (songs) {
		songExist = songs.find((song) => song === filename);
		if (!songExist) {
			chrome.downloads.setShelfEnabled(false);
			chrome.downloads.download({
				url: request.source,
				filename,
				conflictAction: 'overwrite'
			});
			sendResponse(` saved to -> musician/${request.meta.album}/${request.meta.title}.mp3`);
		}else{
			sendResponse(` Already Exist -> musician/${request.meta.album}/${request.meta.title}.mp3`);
		}
	}
}