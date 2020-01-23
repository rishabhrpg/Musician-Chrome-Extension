config = JSON.parse(window.localStorage.getItem("config"));
if (config) {
    document.getElementById('auto').checked = config.autoDownload;
    document.getElementById('auto').addEventListener('change', (e) => {
        result = document.getElementById('auto').checked;
        window.localStorage.setItem("config", JSON.stringify({ "autoDownload": result }));
    })
}else{
    window.localStorage.setItem("config", JSON.stringify({ "autoDownload": false }));
}
