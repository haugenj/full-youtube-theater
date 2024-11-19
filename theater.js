const playerContainerId = "player-full-bleed-container"
const mastheadId = "masthead"
const managerId = "page-manager"

let theater = false
let mini = false

// ======
// main
// ======
const observer = new MutationObserver(observerCallback)
observer.observe(document.body, { childList: true, subtree: true })

// ===========
// callbacks
// ===========
function observerCallback(_mutationList, observer) {
    // wait for player to load before adding observers
    if (document.getElementById(playerContainerId)) {
        const ytdWatchFlexy = document.getElementsByTagName("ytd-watch-flexy")[0]
        const theaterObserver = new MutationObserver(theaterCallback)
        theaterObserver.observe(ytdWatchFlexy, { attributes: true })

        const ytdApp = document.getElementsByTagName("ytd-app")[0]
        const miniObserver = new MutationObserver(miniCallback)
        miniObserver.observe(ytdApp, { attributes: true })

        observer.disconnect();
    }
}

function theaterCallback(mutationList) {
    theater = mutationList[0].target.attributes.getNamedItem("theater") !== null
    update()
}

function miniCallback(mutationList) {
    mini = mutationList[0].target.attributes.getNamedItem("miniplayer-is-active") !== null
    update()
}

function update() {
    if (theater && !mini) {
        document.getElementById(mastheadId).setAttribute("theater", "")
        document.getElementById(managerId).setAttribute("theater", "")
    } else {
        document.getElementById(mastheadId).removeAttribute("theater")
        document.getElementById(managerId).removeAttribute("theater")
    }
}