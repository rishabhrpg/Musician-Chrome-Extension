config = JSON.parse(window.localStorage.getItem("config"));
if (config) {
    document.getElementById('auto').checked = config.autoDownload;
    document.getElementById('shelf').checked = config.disableShelf;
    document.getElementById('auto').addEventListener('change', (e) => {
        auto_result = document.getElementById('auto').checked;
        shelf_result = document.getElementById('shelf').checked;
        window.localStorage.setItem("config", JSON.stringify({ "autoDownload": auto_result, "disableShelf": shelf_result }));
    })
    document.getElementById('shelf').addEventListener('change', (e) => {
        auto_result = document.getElementById('auto').checked;
        shelf_result = document.getElementById('shelf').checked;
        window.localStorage.setItem("config", JSON.stringify({ "autoDownload": auto_result, "disableShelf": shelf_result }));
        chrome.runtime.sendMessage({data: shelf_result });
    })
} else {
    window.localStorage.setItem("config", JSON.stringify({ "autoDownload": false, "disableShelf": false }));
}
