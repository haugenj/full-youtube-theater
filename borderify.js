document.body.style.border = "5px solid red";

function addBorder(id) {
    const elem = document.getElementById(id)
    elem.style.border = "5px solid red"
}

const divId = "#columns"

function observerCallback(mutationList, observer) {
    if (document.querySelector(divId)) {
        observer.disconnect();
        addBorder(divId);
    }
}


const observerOptions = {
    childList: true,
    subtree: true,
};

const observer = new MutationObserver(observerCallback)
observer.observe(document.body, observerOptions)

console.log("yoooooo")

//style="border: 5px solid red;"

//<div id="full-bleed-container" class="style-scope ytd-watch-flexy">
    // player container

// player controls class="ytp-chrome-controls"

// might be able to solve this by changing the maxheight of the player controller to 100% - the size of the player controls
// currently it's set to 100vh - 169px ?
//  calc(100vh - 48px)

// id = full-bleed-container