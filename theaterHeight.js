const maxHeight = "calc(100vh - 58px)"
const divId = "full-bleed-container"

function setMaxHeight(id) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = maxHeight
}

function removeMaxHeight(id) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = null
}

function observerCallback(mutationList, observer) {
    if (document.getElementById(divId)) {
        observer.disconnect();
        setMaxHeight(divId);
    }
}

const observer = new MutationObserver(observerCallback)
observer.observe(document.body, {childList: true, subtree: true})

// watch for fullscreen mode and then drop the maxHeight requirement - not supported on Safari
document.addEventListener("fullscreenchange", () => { 
    if (document.fullscreenElement) {
        removeMaxHeight(divId)
    } else {
        setMaxHeight(divId)
    }
})