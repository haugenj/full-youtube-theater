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