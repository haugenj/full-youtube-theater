const playerContainerId = "player-full-bleed-container"
const mastheadId = "masthead"
const managerId = "page-manager"

let theater = false
let isWatchPage = false

// ======
// main is-watch-page
// ======
const observer = new MutationObserver(setCallbacks)
observer.observe(document.body, { childList: true, subtree: true })

// ===========
// callbacks
// ===========
function setCallbacks(_mutationList, observer) {
    // wait for player to load before adding observers
    if (document.getElementById(playerContainerId)) {
        const ytdWatchFlexy = document.getElementsByTagName("ytd-watch-flexy")[0]
        const theaterObserver = new MutationObserver(theaterCB)
        theaterObserver.observe(ytdWatchFlexy, { attributes: true })

        const ytdMasthead = document.getElementsByTagName("ytd-masthead")[0]
        const watchPageObserver = new MutationObserver(isWatchPageCB)
        watchPageObserver.observe(ytdMasthead, { attributes: true })

        observer.disconnect();
    }
}

function theaterCB(mutationList) {
    theater = mutationList[0].target.attributes.getNamedItem("theater") !== null
    update()
}

function isWatchPageCB(mutationList) {
    // prevents page load failure
    let tmp = mutationList[0].target.attributes.getNamedItem("is-watch-page") !== null
    if (isWatchPage != tmp) {
        isWatchPage = tmp
        update()
    }
}

function update() {
    if (theater && isWatchPage) {
        document.getElementById(mastheadId).setAttribute("theater", "")
        document.getElementById(managerId).setAttribute("theater", "")
    } else {
        document.getElementById(mastheadId).removeAttribute("theater")
        document.getElementById(managerId).removeAttribute("theater")
    }
}