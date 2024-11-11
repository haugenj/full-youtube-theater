// Masthead height is 56px
const maxHeightPaused = "calc(100vh - 56px)"
const maxHeightPlaying = "100vh"
const playerContainerId = "player-full-bleed-container"
const mastheadId = "masthead"
const managerId = "page-manager"
const movieId = "movie_player"

let fullscreen = false
let theater = false
let miniplayer = false

const states = {
    pause: "pause",
    play: "play"
}
let playerState = states.pause

// ======
// main
// ======
const observer = new MutationObserver(observerCallback)
observer.observe(document.body, { childList: true, subtree: true })

// ===========
// callbacks
// ===========
function observerCallback(_mutationList, observer) {
    // wait for player to load first
    if (document.getElementById(playerContainerId)) {
        //
        // set initial player state
        const videoEl = document.getElementsByTagName('video')[0]
        if (document.getElementById(movieId).classList.contains("paused-mode")) {
            playerState = states.pause
        } else {
            playerState = states.play
            setMaxHeight(playerContainerId, maxHeightPlaying)
        }

        const ytdApp = document.getElementsByTagName("ytd-app")[0]
        miniplayer = ytdApp.attributes.getNamedItem("miniplayer-is-active") !== null

        const ytdWatchFlexy = document.getElementsByTagName("ytd-watch-flexy")[0]
        theater = ytdWatchFlexy.attributes.getNamedItem("theater") !== null
        
        //
        // event listeners
        videoEl.addEventListener('play', () => {
            playerState = states.play
            update()
        })
        videoEl.addEventListener('pause', () => {
            playerState = states.pause
            update()
        })

        document.addEventListener("fullscreenchange", () => { // (fyi - not supported on Safari)
            if (document.fullscreenElement) {
                fullscreen = true
                update()
            } else {
                fullscreen = false
                update()
            }
        })

        const miniPlayerObserver = new MutationObserver(miniPlayerCallback)
        miniPlayerObserver.observe(ytdApp, { attributes: true })

        const theaterObserver = new MutationObserver(theaterCallback)
        theaterObserver.observe(ytdWatchFlexy, { attributes: true })

        observer.disconnect();
    }
}

function miniPlayerCallback(mutationList) {
    miniplayer = mutationList[0].target.attributes.getNamedItem("miniplayer-is-active") !== null
    update()
}

function theaterCallback(mutationList) {
    theater = mutationList[0].target.attributes.getNamedItem("theater") !== null
    update()
}

// =======
// update
// =======
function update() {
    if (fullscreen) {
        removeMaxHeight(playerContainerId)
        hideMastHead()
    } else if (!miniplayer && theater) {
        if (playerState == states.play) {
            hideMastHead()
            setMaxHeight(playerContainerId, maxHeightPlaying)
        } else {
            showMastHead()
            setMaxHeight(playerContainerId, maxHeightPaused)
        }
    } else {
        showMastHead()
    }
}

// ========
// helpers
// ========
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