function getDocument(url) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {
        pushDoc(templateXHR.responseXML);
    }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}

function getURLText(url, loadCallback) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "text";
    templateXHR.addEventListener("load", function() {
        loadCallback(templateXHR);
    }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}

function launchPlayer(src) {
    var player = new Player();
    var playlist = new Playlist();
    var mediaItem = new MediaItem("video", src);
    mediaItem.title = "Video";
    player.playlist = playlist;
    player.playlist.push(mediaItem);
    player.present();
    //player.play()
}

function stopUpdate(obj) {
    // clearInterval(obj);
}

function setText(id, text) {
    if (typeof(getActiveDocument()) !== 'undefined') {
        getActiveDocument().getElementById(id).textContent = text;
    }
}

function getText(id) {
    if (typeof(getActiveDocument()) !== 'undefined') {
        return getActiveDocument().getElementById(id).textContent;
    }
}

function addEvent(obj) {

    var listItemLockupElements = getActiveDocument().getElementsByTagName("listItemLockup");
    for (var i = 0; i < listItemLockupElements.length; i++) {
        listItemLockupElements.item(i).addEventListener("select", function(event) {
            var self = this,
                ele = event.target,
                videoURL = ele.getAttribute("videoURL")
            videoTITLE = ele.getAttribute("videoTITLE")
            description = ele.getAttribute("description")
            artworkImageURL = ele.getAttribute("artworkImageURL")
            console.log(videoURL);
            if (videoURL) {

                var player = new Player();
                var playlist = new Playlist();
                var mediaItem = new MediaItem("video", videoURL);
                mediaItem.title = videoTITLE;
                mediaItem.description = description;
                mediaItem.artworkImageURL = artworkImageURL;
                player.playlist = playlist;
                player.playlist.push(mediaItem);
                player.present();

            }
        }, false);
    }

}

function pushDoc(document) {
    navigationDocument.pushDocument(document);
}

App.onLaunch = function(options) {

    loading();

    var templateURL = 'http://tools.llqoli.com/tv-Eyepetizer/tv.php';
    getDocumentContents(templateURL, function(xhr) {
        navigationDocument.clear();
        navigationDocument.pushDocument(xhr.responseXML);
        addEvent();
    });
}

App.onExit = function() {
    console.log('App finished');
}

function loading() {
    var alertXMLString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
       <loadingTemplate>
          <activityIndicator>
             <title>載入中</title>
          </activityIndicator>
       </loadingTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDOMElement = parser.parseFromString(alertXMLString, "application/xml");
    navigationDocument.insertBeforeDocument(alertDOMElement);
}

function alert(str, doneCallback) {
    var alertXMLString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <alertTemplate>
        <title>提示信息</title>
            <description>${str}</description>
        <button>
        <text>同意</text>
        </button>
        </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDOMElement = parser.parseFromString(alertXMLString, "application/xml");
    // alertDOMElement.addEventListener("select", doneCallback, false);
    navigationDocument.presentModal(alertDOMElement);
}

function getDocumentContents(url, loadCallback) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {
        loadCallback(templateXHR)
    }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}
