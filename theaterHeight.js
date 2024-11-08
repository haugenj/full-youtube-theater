// Masthead height is 56px
const mastHeadHeight = 56
const maxHeightPaused = "calc(100vh - 56px)"
const maxHeightPlaying = "100vh"
const playerContainerId = "full-bleed-container"
const playerId = "movie_player"
const mastId = "masthead"
const managerId = "page-manager"
let beenPlayed = false

function setMaxHeight(id, height) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = height
}

function removeMaxHeight(id) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = null
}

function playerObserverCB(mutationList, observer) {
    classes = document.getElementById(playerId).classList
    if (classes.contains('unstarted-mode')) {
        return
    } else if (classes.contains('playing-mode')) {
        console.log("jason playing")
        hideMastHead()
        setMaxHeight(playerContainerId, maxHeightPlaying);
    } else {
        console.log("jason paused")
        showMastHead()
        setMaxHeight(playerContainerId, maxHeightPaused)
    }
}

function observerCallback(mutationList, observer) {
    // wait for player to load first
    if (document.getElementById(playerContainerId)) {
        const playerObserver = new MutationObserver(playerObserverCB)
        playerObserver.observe(document.getElementById(playerId), { childList: true, subtree: true })

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

function hideMastHead() {
    console.log('jason hiding')
    document.getElementById('masthead').style.display = "none"
    document.getElementById('page-manager').style.marginTop = "0"
}

function showMastHead() {
    console.log('jason showing')
    document.getElementById('page-manager').style.marginTop = "56px"
    document.getElementById('masthead').style.display = "block"
    console.log('jason done showing')
}