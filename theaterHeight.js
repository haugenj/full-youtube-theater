const maxHeight = "calc(100vh - 58px)"
const divId = "full-bleed-container"

function changeMaxHeight(id) {
    const elem = document.getElementById(id)
    elem.style.maxHeight = maxHeight
}

function observerCallback(mutationList, observer) {
    if (document.getElementById(divId)) {
        observer.disconnect();
        changeMaxHeight(divId);
    }
}

const observerOptions = {
    childList: true,
    subtree: true,
};

const observer = new MutationObserver(observerCallback)
observer.observe(document.body, observerOptions)