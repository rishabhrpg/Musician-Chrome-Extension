console.log('running background.js for the Musician extension');
let autoDownload;
let isConfig = window.localStorage.getItem("config");
if (!!isConfig) {
	autoDownload = JSON.parse(isConfig);
	console.log(autoDownload)
} else {
	window.localStorage.setItem("config", JSON.stringify({ "autoDownload": false, "disableShelf": false }));
}

chrome.tabs.query({ url: "*://*.jiosaavn.com/*" }, function callback(tabs) {
	for (let tab of tabs) {
		//	chrome.tabs.executeScript(tab.id, { file: "inject.js" });
	}
});


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if ('meta' in request) {
			config = JSON.parse(window.localStorage.getItem("config"));
			if (config) {
				if (config.autoDownload === true) {
					createDownloadIfNotExist(request, sendResponse);
				} else {
					console.log(config);
					sendResponse(` Auto save disabled -> musician/${request.meta.album}/${request.meta.title}.mp3`);
				}
			}
		} else {
			chrome.downloads.setShelfEnabled(!request.data);
		}

	}
);

function createDownloadIfNotExist(request, sendResponse) {
	filename = `musician/${request.meta.album}/${request.meta.title}.mp3`;
	list = JSON.parse(window.localStorage.getItem("list"));

	if (!list) {
		list = {
			songs: []
		};
	}

	songExist = list.songs.find((song) => song === filename);

	if (songExist) {
		sendResponse(` Already Exist -> musician/${request.meta.album}/${request.meta.title}.mp3`);
	} else {
		list.songs.push(filename);
		window.localStorage.setItem('list', JSON.stringify({ "songs": list.songs }));

		chrome.downloads.download({
			url: request.source,
			filename,
			conflictAction: 'overwrite'
		});
		sendResponse(` saved to -> musician/${request.meta.album}/${request.meta.title}.mp3`);
	}

}