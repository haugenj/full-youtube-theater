// Masthead height is 56px
const maxHeightPaused = "calc(100vh - 56px)"
const maxHeightPlaying = "100vh"
const playerContainerId = "full-bleed-container"
const mastheadId = "masthead"
const managerId = "page-manager"

function observerCallback(mutationList, observer) {
    // wait for player to load first
    if (document.getElementById(playerContainerId)) {
        const videoEl = document.getElementsByTagName('video')[0]
        setMaxHeight(playerContainerId, maxHeightPaused);

        videoEl.addEventListener('play', () => {
            hideMastHead()
            setMaxHeight(playerContainerId, maxHeightPlaying);
        })
        videoEl.addEventListener('pause', () => {
            showMastHead()
            setMaxHeight(playerContainerId, maxHeightPaused)
        })

        observer.disconnect();
    }
}

const observer = new MutationObserver(observerCallback)
observer.observe(document.body, { childList: true, subtree: true })

// watch for fullscreen mode and then drop the maxHeight requirement - not supported on Safari
document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        removeMaxHeight(playerContainerId)
    } else {
        setMaxHeight(playerContainerId)
    }
})

function setMaxHeight(id, height) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = height
}

function removeMaxHeight(id) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = null
}

function hideMastHead() {
    document.getElementById(mastheadId).style.display = "none"
    document.getElementById(managerId).style.marginTop = "0"
}

function showMastHead() {
    document.getElementById(managerId).style.marginTop = "56px"
    document.getElementById(mastheadId).style.display = "block"
}